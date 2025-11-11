export default async (policyContext, config, { strapi }) => {
  const userId = policyContext.state.user?.id;

  if (!userId) {
    return false;
  }

  // For create operations, verify the category belongs to a menu owned by the user
  if (policyContext.request.body?.data?.menu_item_category) {
    const categoryId = policyContext.request.body.data.menu_item_category;
    const category: any = await strapi.db.query('api::menu-item-category.menu-item-category').findOne({
      where: { id: categoryId },
      populate: ['menu'],
    });

    if (!category || !category.menu) {
      return false;
    }

    // Check if the menu belongs to the user
    const menu = await strapi.db.query('api::menu.menu').findOne({
      where: { id: category.menu.id, users_permissions_user: userId },
    });

    if (!menu) {
      return false;
    }
  }

  // For update/delete operations, verify the item belongs to a category/menu owned by the user
  if (policyContext.params.id) {
    const item: any = await strapi.db.query('api::menu-item.menu-item').findOne({
      where: { id: policyContext.params.id },
      populate: {
        menu_item_category: {
          populate: ['menu'],
        },
      },
    });

    if (!item || !item.menu_item_category || !item.menu_item_category.menu) {
      return false;
    }

    // Check if the menu belongs to the user
    const menu = await strapi.db.query('api::menu.menu').findOne({
      where: { id: item.menu_item_category.menu.id, users_permissions_user: userId },
    });

    if (!menu) {
      return false;
    }
  }

  return true;
};
