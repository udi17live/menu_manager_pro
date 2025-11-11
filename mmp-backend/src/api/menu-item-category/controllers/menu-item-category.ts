/**
 * menu-item-category controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::menu-item-category.menu-item-category', ({ strapi }) => ({
  async find(ctx) {
    // Public access - return all categories
    const categories = await strapi.db.query('api::menu-item-category.menu-item-category').findMany({
      populate: {
        menu_items: {
          populate: ['image'],
        },
      },
    });

    // Remove menu reference to avoid exposing data
    const sanitizedCategories = categories.map(category => {
      const { menu, ...rest } = category as any;
      return rest;
    });

    return { data: sanitizedCategories };
  },

  async findOne(ctx) {
    // Public access - return category by ID
    const { id } = ctx.params;

    const category: any = await strapi.db.query('api::menu-item-category.menu-item-category').findOne({
      where: { id },
      populate: {
        menu_items: {
          populate: ['image'],
        },
      },
    });

    if (!category) {
      return ctx.notFound('Category not found');
    }

    // Remove menu reference
    const { menu, ...sanitizedCategory } = category;

    return { data: sanitizedCategory };
  },

  async create(ctx) {
    const userId = ctx.state.user?.id;

    if (!userId) {
      return ctx.unauthorized('You must be authenticated to create menu item categories');
    }

    return super.create(ctx);
  },

  async update(ctx) {
    const userId = ctx.state.user?.id;

    if (!userId) {
      return ctx.unauthorized('You must be authenticated to update menu item categories');
    }

    // Prevent users from changing the menu field
    if (ctx.request.body.data?.menu) {
      delete ctx.request.body.data.menu;
    }

    return super.update(ctx);
  },

  async delete(ctx) {
    const userId = ctx.state.user?.id;

    if (!userId) {
      return ctx.unauthorized('You must be authenticated to delete menu item categories');
    }

    return super.delete(ctx);
  },
}));
