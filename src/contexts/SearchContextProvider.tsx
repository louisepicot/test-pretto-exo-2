import { createContext, useState, useCallback, useMemo } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useCitySearch } from "@/hooks/useCitySearch";
import type { City } from "@/lib/types";

type SearchContext = {
  searchText: string;
  debouncedSearchText: string;
  results: City[];
  isLoading: boolean;
  showNoResults: boolean;
  isOpen: boolean;
  handleChangeSearchText: (newSearchText: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
};

export const SearchContext = createContext<SearchContext | null>(null);

export default function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedSearchText] = useDebounceValue(searchText, 300);

  const { results, isLoading, showNoResults } =
    useCitySearch(debouncedSearchText);

  const handleChangeSearchText = useCallback((newSearchText: string) => {
    setSearchText(newSearchText);
  }, []);

  const openSearch = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setSearchText("");
  }, []);

  const value = useMemo(
    () => ({
      searchText,
      debouncedSearchText,
      results,
      isLoading,
      showNoResults,
      isOpen,
      handleChangeSearchText,
      openSearch,
      closeSearch,
    }),
    [
      searchText,
      debouncedSearchText,
      results,
      isLoading,
      showNoResults,
      isOpen,
      handleChangeSearchText,
      openSearch,
      closeSearch,
    ]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
