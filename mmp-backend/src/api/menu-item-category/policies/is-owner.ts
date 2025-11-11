export default async (policyContext, config, { strapi }) => {
  const userId = policyContext.state.user?.id;

  if (!userId) {
    return false;
  }

  // For create operations, verify the menu belongs to the user
  if (policyContext.request.body?.data?.menu) {
    const menuId = policyContext.request.body.data.menu;
    const menu = await strapi.db.query('api::menu.menu').findOne({
      where: { id: menuId, users_permissions_user: userId },
    });

    if (!menu) {
      return false;
    }
  }

  // For update/delete operations, verify the category belongs to a menu owned by the user
  if (policyContext.params.id) {
    const category: any = await strapi.db.query('api::menu-item-category.menu-item-category').findOne({
      where: { id: policyContext.params.id },
      populate: ['menu'],
    });

    if (!category || !category.menu) {
      return false;
    }

    // Now check if the menu belongs to the user
    const menu = await strapi.db.query('api::menu.menu').findOne({
      where: { id: category.menu.id, users_permissions_user: userId },
    });

    if (!menu) {
      return false;
    }
  }

  return true;
};
