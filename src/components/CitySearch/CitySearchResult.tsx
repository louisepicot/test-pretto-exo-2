import type { City } from "@/lib/types";
import { formatCityLabel } from "@/lib/utils";
import "@/components/CitySearch/CitySearch.css";
import { useSearchContext } from "@/hooks/useSearchContext";
import { useAlertFormContext } from "@/hooks/useAlertFormContext";

type CitySearchResultProps = {
  city: City;
};

export function CitySearchResult({ city }: CitySearchResultProps) {
  const { handleChangeSearchText, closeSearch } = useSearchContext();
  const { addCity } = useAlertFormContext();

  const handleSelect = (city: City) => {
    addCity(city);
    handleChangeSearchText("");
    closeSearch();
  };

  const label = formatCityLabel(city);

  return (
    <button
      type="button"
      onClick={() => handleSelect(city)}
      className="city-search__result"
    >
      {label}
    </button>
  );
}
