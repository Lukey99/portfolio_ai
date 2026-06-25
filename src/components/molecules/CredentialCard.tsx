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
        <div className="cc-header">
          <div className="icon-box icon-box--cyan">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div>
            <p className="text-meta">{period}</p>
            <p className="cc-institution">{institution}</p>
          </div>
        </div>

        <h3 className="cc-title" style={{ marginBottom: detail ? '0.4rem' : 0 }}>{title}</h3>
        {detail && <p className="cc-detail">{detail}</p>}
      </div>
    </div>
  );
}
