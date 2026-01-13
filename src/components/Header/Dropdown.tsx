import "./Dropdown.css";
import { BurgerMenuIcon } from "./BurgerMenuIcon";

export type DropdownProps = {
  email?: string;
  avatarLetter?: string;
  className?: string;
};

export function Dropdown({ className = "" }: DropdownProps) {
  return (
    <div className={`dropdown ${className}`.trim()}>
      {/* Mobile/Tablet: Burger menu icon */}
      <button type="button" className="dropdown__mobile" aria-label="Menu">
        <BurgerMenuIcon size={24} color="var(--color-text-primary)" />
      </button>
    </div>
  );
}
