import { useEffect, useRef, type RefObject } from "react";

/**
 * Custom hook to handle clicks outside of specified elements
 * @param refs - Array of refs to check for outside clicks
 * @param handler - Callback function to execute when click is outside
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  refs: Array<RefObject<T | null>>,
  handler: () => void
) {
  const handlerRef = useRef(handler);

  // Update handler ref when it changes
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(target)
      );

      if (isOutside) {
        handlerRef.current();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs]);
}
