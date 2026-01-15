import { Radio } from "@/components/Radio";
import { SALE_TYPES } from "@/lib/constants";
import { useAlertFormContext } from "@/hooks/useAlertFormContext";

export function SaleTypeSelection() {
  const {
    state: { saleType },
    setSaleType,
  } = useAlertFormContext();

  return (
    <div className="alert-form__options">
      <Radio
        id={SALE_TYPES.NEW}
        name="sale-type"
        value={SALE_TYPES.NEW}
        checked={saleType === SALE_TYPES.NEW}
        onChange={() => setSaleType(SALE_TYPES.NEW)}
        label="Neuf"
      />
      <Radio
        id={SALE_TYPES.OLD}
        name="sale-type"
        value={SALE_TYPES.OLD}
        checked={saleType === SALE_TYPES.OLD}
        onChange={() => setSaleType(SALE_TYPES.OLD)}
        label="Ancien"
      />
    </div>
  );
}
