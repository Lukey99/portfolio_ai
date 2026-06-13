import { Badge } from '@/components/atoms';
import type { Experience } from '@/types/portfolio.types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const typeLabels: Record<Experience['type'], string> = {
  'full-time':    'CDI',
  apprenticeship: 'Alternance',
  entrepreneur:   'Projet',
};

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <div className={`timeline__item reveal reveal--left reveal-s${index}`} style={{ position: 'relative' }}>
      <div className="timeline__dot timeline__dot--violet" />

      <div className="glass-card" style={{ padding: '2rem 2.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(var(--fg-rgb), 0.4)', fontWeight: 500, marginBottom: '0.3rem' }}>{experience.period}</p>
            <h3 className="gradient-text" style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.15rem' }}>{experience.company}</h3>
            <p style={{ color: 'rgba(var(--fg-rgb), 0.75)', fontWeight: 500 }}>{experience.title}</p>
          </div>
          <Badge variant="accent">{typeLabels[experience.type]}</Badge>
        </div>

        <div style={{ height: '1px', background: 'rgba(var(--overlay-rgb), 0.05)', marginBottom: '1.25rem' }} />

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {experience.description.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(var(--fg-rgb), 0.55)', lineHeight: 1.65 }}>
              <span style={{ marginTop: '0.55em', width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(139,92,246,0.7)', flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
