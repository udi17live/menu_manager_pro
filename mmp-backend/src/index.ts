import type { Core } from "@strapi/strapi";

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
    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],

      async afterCreate(event) {
        const { result } = event;

        try {
          await strapi.entityService.create("api::setting.setting", {
            data: {
              currency: "USD",
              theme: "light",
              user: result.id,
            },
          });
          console.log("Settings created for user: ", result.id);
        } catch (error) {
          console.log(`Error creating settings for user ${result.id}: `, error);
        }
      },
    });
  },
};
