import "@/components/AlertForm/AlertForm.css";
import { CitySelection } from "@/components/CitySelection";
import { AlertFormSection } from "@/components/AlertForm/AlertFormSection";
import { Title } from "@/components/Title";
import { PropertyTypeSelection } from "@/components/AlertForm/PropertyTypeSelection";
import { SaleTypeSelection } from "@/components/AlertForm/SaleTypeSelection";
import { AlertFormActions } from "@/components/AlertForm/AlertFormActions";

export function AlertForm() {
  return (
    <form
      className="alert-form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="alert-form__container">
        <Title>Paramétrez votre alerte</Title>

        <AlertFormSection title="Localisation">
          <CitySelection />
        </AlertFormSection>

        <AlertFormSection title="Type de bien">
          <PropertyTypeSelection />
        </AlertFormSection>

        <AlertFormSection title="Type de vente">
          <SaleTypeSelection />
        </AlertFormSection>

        <AlertFormActions />
      </div>
    </form>
  );
}
