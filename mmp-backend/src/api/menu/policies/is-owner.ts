export default async (policyContext, config, { strapi }) => {
  const userId = policyContext.state.user?.id;

  if (!userId) {
    return false;
  }

  // For find/findOne operations, we'll filter in the controller
  // This policy mainly checks for update/delete operations
  if (policyContext.params.id) {
    const menu = await strapi.entityService.findOne(
      'api::menu.menu',
      policyContext.params.id,
      {
        populate: ['users_permissions_user'],
      }
    );

    if (!menu) {
      return false;
    }

    // Check if the menu belongs to the authenticated user
    return menu.users_permissions_user?.id === userId;
  }

  // For create/find operations, allow and filter in controller
  return true;
};
