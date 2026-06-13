interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
}

export function Button({ children, variant = 'primary', href, onClick, className = '', target }: ButtonProps) {
  const cls = `btn btn--${variant} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
