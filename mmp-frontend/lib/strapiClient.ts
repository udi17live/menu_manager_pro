import { strapi } from "@strapi/client";
import { auth } from "./auth";
import { getStrapiToken } from "@/actions/authActions";

export const strapiClient = strapi({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL!,
});

export async function getStrapiData(uri: string) {
  try {
    const token = await getStrapiToken();
    console.log("TOKEN: ", token);
    const response = await strapiClient.fetch(uri, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data for ${uri} : `, error);
    return false;
  }
}

export async function updateStrapiData(uri: string, data: any) {
  try {
    const token = await getStrapiToken();
    console.log(token);
    const response = await strapiClient.fetch(uri, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: data,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
