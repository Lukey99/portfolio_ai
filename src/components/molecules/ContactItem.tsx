interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  index: number;
}

export function ContactItem({ icon, label, value, href, index }: ContactItemProps) {
  const inner = (
    <div className={`glass-card reveal reveal-s${index}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem', cursor: href ? 'pointer' : 'default' }}>
      <div style={{
        width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)', color: 'var(--violet-soft)',
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '0.68rem', color: 'rgba(var(--fg-rgb), 0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>{label}</p>
        <p style={{ fontSize: '0.9rem', color: 'rgba(var(--fg-rgb), 0.8)', fontWeight: 500 }}>{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} style={{ textDecoration: 'none', display: 'block' }}>{inner}</a>
  ) : (
    inner
  );
}
