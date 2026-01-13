import { useCallback, useState, useEffect, type RefObject } from "react";

type UseKeyboardNavigationOptions<T extends HTMLElement = HTMLElement> = {
  itemsCount: number;
  onSelect: (index: number) => void;
  onEscape?: () => void;
  resultsRef: RefObject<T | null>;
};

/**
 * Custom hook to handle keyboard navigation in lists
 * @param options - Configuration options for keyboard navigation
 * @returns Object with selectedIndex and handleKeyDown function
 */
export function useKeyboardNavigation<T extends HTMLElement = HTMLElement>({
  itemsCount,
  onSelect,
  onEscape,
  resultsRef,
}: UseKeyboardNavigationOptions<T>) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < itemsCount - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        onSelect(selectedIndex);
      } else if (e.key === "Escape") {
        onEscape?.();
      }
    },
    [itemsCount, selectedIndex, onSelect, onEscape]
  );

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex, resultsRef]);

  const resetSelection = useCallback(() => {
    setSelectedIndex(-1);
  }, []);

  return {
    selectedIndex,
    handleKeyDown,
    resetSelection,
  };
}
