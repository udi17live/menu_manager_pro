export default {
  routes: [
    {
      method: "GET",
      path: "/settings/me",
      handler: "setting.me",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/settings/meta",
      handler: "setting.meta",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
