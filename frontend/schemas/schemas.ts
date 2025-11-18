import { z } from "zod";

export const RestaurantDataSchema = z.object({
  id: z.coerce.number().int().optional(),
  documentId: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  postCode: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.email("Invalid email"),
  description: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),
});
