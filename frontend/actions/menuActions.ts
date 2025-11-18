"use server";
import { auth } from "@/lib/auth";
import { strapiClient } from "@/lib/strapiClient";
import { CollectionTypeManager } from "@strapi/client";

// const session = await auth();
// const userId = session?.user.id;

// export async function getMenusForUser() {
//   const response = await strapiClient.collection("menus").find({
//     filters: {
//       published: true,
//       user: {
//         id: userId,
//       },
//     },
//   });

//   console.log(response);
// }
