import { useCallback } from "react";
import "./AlertForm.css";
import { CitySelection } from "@/components/CitySelection";
import { Checkbox } from "@/components/Checkbox";
import { Radio } from "@/components/Radio";
import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { useAlertForm } from "@/contexts";
import { AlertFormSection } from "@/components/AlertForm/AlertFormSection";
import { Title } from "@/components/Title";
import { SALE_TYPES, PROPERTY_TYPES } from "@/lib/constants";

type AlertFormProps = {
  className?: string;
};

export function AlertForm({ className = "" }: AlertFormProps) {
  const { state, actions } = useAlertForm();

  const handleSave = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    alert("Modifications sauvegardées");
  }, []);

  const handleDelete = useCallback(() => {
    alert("Alerte supprimée");
    actions.resetForm();
  }, [actions]);

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
            <Checkbox
              id={PROPERTY_TYPES.APARTMENT}
              name="property-type"
              checked={state.propertyTypes.apartment}
              onChange={() => actions.togglePropertyType(PROPERTY_TYPES.APARTMENT)}
              label="Appartement"
            />
            <Checkbox
              id={PROPERTY_TYPES.HOUSE}
              name="property-type"
              checked={state.propertyTypes.house}
              onChange={() => actions.togglePropertyType(PROPERTY_TYPES.HOUSE)}
              label="Maison"
            />
          </div>
        </AlertFormSection>

        <AlertFormSection title="Type de vente">
          <div className="alert-form__options">
            <Radio
              id={SALE_TYPES.NEW}
              name="sale-type"
              value={SALE_TYPES.NEW}
              checked={state.saleType === SALE_TYPES.NEW}
              onChange={() => actions.setSaleType(SALE_TYPES.NEW)}
              label="Neuf"
            />
            <Radio
              id={SALE_TYPES.OLD}
              name="sale-type"
              value={SALE_TYPES.OLD}
              checked={state.saleType === SALE_TYPES.OLD}
              onChange={() => actions.setSaleType(SALE_TYPES.OLD)}
              label="Ancien"
            />
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
