import { auth } from "@/lib/auth";

export async function getStrapiToken() {
  const session = await auth();
  const jwtToken = session?.strapiToken;
  if (!jwtToken) throw new Error("Unauthorized");
  return jwtToken;
}
