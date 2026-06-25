'use client';

import { useReveal } from '@/hooks/useReveal';
import { useLocale } from '@/contexts/LocaleContext';
import { SectionTitle } from '@/components/molecules';
import type { PersonalInfo } from '@/types/portfolio.types';

export function ProfileSection({ info }: { info: PersonalInfo }) {
  const ref   = useReveal();
  const { t } = useLocale();

  return (
    <section id="profile" ref={ref} className="section--fixed">
      <div className="container--wide">
        <SectionTitle
          number={t.sections.profile.number}
          label={t.sections.profile.label}
          title={t.sections.profile.title}
          subtitle={t.sections.profile.subtitle}
        />

        <div className="profile-grid reveal reveal-s2">

          {/* Languages */}
          <div className="glass-card profile-card">
            <h3 className="profile-card__heading">
              <span>🌐</span> {t.profile.languagesHeading}
            </h3>
            <div className="profile-card__list">
              {info.languages.map((l) => (
                <div key={l.name} className="profile-card__row">
                  <span className="profile-card__name">{l.name}</span>
                  <span className="badge badge--accent">{l.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="glass-card profile-card">
            <h3 className="profile-card__heading">
              <span>✦</span> {t.profile.interestsHeading}
            </h3>
            <div className="profile-card__list">
              {info.interests.map((interest) => (
                <div key={interest.name} className="profile-interest-row">
                  <div className="icon-box icon-box--cyan icon-box--sm">{interest.icon}</div>
                  <div>
                    <p className="profile-interest__name">{interest.name}</p>
                    <p className="profile-interest__desc">{interest.description}</p>
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
