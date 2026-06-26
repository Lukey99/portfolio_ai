interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  index: number;
}

export function ContactItem({ icon, label, value, href, index }: ContactItemProps) {
  const inner = (
    <div
      className={`glass-card reveal reveal-s${index}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.25rem 1.5rem',
        cursor: href ? 'pointer' : 'default',
      }}
    >
      <div className="icon-box icon-box--violet">{icon}</div>
      <div>
        <p
          style={{
            fontSize: '0.68rem',
            color: 'rgba(var(--fg-rgb), 0.4)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '0.2rem',
          }}
        >
          {label}
        </p>
        <p
          style={{ fontSize: 'var(--text-md)', color: 'rgba(var(--fg-rgb), 0.8)', fontWeight: 500 }}
        >
          {value}
        </p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} style={{ textDecoration: 'none', display: 'block' }}>
      {inner}
    </a>
  ) : (
    inner
  );
}
