/**
 * menu controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::menu.menu', ({ strapi }) => ({
  async find(ctx) {
    // Public access - return all menus without user filter
    const menus = await strapi.db.query('api::menu.menu').findMany({
      populate: {
        menu_item_categories: {
          populate: {
            menu_items: {
              populate: ['image'],
            },
          },
        },
      },
    });

    // Remove user field from response to prevent exposing sensitive data
    const sanitizedMenus = menus.map(menu => {
      const { users_permissions_user, ...rest } = menu as any;
      return rest;
    });

    return { data: sanitizedMenus };
  },

  async findOne(ctx) {
    // Public access - return menu by ID without user verification
    const { id } = ctx.params;

    const menu: any = await strapi.db.query('api::menu.menu').findOne({
      where: { id },
      populate: {
        menu_item_categories: {
          populate: {
            menu_items: {
              populate: ['image'],
            },
          },
        },
      },
    });

    if (!menu) {
      return ctx.notFound('Menu not found');
    }

    // Remove user field from response to prevent exposing sensitive data
    const { users_permissions_user, ...sanitizedMenu } = menu;

    return { data: sanitizedMenu };
  },

  async create(ctx) {
    const userId = ctx.state.user?.id;

    if (!userId) {
      return ctx.unauthorized('You must be authenticated to create menus');
    }

    // Automatically set the users_permissions_user field to the authenticated user
    ctx.request.body.data = {
      ...ctx.request.body.data,
      users_permissions_user: userId,
    };

    return super.create(ctx);
  },

  async update(ctx) {
    const userId = ctx.state.user?.id;

    if (!userId) {
      return ctx.unauthorized('You must be authenticated to update menus');
    }

    // Prevent users from changing the users_permissions_user field
    if (ctx.request.body.data?.users_permissions_user) {
      delete ctx.request.body.data.users_permissions_user;
    }

    return super.update(ctx);
  },

  async delete(ctx) {
    const userId = ctx.state.user?.id;

    if (!userId) {
      return ctx.unauthorized('You must be authenticated to delete menus');
    }

    return super.delete(ctx);
  },
}));
