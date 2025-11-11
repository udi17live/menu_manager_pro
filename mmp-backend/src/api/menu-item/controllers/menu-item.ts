/**
 * menu-item controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::menu-item.menu-item', ({ strapi }) => ({
  async find(ctx) {
    // Public access - return all menu items
    const items = await strapi.db.query('api::menu-item.menu-item').findMany({
      populate: {
        image: true,
      },
    });

    // Remove category reference to avoid exposing data
    const sanitizedItems = items.map(item => {
      const { menu_item_category, ...rest } = item as any;
      return rest;
    });

    return { data: sanitizedItems };
  },

  async findOne(ctx) {
    // Public access - return menu item by ID
    const { id } = ctx.params;

    const item: any = await strapi.db.query('api::menu-item.menu-item').findOne({
      where: { id },
      populate: {
        image: true,
      },
    });

    if (!item) {
      return ctx.notFound('Item not found');
    }

    // Remove category reference
    const { menu_item_category, ...sanitizedItem } = item;

    return { data: sanitizedItem };
  },

  async create(ctx) {
    const userId = ctx.state.user?.id;

    if (!userId) {
      return ctx.unauthorized('You must be authenticated to create menu items');
    }

    return super.create(ctx);
  },

  async update(ctx) {
    const userId = ctx.state.user?.id;

    if (!userId) {
      return ctx.unauthorized('You must be authenticated to update menu items');
    }

    // Prevent users from changing the category field
    if (ctx.request.body.data?.menu_item_category) {
      delete ctx.request.body.data.menu_item_category;
    }

    return super.update(ctx);
  },

  async delete(ctx) {
    const userId = ctx.state.user?.id;

    if (!userId) {
      return ctx.unauthorized('You must be authenticated to delete menu items');
    }

    return super.delete(ctx);
  },
}));
