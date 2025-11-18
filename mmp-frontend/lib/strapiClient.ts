import { strapi } from "@strapi/client";
import { auth } from "./auth";
import { getStrapiToken } from "@/actions/authActions";
import { success } from "zod";

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
    const resData = await response.json();
    return {
      success: true,
      error: null,
      data: resData,
    };
  } catch (error) {
    console.error(`Error fetching data for ${uri} : `, error);
    return {
      success: false,
      error: error,
      data: null,
    };
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

    const resData = await response.json();

    return {
      success: true,
      error: null,
      data: resData,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error,
      data: null,
    };
  }
}

export async function createStrapiData(uri: string, data: any) {
  try {
    const token = await getStrapiToken();
    console.log(token);
    const response = await strapiClient.fetch(uri, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: data,
    });

    const resData = await response.json();

    return {
      success: true,
      error: null,
      data: resData,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error,
      data: null,
    };
  }
}

export async function deleteStrapiData(uri: string) {
  try {
    const token = await getStrapiToken();
    console.log(token);
    const response = await strapiClient.fetch(uri, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();

    console.log(resData);

    return {
      success: true,
      error: null,
      data: resData,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error,
      data: null,
    };
  }
}
