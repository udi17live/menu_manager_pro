export default {
  async beforeCreate(event) {
    const { data } = event.params;

    const userId = data._userId;

    if (userId) {
      delete data._userId;
      data.owner = {
        connect: [userId],
      };
    }
  },
};
