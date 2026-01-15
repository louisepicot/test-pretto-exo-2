import type { SALE_TYPES, PROPERTY_TYPES } from "@/lib/constants";

export type City = {
  id: string;
  name: string;
  postalCode: string;
};

export type SaleType = (typeof SALE_TYPES)[keyof typeof SALE_TYPES];

export type PropertyType = (typeof PROPERTY_TYPES)[keyof typeof PROPERTY_TYPES];

export type PropertyTypes = {
  apartment: boolean;
  house: boolean;
};

export type AlertFormState = {
  cities: City[];
  propertyTypes: PropertyTypes;
  saleType: SaleType;
};
