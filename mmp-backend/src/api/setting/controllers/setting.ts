/**
 * setting controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::setting.setting', ({ strapi }) => ({
  async find(ctx) {
    const userId = ctx.state.user?.id;

    if (!userId) {
      return ctx.unauthorized('You must be authenticated to access settings');
    }

    // Query the database directly to find settings for this user
    const settings = await strapi.db.query('api::setting.setting').findMany({
      where: {
        user: userId,
      },
      populate: {
        restaurant_logo: true,
      },
    });

    // Remove user field from response to prevent exposing sensitive data
    const sanitizedSettings = settings.map(setting => {
      const { user, ...rest } = setting as any;
      return rest;
    });

    return { data: sanitizedSettings };
  },

  async findOne(ctx) {
    const userId = ctx.state.user?.id;

    if (!userId) {
      return ctx.unauthorized('You must be authenticated to access settings');
    }

    const { id } = ctx.params;

    // Query with both ID and user to ensure ownership
    const setting: any = await strapi.db.query('api::setting.setting').findOne({
      where: {
        id,
        user: userId,
      },
      populate: {
        restaurant_logo: true,
      },
    });

    if (!setting) {
      return ctx.notFound('Setting not found or access denied');
    }

    // Remove user field from response to prevent exposing sensitive data
    const { user, ...sanitizedSetting } = setting;

    return { data: sanitizedSetting };
  },

  async create(ctx) {
    const userId = ctx.state.user?.id;

    if (!userId) {
      return ctx.unauthorized('You must be authenticated to create settings');
    }

    // Automatically set the user field to the authenticated user
    ctx.request.body.data = {
      ...ctx.request.body.data,
      user: userId,
    };

    return super.create(ctx);
  },

  async update(ctx) {
    const userId = ctx.state.user?.id;

    if (!userId) {
      return ctx.unauthorized('You must be authenticated to update settings');
    }

    // Prevent users from changing the user field
    if (ctx.request.body.data?.user) {
      delete ctx.request.body.data.user;
    }

    return super.update(ctx);
  },

  async delete(ctx) {
    const userId = ctx.state.user?.id;

    if (!userId) {
      return ctx.unauthorized('You must be authenticated to delete settings');
    }

    return super.delete(ctx);
  },
}));
