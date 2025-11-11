export default {
  async afterCreate(event: { result: any; params: any }) {
    const user = event.result;

    if (!user || !user.id) return;

    const setting = await strapi.db.query("api::setting.setting").create({
      data: {
        user: user.id,
      },
    });

    const defaultMenu = await strapi.db.query("api::menu.menu").create({
      data: {
        users_permissions_user: user.id,
        name: "Default Menu",
        is_active: true,
      },
    });

    // Deactivate other menu's
    await strapi.db.query("api::menu.menu").updateMany({
      where: {
        users_permissions_user: user.id,
        id: { $ne: defaultMenu.id },
        is_active: true,
      },
      data: { is_active: false },
    });

    strapi.log.info(
      `✅ Created default setting (${setting.id}) and menu for user ${user.email}`
    );
  },
};
