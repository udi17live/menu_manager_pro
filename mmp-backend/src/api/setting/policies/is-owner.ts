export default async (policyContext, config, { strapi }) => {
  const userId = policyContext.state.user?.id;

  if (!userId) {
    return false;
  }

  // For find/findOne operations, we'll filter in the controller
  // This policy mainly checks for update/delete operations
  if (policyContext.params.id) {
    const setting = await strapi.entityService.findOne(
      'api::setting.setting',
      policyContext.params.id,
      {
        populate: ['user'],
      }
    );

    if (!setting) {
      return false;
    }

    // Check if the setting belongs to the authenticated user
    return setting.user?.id === userId;
  }

  // For create/find operations, allow and filter in controller
  return true;
};
