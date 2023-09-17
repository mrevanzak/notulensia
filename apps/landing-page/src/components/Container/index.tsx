export function Container({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">{children}</div>
  );
}
