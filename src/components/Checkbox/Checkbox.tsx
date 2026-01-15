import "@/components/Checkbox/Checkbox.css";
import { CheckmarkIcon } from "@/components/Icons";

type CheckboxProps = {
  checked: boolean;
  label: string;
  onChange: () => void;
  id?: string;
  name?: string;
};

export function Checkbox({
  checked,
  label,
  onChange,
  id,
  name,
}: CheckboxProps) {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="checkbox__input"
      />
      <label htmlFor={id} className="checkbox__label">
        <span className="checkbox__box">{checked && <CheckmarkIcon />}</span>
        <span className="checkbox__text">{label}</span>
      </label>
    </div>
  );
}
