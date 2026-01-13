import { useCallback, useMemo } from "react";
import "./AlertForm.css";
import { CitySelection } from "../CitySelection";
import { Checkbox } from "../Checkbox";
import { Radio } from "../Radio";
import { Button } from "../Button";
import { Link } from "../Link";
import { useAlertForm } from "@/contexts";
import { AlertFormSection } from "./AlertFormSection";
import { Title } from "@/components/Title";

type AlertFormProps = {
  className?: string;
};

export function AlertForm({ className = "" }: AlertFormProps) {
  const { state, actions } = useAlertForm();

  // Memoized handlers
  const handleSave = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      alert("Modifications sauvegardées");
    },
    []
  );

  const handleDelete = useCallback(() => {
    alert("Alerte supprimée");
    actions.resetForm();
  }, [actions]);

  const handlePropertyTypeToggle = useCallback(
    (type: "apartment" | "house") => {
      actions.togglePropertyType(type);
    },
    [actions]
  );

  const handleSaleTypeChange = useCallback(
    (value: string) => {
      actions.setSaleType(value);
    },
    [actions]
  );

  // Memoize checkbox props
  const apartmentCheckboxProps = useMemo(
    () => ({
      id: "apartment",
      name: "property-type",
      checked: state.propertyTypes.apartment,
      onChange: () => {
        handlePropertyTypeToggle("apartment");
      },
      label: "Appartement",
    }),
    [state.propertyTypes.apartment, handlePropertyTypeToggle]
  );

  const houseCheckboxProps = useMemo(
    () => ({
      id: "house",
      name: "property-type",
      checked: state.propertyTypes.house,
      onChange: () => {
        handlePropertyTypeToggle("house");
      },
      label: "Maison",
    }),
    [state.propertyTypes.house, handlePropertyTypeToggle]
  );

  // Memoize radio props
  const newRadioProps = useMemo(
    () => ({
      id: "new",
      name: "sale-type",
      value: "new",
      checked: state.saleType === "new",
      onChange: () => handleSaleTypeChange("new"),
      label: "Neuf",
    }),
    [state.saleType, handleSaleTypeChange]
  );

  const oldRadioProps = useMemo(
    () => ({
      id: "old",
      name: "sale-type",
      value: "old",
      checked: state.saleType === "old",
      onChange: () => handleSaleTypeChange("old"),
      label: "Ancien",
    }),
    [state.saleType, handleSaleTypeChange]
  );

  return (
    <form className={`alert-form ${className}`.trim()} onSubmit={handleSave}>
      <div className="alert-form__container">
        <Title className="alert-form__title">Paramétrez votre alerte</Title>

        <AlertFormSection title="Localisation">
          <CitySelection
            cities={state.cities}
            onAdd={actions.openCitySearch}
            onRemove={actions.removeCity}
            onSelect={actions.addCity}
            showSearch={state.showCitySearch}
            onCloseSearch={actions.closeCitySearch}
          />
        </AlertFormSection>

        <AlertFormSection title="Type de bien">
          <div className="alert-form__options">
            <Checkbox {...apartmentCheckboxProps} />
            <Checkbox {...houseCheckboxProps} />
          </div>
        </AlertFormSection>

        <AlertFormSection title="Type de vente">
          <div className="alert-form__options">
            <Radio {...newRadioProps} />
            <Radio {...oldRadioProps} />
          </div>
        </AlertFormSection>

        <div className="alert-form__actions">
          <Button type="submit" variant="primary">
            Sauvegarder les modifications
          </Button>
          <Link onClick={handleDelete} className="alert-form__delete-link">
            Supprimer
          </Link>
        </div>
      </div>
    </form>
  );
}
