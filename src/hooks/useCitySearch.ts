import { useQuery } from "@tanstack/react-query";
import { searchPlaces } from "@pretto/places";
import type { MunicipalitySearchResult } from "@pretto/places/dist/types";
import { MIN_SEARCH_LENGTH, SEARCH_RESULTS_LIMIT } from "@/lib/constants";
import type { City } from "@/lib/types";

const fetchCities = async (
  searchTerm: string
): Promise<MunicipalitySearchResult[]> => {
  const searchResults = await searchPlaces(searchTerm, {
    limit: SEARCH_RESULTS_LIMIT,
    debouncetime: 300,
  });
  return searchResults;
};

const convertToCity = (result: MunicipalitySearchResult): City => ({
  id: `${result.value.city}-${result.value.zipcode}`,
  name: result.value.city,
  postalCode: result.value.zipcode,
});

export function useCitySearch(searchTerm: string) {
  const shouldSearch = searchTerm.length >= MIN_SEARCH_LENGTH;

  const { data, isPending } = useQuery({
    queryKey: ["cities", searchTerm],
    queryFn: () => fetchCities(searchTerm),
    enabled: shouldSearch,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const cities = data?.map(convertToCity) || [];

  const showNoResults =
    searchTerm.length >= MIN_SEARCH_LENGTH &&
    (cities.length === 0 || data === undefined) &&
    !isPending;

  return {
    results: cities,
    isLoading: isPending,
    showNoResults,
  };
}
