export default {
  async beforeCreate(event) {
    const { data } = event.params;

    if (data.isActive && data.restaurant) {
      await strapi.db.query("api::menu.menu").updateMany({
        where: {
          restaurant: data.restaurant,
          isActive: true,
        },
        data: { isActive: false },
      });
    }
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;

    if (data.isActive === true) {
      const menu = (await strapi.entityService.findOne(
        "api::menu.menu",
        where.id,
        {
          populate: { restaurant: true },
        }
      )) as any;

      if (menu && menu.restaurant) {
        await strapi.db.query("api::menu.menu").updateMany({
          where: {
            restaurant: menu.restaurant?.id,
            isActive: true,
            id: { $ne: where.id },
          },
          data: { isActive: false },
        });
      }
    }
  },
};
