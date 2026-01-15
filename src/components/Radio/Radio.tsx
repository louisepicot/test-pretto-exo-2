import "@/components/Radio/Radio.css";

type RadioProps = {
  checked: boolean;
  label: string;
  onChange?: () => void;
  id?: string;
  name?: string;
  value?: string;
};

export function Radio({
  checked,
  label,
  onChange,
  id,
  name,
  value,
}: RadioProps) {
  return (
    <div className="radio">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="radio__input"
      />
      <label htmlFor={id} className="radio__label">
        <span className="radio__circle">
          {checked && <span className="radio__dot"></span>}
        </span>
        <span className="radio__text">{label}</span>
      </label>
    </div>
  );
}
