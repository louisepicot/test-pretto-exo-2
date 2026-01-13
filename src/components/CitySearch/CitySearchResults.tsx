import { forwardRef } from "react";
import type { MunicipalitySearchResult } from "@pretto/places/dist/types";
import { CitySearchResult } from "./CitySearchResult";
import "./CitySearch.css";

type CitySearchResultsProps = {
  results: MunicipalitySearchResult[];
  selectedIndex: number;
  onSelect: (result: MunicipalitySearchResult) => void;
  getResultKey: (result: MunicipalitySearchResult, index: number) => string;
  className?: string;
};

export const CitySearchResults = forwardRef<
  HTMLDivElement,
  CitySearchResultsProps
>(({ results, selectedIndex, onSelect, getResultKey, className = "" }, ref) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className={`city-search__results ${className}`.trim()}>
      {results.map((result, index) => (
        <CitySearchResult
          key={getResultKey(result, index)}
          result={result}
          isSelected={index === selectedIndex}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
});

CitySearchResults.displayName = "CitySearchResults";
