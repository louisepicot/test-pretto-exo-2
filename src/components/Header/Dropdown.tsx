import "@/components/Header/Dropdown.css";
import { BurgerMenuIcon } from "@/components/Header/BurgerMenuIcon";

export function Dropdown() {
  return (
    <div className="dropdown">
      <button type="button" className="dropdown__mobile" aria-label="Menu">
        <BurgerMenuIcon size={24} color="var(--color-text-primary)" />
      </button>
    </div>
  );
}
