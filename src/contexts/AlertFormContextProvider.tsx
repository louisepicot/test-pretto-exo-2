import { useState, useCallback, useMemo, type ReactNode } from "react";
import { AlertFormContext } from "@/contexts/AlertFormContext";
import type {
  City,
  AlertFormState,
  AlertFormContextValue,
  PropertyType,
  SaleType,
} from "@/lib/types";
import { SALE_TYPES } from "@/lib/constants";

const INITIAL_STATE: AlertFormState = {
  cities: [{ id: "1", name: "Lyon", postalCode: "69007" }],
  showCitySearch: false,
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
      // Check if city already exists
      const cityExists = prev.cities.some(
        (c) => c.name === city.name && c.postalCode === city.postalCode
      );
      if (cityExists) {
        return prev;
      }
      return {
        ...prev,
        cities: [...prev.cities, city],
        showCitySearch: false,
      };
    });
  }, []);

  const removeCity = useCallback((cityId: string) => {
    setState((prev) => ({
      ...prev,
      cities: prev.cities.filter((city) => city.id !== cityId),
    }));
  }, []);

  const openCitySearch = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showCitySearch: true,
    }));
  }, []);

  const closeCitySearch = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showCitySearch: false,
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
  }, [state.cities, state.propertyTypes, state.saleType]);

  const value = useMemo<AlertFormContextValue>(
    () => ({
      state,
      actions: {
        addCity,
        removeCity,
        openCitySearch,
        closeCitySearch,
        togglePropertyType,
        setSaleType,
        resetForm,
        getFormData,
      },
    }),
    [
      state,
      addCity,
      removeCity,
      openCitySearch,
      closeCitySearch,
      togglePropertyType,
      setSaleType,
      resetForm,
      getFormData,
    ]
  );

  return (
    <AlertFormContext.Provider value={value}>
      {children}
    </AlertFormContext.Provider>
  );
}
