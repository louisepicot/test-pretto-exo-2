import "./Checkbox.css";
import { CheckmarkIcon } from "@/components/Icons";

type CheckboxProps = {
  checked: boolean;
  label: string;
  onChange?: () => void;
  id?: string;
  name?: string;
  className?: string;
};

export function Checkbox({
  checked,
  label,
  onChange,
  id,
  name,
  className = "",
}: CheckboxProps) {
  const handleChange = () => {
    onChange?.();
  };

  return (
    <div className={`checkbox ${className}`.trim()}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        className="checkbox__input"
      />
      <label htmlFor={id} className="checkbox__label">
        <span className="checkbox__box">
          {checked && (
            <CheckmarkIcon className="checkbox__checkmark" />
          )}
        </span>
        <span className="checkbox__text">{label}</span>
      </label>
    </div>
  );
}
