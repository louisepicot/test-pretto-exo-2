import { useEffect, useRef, type RefObject } from "react";
import { useClickOutside, useKeyboardNavigation } from "@/hooks";
import type { City } from "@/lib/types";
import { CitySearchInput } from "./CitySearchInput";
import { CitySearchResults } from "./CitySearchResults";
import { CitySearchNoResults } from "./CitySearchNoResults";
import { useCitySearch } from "../../hooks/useCitySearch";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const {
    searchTerm,
    results,
    isLoading,
    showNoResults,
    handleInputChange,
    handleSelect,
    handleSelectResult,
    getResultKey,
  } = useCitySearch({ onSelect, onClose });

  // Handle click outside
  useClickOutside(
    [inputRef, resultsRef] as Array<RefObject<HTMLElement | null>>,
    () => {
      onClose?.();
    }
  );

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const keyboardNav = useKeyboardNavigation({
    itemsCount: results.length,
    onSelect: handleSelectResult,
    onEscape: onClose,
    resultsRef,
  });

  const handleInputChangeWithReset = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleInputChange(e);
    keyboardNav.resetSelection();
  };

  return (
    <div className={`city-search ${className}`.trim()}>
      <CitySearchInput
        ref={inputRef}
        value={searchTerm}
        onChange={handleInputChangeWithReset}
        onKeyDown={keyboardNav.handleKeyDown}
        isLoading={isLoading}
      />
      <CitySearchResults
        ref={resultsRef}
        results={results}
        selectedIndex={keyboardNav.selectedIndex}
        onSelect={handleSelect}
        getResultKey={getResultKey}
      />
      {showNoResults && <CitySearchNoResults />}
    </div>
  );
}
