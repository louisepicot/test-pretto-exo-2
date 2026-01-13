import "./Link.css";

type LinkProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
};

export function Link({ children, onClick, href, className = "" }: LinkProps) {
  if (href) {
    return (
      <a href={href} className={`link ${className}`.trim()}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`link ${className}`.trim()}
    >
      {children}
    </button>
  );
}
