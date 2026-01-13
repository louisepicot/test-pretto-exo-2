import "./Checkbox.css";

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
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="checkbox__checkmark"
            >
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <span className="checkbox__text">{label}</span>
      </label>
    </div>
  );
}
