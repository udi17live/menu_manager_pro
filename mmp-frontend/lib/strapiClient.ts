import { strapi } from "@strapi/client";

export const strapiClient = strapi({
  baseURL: process.env.BACKEND_API_URL!,
});
