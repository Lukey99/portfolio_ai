interface SectionTitleProps {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
}

export function SectionTitle({ number, label, title, subtitle }: SectionTitleProps) {
  return (
    <div style={{ position: 'relative', marginBottom: '5rem' }}>
      <span className="section-watermark" aria-hidden="true">{number}</span>

      <div className="reveal reveal--left reveal-s0" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ width: '2rem', height: '1px', background: 'linear-gradient(90deg,#8b5cf6,#22d3ee)', flexShrink: 0 }} />
        <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--violet-mid)' }}>
          {number} — {label}
        </span>
      </div>

      <h2 className="reveal reveal-s1" style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
        {title}
      </h2>

      {subtitle && (
        <p className="reveal reveal-s2" style={{ marginTop: '1rem', color: 'rgba(var(--fg-rgb), 0.65)', fontSize: '1rem', maxWidth: '36rem', lineHeight: 1.75 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
