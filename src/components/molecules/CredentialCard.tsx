interface CredentialCardProps {
  period: string;
  institution: string;
  title: string;
  detail?: string;
  index: number;
}

export function CredentialCard({ period, institution, title, detail, index }: CredentialCardProps) {
  return (
    <div className={`timeline__item reveal reveal--left reveal-s${index}`} style={{ position: 'relative' }}>
      <div className="timeline__dot timeline__dot--cyan" />

      <div className="glass-card glass-card--cyan" style={{ padding: '1.75rem 2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{
            width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.2)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(34,211,238,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(var(--fg-rgb), 0.4)', fontWeight: 500 }}>{period}</p>
            <p style={{ color: 'var(--cyan-soft)', fontWeight: 600, fontSize: '0.95rem' }}>{institution}</p>
          </div>
        </div>

        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.35, marginBottom: detail ? '0.4rem' : 0 }}>
          {title}
        </h3>
        {detail && (
          <p style={{ fontSize: '0.85rem', color: 'rgba(var(--fg-rgb), 0.4)' }}>{detail}</p>
        )}
      </div>
    </div>
  );
}
