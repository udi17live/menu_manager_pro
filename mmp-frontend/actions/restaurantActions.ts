"use server";
import {
  createStrapiData,
  deleteStrapiData,
  getStrapiData,
  updateStrapiData,
} from "@/lib/strapiClient";
import { RestaurantDataSchema } from "@/schemas/schemas";
import { RestaurantDataFormStateType } from "@/types/types";
import { success } from "zod";

export async function getRestaurantDataAdmin() {
  const data = await getStrapiData("/restaurants/me");
  return data;
}

export async function postRestaurantData(
  prevState: RestaurantDataFormStateType,
  formData: FormData
): Promise<RestaurantDataFormStateType> {
  const entries = Object.fromEntries(formData.entries());
  const parsed = RestaurantDataSchema.safeParse(entries);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      restaurantData: null,
    };
  }

  const { id, ...data } = parsed.data;

  let result = null;

  if (parsed.data.id === 0) {
    result = await createStrapiData(
      "/restaurants",
      JSON.stringify({ data: data })
    );
  } else {
    result = await updateStrapiData(
      `/restaurants/${id}`,
      JSON.stringify({ data: data })
    );
  }

  return {
    success: true,
    errors: {},
    restaurantData: result?.data,
  };
}

export async function deleteRestaurant(id: string | number) {
  const resData = await deleteStrapiData(`/restaurants/${id}`);

  console.log("deleteRestaurant: Resdata: ", resData);
}

export async function getMenusForRestaurant() {
  const restaurantMenuData = await getStrapiData("/menus/me");
  return {
    success: true,
    errors: {},
    data: restaurantMenuData?.data,
  };
}
