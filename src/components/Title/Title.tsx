type TitleProps = {
  children: React.ReactNode;
};

export function Title({ children }: TitleProps) {
  return <h2 className="text-title">{children}</h2>;
}
