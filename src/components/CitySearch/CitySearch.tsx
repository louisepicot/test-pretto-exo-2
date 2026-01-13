import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { searchPlaces } from "@pretto/places";
import type { MunicipalitySearchResult } from "@pretto/places/dist/types";
import { useDebounce } from "@/hooks/useDebounce";
import type { City } from "@/contexts";
import "./CitySearch.css";

type CitySearchProps = {
  onSelect: (city: City) => void;
  onClose?: () => void;
  className?: string;
};

export function CitySearch({
  onSelect,
  onClose,
  className = "",
}: CitySearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<MunicipalitySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Memoize whether we should search
  const shouldSearch = useMemo(
    () => debouncedSearchTerm.length >= 2,
    [debouncedSearchTerm.length]
  );

  // Memoize city conversion
  const convertToCity = useCallback(
    (result: MunicipalitySearchResult): City => ({
      id: `${result.value.city}-${result.value.zipcode}`,
      name: result.value.city,
      postalCode: result.value.zipcode,
    }),
    []
  );

  useEffect(() => {
    // Focus input when component mounts
    inputRef.current?.focus();

    // Handle click outside to close
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        inputRef.current &&
        !inputRef.current.contains(target) &&
        resultsRef.current &&
        !resultsRef.current.contains(target)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

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
          limit: 10,
          debouncetime: 300,
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
      setSelectedIndex(-1);
      onClose?.();
    },
    [onSelect, onClose, convertToCity]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      } else if (e.key === "Escape") {
        onClose?.();
      }
    },
    [results, selectedIndex, handleSelect, onClose]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setSelectedIndex(-1);
    },
    []
  );

  // Memoize result keys
  const getResultKey = useCallback(
    (result: MunicipalitySearchResult, index: number) =>
      `${result.value.city}-${result.value.zipcode}-${index}`,
    []
  );

  useEffect(() => {
    // Scroll selected item into view
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Memoize loading spinner
  const loadingSpinner = useMemo(
    () => (
      <div className="city-search__loading" aria-label="Loading">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="8"
            cy="8"
            r="7"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="43.98"
            strokeDashoffset="11"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 8 8;360 8 8"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    ),
    []
  );

  // Memoize no results message
  const showNoResults = useMemo(
    () => searchTerm.length >= 2 && results.length === 0 && !isLoading,
    [searchTerm.length, results.length, isLoading]
  );

  return (
    <div className={`city-search ${className}`.trim()}>
      <div className="city-search__input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher une ville..."
          className="city-search__input"
        />
        {isLoading && loadingSpinner}
      </div>
      {results.length > 0 && (
        <div ref={resultsRef} className="city-search__results">
          {results.map((result, index) => (
            <button
              key={getResultKey(result, index)}
              type="button"
              onClick={() => handleSelect(result)}
              className={`city-search__result ${
                index === selectedIndex ? "city-search__result--selected" : ""
              }`.trim()}
            >
              {result.label}
            </button>
          ))}
        </div>
      )}
      {showNoResults && (
        <div className="city-search__no-results">Aucun résultat trouvé</div>
      )}
    </div>
  );
}
