interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'cyan' | 'dim';
}

export function Badge({ children, variant = 'dim' }: BadgeProps) {
  return <span className={`badge badge--${variant}`}>{children}</span>;
}
