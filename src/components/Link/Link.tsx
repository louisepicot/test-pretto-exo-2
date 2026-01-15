import "@/components/Link/Link.css";

type LinkProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

export function Link({ children, onClick, href }: LinkProps) {
  if (href) {
    return (
      <a href={href} className="link">
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="link">
      {children}
    </button>
  );
}
