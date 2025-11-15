/**
 * restaurant controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::restaurant.restaurant", {
  async findByUuid(ctx) {
    const { uuid } = ctx.params;

    const restaurant = await strapi.db
      .query("api::restaurant.restaurant")
      .findOne({
        where: { uuid },
        populate: {
          menus: {
            where: { isActive: true },
            populate: {
              menuItems: {
                where: {
                  inStock: true,
                },
                populate: ["categories", "image"],
              },
            },
          },
          categories: true,
        },
      });

    if (!restaurant) {
      return ctx.notFound("Restaurant not found");
    }

    return restaurant;
  },
});
