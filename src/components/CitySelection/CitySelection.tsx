import { useMemo, useCallback } from "react";
import "./CitySelection.css";
import { Link } from "../Link";
import { CitySearch } from "../CitySearch";
import type { City } from "@/contexts";

type CitySelectionProps = {
  cities: City[];
  onAdd?: () => void;
  onRemove?: (cityId: string) => void;
  onSelect?: (city: City) => void;
  showSearch?: boolean;
  onCloseSearch?: () => void;
  className?: string;
};

export function CitySelection({
  cities,
  onAdd,
  onRemove,
  onSelect,
  showSearch = false,
  onCloseSearch,
  className = "",
}: CitySelectionProps) {
  const formatCityLabel = useCallback((city: City) => {
    if (city.postalCode) {
      return `${city.name} (${city.postalCode})`;
    }
    return city.name;
  }, []);

  // Memoize remove handler
  const handleRemove = useCallback(
    (cityId: string) => {
      onRemove?.(cityId);
    },
    [onRemove]
  );

  // Memoize remove icon SVG
  const removeIcon = useMemo(
    () => (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 3L3 9M3 3L9 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    []
  );

  return (
    <div className={`city-selection ${className}`.trim()}>
      <div className="city-selection__pills">
        {cities.map((city) => (
          <div key={city.id} className="city-selection__pill">
            <span className="city-selection__pill-text">
              {formatCityLabel(city)}
            </span>
            {onRemove && (
              <button
                type="button"
                onClick={() => handleRemove(city.id)}
                className="city-selection__pill-remove"
                aria-label={`Remove ${city.name}`}
              >
                {removeIcon}
              </button>
            )}
          </div>
        ))}
      </div>
      {showSearch && onSelect ? (
        <CitySearch
          onSelect={onSelect}
          onClose={onCloseSearch}
          className="city-selection__search"
        />
      ) : (
        onAdd && (
          <Link onClick={onAdd} className="city-selection__add">
            Ajouter
          </Link>
        )
      )}
    </div>
  );
}
