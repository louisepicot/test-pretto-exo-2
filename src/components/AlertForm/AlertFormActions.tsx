import { Button } from "@/components/Button";
import { Link } from "@/components/Link";
import { useAlertFormContext } from "@/hooks/useAlertFormContext";

export function AlertFormActions() {
  const { saveForm, deleteAlert } = useAlertFormContext();

  const handleSave = () => {
    saveForm();
    alert("Modifications sauvegardées");
  };

  const handleDelete = () => {
    deleteAlert();
    alert("Alerte supprimée");
  };

  return (
    <div className="alert-form__actions">
      <Button type="button" variant="primary" onClick={handleSave}>
        Sauvegarder les modifications
      </Button>
      <Link onClick={handleDelete}>Supprimer</Link>
    </div>
  );
}
