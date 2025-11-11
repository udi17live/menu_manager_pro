import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Register lifecycle hooks for the users-permissions user model
    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user'],

      async afterCreate(event) {
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

        // Deactivate other menus (if any exist)
        const otherActiveMenus = await strapi.db.query("api::menu.menu").findMany({
          where: {
            users_permissions_user: user.id,
            id: { $ne: defaultMenu.id },
            is_active: true,
          },
        });

        if (otherActiveMenus.length > 0) {
          await strapi.db.query("api::menu.menu").updateMany({
            where: {
              users_permissions_user: user.id,
              id: { $ne: defaultMenu.id },
              is_active: true,
            },
            data: { is_active: false },
          });
        }

        strapi.log.info(
          `✅ Created default setting (${setting.id}) and menu for user ${user.email}`
        );
      },
    });
  },
};
