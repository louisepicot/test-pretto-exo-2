import { useState, useEffect, useMemo, useCallback } from "react";
import { searchPlaces } from "@pretto/places";
import type { MunicipalitySearchResult } from "@pretto/places/dist/types";
import { useDebounce } from "@/hooks";
import type { City } from "@/lib/types";
import {
  DEBOUNCE_DELAY,
  MIN_SEARCH_LENGTH,
  SEARCH_RESULTS_LIMIT,
} from "@/lib/constants";

type UseCitySearchOptions = {
  onSelect: (city: City) => void;
  onClose?: () => void;
};

export function useCitySearch({ onSelect, onClose }: UseCitySearchOptions) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<MunicipalitySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);

  const shouldSearch = useMemo(
    () => debouncedSearchTerm.length >= MIN_SEARCH_LENGTH,
    [debouncedSearchTerm.length]
  );

  const convertToCity = useCallback(
    (result: MunicipalitySearchResult): City => ({
      id: `${result.value.city}-${result.value.zipcode}`,
      name: result.value.city,
      postalCode: result.value.zipcode,
    }),
    []
  );

  // Search effect with debounced term
  useEffect(() => {
    if (!shouldSearch) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    let isCancelled = false;
    setIsLoading(true);

    const performSearch = async () => {
      try {
        const searchResults = await searchPlaces(debouncedSearchTerm, {
          limit: SEARCH_RESULTS_LIMIT,
          debouncetime: DEBOUNCE_DELAY,
        });
        if (!isCancelled) {
          setResults(searchResults);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error searching places:", error);
          setResults([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    performSearch();

    return () => {
      isCancelled = true;
    };
  }, [debouncedSearchTerm, shouldSearch]);

  const handleSelect = useCallback(
    (result: MunicipalitySearchResult) => {
      const city = convertToCity(result);
      onSelect(city);
      setSearchTerm("");
      setResults([]);
      onClose?.();
    },
    [onSelect, onClose, convertToCity]
  );

  const handleSelectResult = useCallback(
    (index: number) => {
      const result = results[index];
      if (result) {
        handleSelect(result);
      }
    },
    [results, handleSelect]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const getResultKey = useCallback(
    (result: MunicipalitySearchResult, index: number) =>
      `${result.value.city}-${result.value.zipcode}-${index}`,
    []
  );

  const showNoResults = useMemo(
    () =>
      searchTerm.length >= MIN_SEARCH_LENGTH &&
      results.length === 0 &&
      !isLoading,
    [searchTerm.length, results.length, isLoading]
  );

  return {
    searchTerm,
    results,
    isLoading,
    showNoResults,
    handleInputChange,
    handleSelect,
    handleSelectResult,
    getResultKey,
  };
}
