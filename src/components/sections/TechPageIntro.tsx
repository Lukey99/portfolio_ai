'use client';

import { useLocale } from '@/contexts/LocaleContext';

export function TechPageIntro() {
  const { t } = useLocale();
  return (
    <div style={{ padding: '9rem 1.5rem 3rem', textAlign: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <p style={{ fontSize: '0.7rem', color: 'rgba(var(--fg-rgb), 0.35)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
        {t.techPage.eyebrow}
      </p>
      <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: 'var(--fg)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
        Tech
      </h1>
      <p style={{ fontSize: '1rem', color: 'rgba(var(--fg-rgb), 0.45)', marginTop: '1rem', maxWidth: '480px', margin: '1rem auto 0' }}>
        {t.techPage.subtitle}
      </p>
    </div>
  );
}
