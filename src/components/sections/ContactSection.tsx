'use client';

import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { useLocale } from '@/contexts/LocaleContext';
import { ContactItem } from '@/components/molecules';
import type { PersonalInfo } from '@/types/portfolio.types';

const PhoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const MailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
  </svg>
);
const MapIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

export function ContactSection({ info }: { info: PersonalInfo }) {
  const ref = useReveal();
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  function handleCopyEmail() {
    navigator.clipboard.writeText(info.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="contact" ref={ref} className="contact-section">
      <div className="section-glow section-glow--violet-bottom" />

      <div className="container" style={{ position: 'relative' }}>
        {/* Header */}
        <div className="reveal contact-header">
          <p className="contact-eyebrow">01 — Contact</p>
          <h2 className="contact-title">{t.contact.title}</h2>
        </div>

        {/* Email card CTA */}
        <div className="reveal reveal-s1 contact-email-card">
          <div
            style={{
              padding: '1px',
              borderRadius: '1.25rem',
              background: 'linear-gradient(135deg, rgba(139,92,246,0.6), rgba(34,211,238,0.4))',
              boxShadow: '0 0 60px rgba(139,92,246,0.15)',
            }}
          >
            <div
              style={{
                borderRadius: '1.2rem',
                background: 'var(--card-bg)',
                backdropFilter: 'blur(20px)',
                padding: '3rem 2.5rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div className="section-glow section-glow--violet-top-center" />

              <div
                className="icon-box icon-box--violet icon-box--lg"
                style={{ margin: '0 auto 1.5rem' }}
              >
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                </svg>
              </div>

              <p className="contact-email-label">{t.contact.emailLabel}</p>

              <p
                className="gradient-text"
                style={{
                  fontSize: 'clamp(1.15rem, 3.5vw, 1.8rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  marginBottom: '2rem',
                  wordBreak: 'break-all',
                }}
              >
                {info.email}
              </p>

              {/* background switches on copied state — must stay inline */}
              <button
                onClick={handleCopyEmail}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.9rem 2.25rem',
                  borderRadius: '9999px',
                  background: copied
                    ? 'linear-gradient(135deg,#22c55e,#16a34a)'
                    : 'var(--gradient)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 'var(--text-base)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 24px rgba(139,92,246,0.4)',
                  transition:
                    'opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease, background 0.3s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.opacity = '0.88';
                  el.style.transform = 'scale(1.04)';
                  el.style.boxShadow = '0 8px 36px rgba(139,92,246,0.55)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.opacity = '1';
                  el.style.transform = 'scale(1)';
                  el.style.boxShadow = '0 4px 24px rgba(139,92,246,0.4)';
                }}
              >
                {copied ? (
                  <svg
                    aria-hidden="true"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
                {copied ? t.contact.emailCopied : t.contact.emailCta}
              </button>
            </div>
          </div>
        </div>

        {/* Contact cards */}
        <div className="contact-grid">
          <ContactItem
            index={0}
            icon={<MailIcon />}
            label={t.contact.emailItemLabel}
            value={info.email}
            href={`mailto:${info.email}`}
          />
          <ContactItem
            index={1}
            icon={<GitHubIcon />}
            label={t.contact.githubItemLabel}
            value="github.com/Lukey99"
            href="https://github.com/Lukey99"
          />
          <ContactItem
            index={2}
            icon={<MapIcon />}
            label={t.contact.locationItemLabel}
            value={info.location}
          />
          <ContactItem
            index={3}
            icon={<PhoneIcon />}
            label={t.contact.phoneItemLabel}
            value={info.phone}
            href={`tel:${info.phone.replace(/\s/g, '')}`}
          />
        </div>

        {/* Footer */}
        <div className="reveal reveal-s3 contact-footer">
          <p className="contact-copyright">{t.contact.copyright}</p>
          <p className="contact-built-with">{t.contact.builtWith}</p>
        </div>
      </div>
    </section>
  );
}
