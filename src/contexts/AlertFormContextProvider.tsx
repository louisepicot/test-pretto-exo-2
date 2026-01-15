import {
  useState,
  useCallback,
  useMemo,
  type ReactNode,
  createContext,
} from "react";

import type {
  City,
  AlertFormState,
  PropertyType,
  SaleType,
  PropertyTypes,
} from "@/lib/types";
import { SALE_TYPES } from "@/lib/constants";

const INITIAL_STATE: AlertFormState = {
  cities: [{ id: "1", name: "Lyon", postalCode: "69007" }],
  propertyTypes: {
    apartment: true,
    house: false,
  },
  saleType: SALE_TYPES.NEW,
};

type AlertFormProviderProps = {
  children: ReactNode;
  initialState?: Partial<AlertFormState>;
};

type AlertFormContextValue = {
  state: AlertFormState;
  addCity: (city: City) => void;
  removeCity: (cityId: string) => void;
  togglePropertyType: (type: PropertyType) => void;
  setSaleType: (type: SaleType) => void;
  resetForm: () => void;
  getFormData: () => {
    cities: Array<{ name: string; postalCode: string }>;
    propertyTypes: PropertyTypes;
    saleType: SaleType;
  };
  saveForm: () => void;
  deleteAlert: () => void;
};

export const AlertFormContext = createContext<AlertFormContextValue | null>(
  null
);

export default function AlertFormProvider({
  children,
  initialState,
}: AlertFormProviderProps) {
  const [state, setState] = useState<AlertFormState>({
    ...INITIAL_STATE,
    ...initialState,
  });

  const addCity = useCallback((city: City) => {
    setState((prev) => {
      const cityExists = prev.cities.some(
        (c) => c.name === city.name && c.postalCode === city.postalCode
      );
      if (cityExists) {
        return prev;
      }
      return {
        ...prev,
        cities: [...prev.cities, city],
      };
    });
  }, []);

  const removeCity = useCallback((cityId: string) => {
    setState((prev) => ({
      ...prev,
      cities: prev.cities.filter((city) => city.id !== cityId),
    }));
  }, []);

  const togglePropertyType = useCallback((type: PropertyType) => {
    setState((prev) => ({
      ...prev,
      propertyTypes: {
        ...prev.propertyTypes,
        [type]: !prev.propertyTypes[type],
      },
    }));
  }, []);

  const setSaleType = useCallback((type: SaleType) => {
    setState((prev) => ({
      ...prev,
      saleType: type,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const getFormData = useCallback(() => {
    return {
      cities: state.cities.map((c) => ({
        name: c.name,
        postalCode: c.postalCode,
      })),
      propertyTypes: state.propertyTypes,
      saleType: state.saleType,
    };
  }, [state]);

  const saveForm = useCallback(() => {
    getFormData();
  }, [getFormData]);

  const deleteAlert = useCallback(() => {
    resetForm();
  }, [resetForm]);

  const value: AlertFormContextValue = useMemo(
    () => ({
      state,
      addCity,
      removeCity,
      togglePropertyType,
      setSaleType,
      resetForm,
      getFormData,
      saveForm,
      deleteAlert,
    }),
    [
      state,
      addCity,
      removeCity,
      togglePropertyType,
      setSaleType,
      resetForm,
      getFormData,
      saveForm,
      deleteAlert,
    ]
  );

  return (
    <AlertFormContext.Provider value={value}>
      {children}
    </AlertFormContext.Provider>
  );
}
