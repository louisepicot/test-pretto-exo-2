import { useRef, useEffect } from "react";
import { LoadingSpinner } from "@/components/Icons";
import { useSearchContext } from "@/hooks/useSearchContext";
import { MIN_SEARCH_LENGTH } from "@/lib/constants";
import "@/components/CitySearch/CitySearch.css";

export function CitySearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchText, isLoading, handleChangeSearchText } = useSearchContext();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const shouldShowLoading = isLoading && searchText.length >= MIN_SEARCH_LENGTH;

  return (
    <div className="city-search__input-wrapper">
      <input
        ref={inputRef}
        type="text"
        value={searchText}
        onChange={(e) => handleChangeSearchText(e.target.value)}
        placeholder="Rechercher une ville..."
        className="city-search__input"
      />
      {shouldShowLoading && (
        <div className="city-search__loading">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
