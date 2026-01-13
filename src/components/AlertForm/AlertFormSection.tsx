import "./AlertForm.css";

type AlertFormSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function AlertFormSection({ title, children }: AlertFormSectionProps) {
  return (
    <div className="alert-form__section">
      <h2 className="alert-form__section-title">{title}</h2>
      {children}
    </div>
  );
}
