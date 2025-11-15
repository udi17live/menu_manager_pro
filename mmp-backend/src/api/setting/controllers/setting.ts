/**
 * setting controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::setting.setting",
  ({ strapi }) => ({
    async me(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("You must be authenticated");
      }

      const settings = await strapi.db.query("api::setting.setting").findOne({
        where: {
          user: user.id,
        },
      });

      if (!settings) {
        return ctx.notFound("No settings found for the user");
      }

      const sanitizedSettings = await this.sanitizeOutput(settings, ctx);

      return sanitizedSettings;
    },

    async update(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("You must be authenticated");
      }

      const userSettings = await strapi.db
        .query("api::setting.setting")
        .findOne({
          where: {
            user: user.id,
          },
        });

      if (!userSettings) {
        return ctx.notFound("No settings found for the user");
      }

      if (ctx.params.id !== userSettings.id.toString()) {
        return ctx.forbidden("You can only update your own settings");
      }

      if (ctx.request.body.data?.user) {
        delete ctx.request.body.data.user;
      }

      ctx.params.id = userSettings.documentId;

      return super.update(ctx);
    },

    async meta(ctx) {
      const enumOptions = strapi
        .service("api::setting.setting")
        .getEnumOptions();
      ctx.body = { data: enumOptions };
    },
  })
);
