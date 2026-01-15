import { Checkbox } from "@/components/Checkbox";
import { PROPERTY_TYPES } from "@/lib/constants";
import { useAlertFormContext } from "@/hooks/useAlertFormContext";

export function PropertyTypeSelection() {
  const {
    state: { propertyTypes },
    togglePropertyType,
  } = useAlertFormContext();

  return (
    <div className="alert-form__options">
      <Checkbox
        id={PROPERTY_TYPES.APARTMENT}
        name="property-type"
        checked={propertyTypes.apartment}
        onChange={() => togglePropertyType(PROPERTY_TYPES.APARTMENT)}
        label="Appartement"
      />
      <Checkbox
        id={PROPERTY_TYPES.HOUSE}
        name="property-type"
        checked={propertyTypes.house}
        onChange={() => togglePropertyType(PROPERTY_TYPES.HOUSE)}
        label="Maison"
      />
    </div>
  );
}
