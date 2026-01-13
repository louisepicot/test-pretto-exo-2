import type { MunicipalitySearchResult } from "@pretto/places/dist/types";
import "./CitySearch.css";

type CitySearchResultProps = {
  result: MunicipalitySearchResult;
  isSelected: boolean;
  onSelect: (result: MunicipalitySearchResult) => void;
};

export function CitySearchResult({
  result,
  isSelected,
  onSelect,
}: CitySearchResultProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(result)}
      className={`city-search__result ${
        isSelected ? "city-search__result--selected" : ""
      }`.trim()}
    >
      {result.label}
    </button>
  );
}
