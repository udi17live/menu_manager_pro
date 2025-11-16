/**
 * setting service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::setting.setting",
  ({ strapi }) => ({
    getEnumOptions() {
      const settingContentType = strapi.contentTypes["api::setting.setting"];
      const restaurantContentType =
        strapi.contentTypes["api::restaurant.restaurant"];

      const enumFields = {};
      Object.keys(settingContentType.attributes).forEach((key) => {
        const attribute = settingContentType.attributes[key];
        if (attribute.type === "enumeration") {
          enumFields[key] = attribute.enum;
        }
      });

      Object.keys(restaurantContentType.attributes).forEach((key) => {
        const attribute = restaurantContentType.attributes[key];
        if (attribute.type === "enumeration") {
          enumFields[key] = attribute.enum;
        }
      });

      return enumFields;
    },
  })
);
