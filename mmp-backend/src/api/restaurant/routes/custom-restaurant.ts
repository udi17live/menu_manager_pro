import { config } from "process";

export default {
  routes: [
    {
      method: "GET",
      path: "/restaurants/uuid/uuid",
      handler: "restaurant.findByUuid",
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/restaurants/me",
      handler: "restaurant.me",
      config: {
        policies: [],
      },
    },
  ],
};
