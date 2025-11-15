"use server";

import { auth } from "@/lib/auth";
import {
  getStrapiData,
  strapiClient,
  updateStrapiData,
} from "@/lib/strapiClient";
import { getStrapiToken } from "./authActions";

export async function getMeta() {
  const data = await getStrapiData("/settings/meta");
  return data;
}

export async function getMySettings() {
  const data = await getStrapiData("/settings/me");
  return data;
}

export async function updateSettings(id: string, data: any) {
  const response = await updateStrapiData(
    `/settings/${id}`,
    JSON.stringify(data)
  );

  console.log(response);
  return response;
}
