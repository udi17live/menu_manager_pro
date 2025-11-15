/**
 * setting service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::setting.setting",
  ({ strapi }) => ({
    getEnumOptions() {
      const contentType = strapi.contentTypes["api::setting.setting"];

      const enumFields = {};
      Object.keys(contentType.attributes).forEach((key) => {
        const attribute = contentType.attributes[key];
        if (attribute.type === "enumeration") {
          enumFields[key] = attribute.enum;
        }
      });

      return enumFields;
    },
  })
);
