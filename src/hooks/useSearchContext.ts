import { useContext } from "react";
import { SearchContext } from "@/contexts/SearchContextProvider";

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be used within SearchContextProvider"
    );
  }
  return context;
}
