'use client';

import { useLocale } from '@/contexts/LocaleContext';

export function TechPageIntro() {
  const { t } = useLocale();
  return (
    <div className="page-hero">
      <div className="page-hero__glow" />
      <p className="page-hero__eyebrow">{t.techPage.eyebrow}</p>
      <h1 className="page-hero__heading">Tech</h1>
      <p className="page-hero__subtitle">{t.techPage.subtitle}</p>
    </div>
  );
}
