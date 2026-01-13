import { useCallback } from "react";
import "./CitySelection.css";
import { Link } from "@/components/Link";
import { CitySearch } from "@/components/CitySearch";
import { RemoveIcon } from "@/components/Icons";
import type { City } from "@/lib/types";

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

  const handleRemove = useCallback(
    (cityId: string) => {
      onRemove?.(cityId);
    },
    [onRemove]
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
                <RemoveIcon />
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
