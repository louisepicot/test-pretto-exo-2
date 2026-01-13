type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function Title({ children, className = "" }: TitleProps) {
  return <h2 className={`text-title ${className}`.trim()}>{children}</h2>;
}
