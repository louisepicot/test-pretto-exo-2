import "./Dropdown.css";
import { BurgerMenuIcon } from "@/components/Header/BurgerMenuIcon";

export type DropdownProps = {
  className?: string;
};

export function Dropdown({ className = "" }: DropdownProps) {
  return (
    <div className={`dropdown ${className}`.trim()}>
      <button type="button" className="dropdown__mobile" aria-label="Menu">
        <BurgerMenuIcon size={24} color="var(--color-text-primary)" />
      </button>
    </div>
  );
}
