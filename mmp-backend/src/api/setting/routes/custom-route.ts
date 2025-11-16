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
      path: "/meta",
      handler: "setting.meta",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
