import "@/components/Button/Button.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
};

export function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button button--${variant}`}
    >
      {children}
    </button>
  );
}
