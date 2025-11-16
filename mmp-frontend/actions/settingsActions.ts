"use server";

import { auth } from "@/lib/auth";
import { getStrapiData, updateStrapiData } from "@/lib/strapiClient";

export async function getMeta() {
  const data = await getStrapiData("/meta");
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
