export function GradientText({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={`gradient-text ${className}`}>{children}</span>;
}
