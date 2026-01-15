import { useAlertFormContext } from "@/hooks/useAlertFormContext";
import { RemoveIcon } from "@/components/Icons";
import { formatCityLabel } from "@/lib/utils";
import "@/components/CitySelection/CitySelection.css";

export function CitySelectionList() {
  const {
    state: { cities },
    removeCity,
  } = useAlertFormContext();

  if (cities.length === 0) {
    return null;
  }

  return (
    <div className="city-selection__pills">
      {cities.map((city) => (
        <div key={city.id} className="city-selection__pill">
          <span className="city-selection__pill-text">
            {formatCityLabel(city)}
          </span>
          <button
            type="button"
            onClick={() => removeCity(city.id)}
            className="city-selection__pill-remove"
            aria-label={`Remove ${city.name}`}
          >
            <RemoveIcon />
          </button>
        </div>
      ))}
    </div>
  );
}
