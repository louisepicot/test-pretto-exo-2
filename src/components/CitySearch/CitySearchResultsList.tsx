import { useRef, type RefObject } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useSearchContext } from "@/hooks/useSearchContext";
import { CitySearchResult } from "@/components/CitySearch/CitySearchResult";
import { CitySearchNoResults } from "@/components/CitySearch/CitySearchNoResults";
import "@/components/CitySearch/CitySearch.css";

export function CitySearchResultsList() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const { results, showNoResults, closeSearch } = useSearchContext();

  useOnClickOutside(resultsRef as RefObject<HTMLElement>, () => {
    closeSearch();
  });

  if (showNoResults) {
    return <CitySearchNoResults />;
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div ref={resultsRef} className="city-search__results">
      {results.map((city, index) => (
        <CitySearchResult key={`${city.id}-${index}`} city={city} />
      ))}
    </div>
  );
}
