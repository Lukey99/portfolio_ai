'use client';

import { useReveal } from '@/hooks/useReveal';
import { useLocale } from '@/contexts/LocaleContext';
import { ContactItem } from '@/components/molecules';
import type { PersonalInfo } from '@/types/portfolio.types';

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
  </svg>
);
const MapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

export function ContactSection({ info }: { info: PersonalInfo }) {
  const ref   = useReveal();
  const { t } = useLocale();

  return (
    <section id="contact" ref={ref} style={{ padding: '7rem 1.5rem 5rem', backgroundColor: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '700px', height: '350px', background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '64rem', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.7rem', color: 'rgba(var(--fg-rgb), 0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            01 — Contact
          </p>
          <h2 style={{ fontSize: 'clamp(2.25rem,6vw,4rem)', fontWeight: 900, color: 'var(--fg)', letterSpacing: '-0.03em' }}>
            {t.contact.title}
          </h2>
        </div>

        {/* Email card CTA */}
        <div className="reveal reveal-s1" style={{ marginBottom: '4rem' }}>
          <div style={{
            padding: '1px', borderRadius: '1.25rem',
            background: 'linear-gradient(135deg, rgba(139,92,246,0.6), rgba(34,211,238,0.4))',
            boxShadow: '0 0 60px rgba(139,92,246,0.15)',
          }}>
            <div style={{
              borderRadius: '1.2rem',
              background: 'var(--card-bg)',
              backdropFilter: 'blur(20px)',
              padding: '3rem 2.5rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)',
                width: '400px', height: '200px',
                background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '3.5rem', height: '3.5rem', borderRadius: '1rem',
                background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)',
                marginBottom: '1.5rem',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--violet-soft)' }}>
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
                </svg>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'rgba(var(--fg-rgb), 0.35)', marginBottom: '0.75rem' }}>
                {t.contact.emailLabel}
              </p>

              <p className="gradient-text" style={{
                fontSize: 'clamp(1.15rem, 3.5vw, 1.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.01em',
                marginBottom: '2rem',
                wordBreak: 'break-all',
              }}>
                {info.email}
              </p>

              <a
                href={`mailto:${info.email}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.9rem 2.25rem', borderRadius: '9999px',
                  background: 'linear-gradient(135deg,#8b5cf6,#22d3ee)',
                  color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 24px rgba(139,92,246,0.4)',
                  transition: 'opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.opacity = '0.88';
                  el.style.transform = 'scale(1.04)';
                  el.style.boxShadow = '0 8px 36px rgba(139,92,246,0.55)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.opacity = '1';
                  el.style.transform = 'scale(1)';
                  el.style.boxShadow = '0 4px 24px rgba(139,92,246,0.4)';
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                {t.contact.emailCta}
              </a>
            </div>
          </div>
        </div>

        {/* Contact cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '3rem' }}>
          <ContactItem index={0} icon={<MailIcon />}  label={t.contact.emailItemLabel}    value={info.email}   href={`mailto:${info.email}`} />
          <ContactItem index={1} icon={<PhoneIcon />} label={t.contact.phoneItemLabel}    value={info.phone}   href={`tel:${info.phone.replace(/\s/g,'')}`} />
          <ContactItem index={2} icon={<MapIcon />}   label={t.contact.locationItemLabel} value={info.location} />
        </div>

        {/* Footer */}
        <div className="reveal reveal-s3" style={{ paddingTop: '2rem', borderTop: '1px solid rgba(var(--overlay-rgb), 0.05)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <p style={{ fontSize: '0.82rem', color: 'rgba(var(--fg-rgb), 0.22)' }}>
            {t.contact.copyright}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(var(--fg-rgb), 0.18)' }}>
            {t.contact.builtWith}
          </p>
        </div>
      </div>
    </section>
  );
}
