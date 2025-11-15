export default {
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
};
