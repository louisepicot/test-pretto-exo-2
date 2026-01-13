import type { SALE_TYPES, PROPERTY_TYPES } from "./constants";

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
  showCitySearch: boolean;
  propertyTypes: PropertyTypes;
  saleType: SaleType;
};

export type AlertFormActions = {
  addCity: (city: City) => void;
  removeCity: (cityId: string) => void;
  openCitySearch: () => void;
  closeCitySearch: () => void;
  togglePropertyType: (type: PropertyType) => void;
  setSaleType: (type: SaleType) => void;
  resetForm: () => void;
  getFormData: () => {
    cities: Array<{ name: string; postalCode: string }>;
    propertyTypes: PropertyTypes;
    saleType: SaleType;
  };
};

export type AlertFormContextValue = {
  state: AlertFormState;
  actions: AlertFormActions;
};
