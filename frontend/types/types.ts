export type RestaurantData = {
  id: number;
  documentId: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postCode?: string;
  country: string;
  phone: string;
  email: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

export type RestaurantDataFormStateType = {
  success: boolean;
  errors?: Record<string, string[]> | undefined;
  restaurantData?: RestaurantData | null;
};

export type MenuData = {
  id: number;
  documentId: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};
