'use client';

import { useReveal } from '@/hooks/useReveal';
import { useLocale } from '@/contexts/LocaleContext';
import { SectionTitle } from '@/components/molecules';
import type { PersonalInfo } from '@/types/portfolio.types';

export function ProfileSection({ info }: { info: PersonalInfo }) {
  const ref   = useReveal();
  const { t } = useLocale();

  return (
    <section id="profile" ref={ref} style={{ padding: '7rem 1.5rem', backgroundColor: 'var(--bg)' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <SectionTitle
          number={t.sections.profile.number}
          label={t.sections.profile.label}
          title={t.sections.profile.title}
          subtitle={t.sections.profile.subtitle}
        />

        <div className="reveal reveal-s2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1rem' }}>
          {/* Languages */}
          <div className="glass-card" style={{ padding: '1.5rem 1.75rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🌐</span> {t.profile.languagesHeading}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {info.languages.map((l) => (
                <div key={l.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.9rem', color: 'rgba(var(--fg-rgb), 0.7)' }}>{l.name}</span>
                  <span className="badge badge--accent">{l.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="glass-card" style={{ padding: '1.5rem 1.75rem' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>✦</span> {t.profile.interestsHeading}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {info.interests.map((interest) => (
                <div key={interest.name} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '0.5rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.15)', fontSize: '0.75rem' }}>
                    {interest.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(var(--fg-rgb), 0.8)', fontWeight: 500 }}>{interest.name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(var(--fg-rgb), 0.4)' }}>{interest.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
