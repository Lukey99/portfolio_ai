import { Tag } from '@/components/atoms';
import type { SkillCategory } from '@/types/portfolio.types';

interface SkillBentoProps {
  category: SkillCategory;
  index: number;
}

export function SkillBento({ category, index }: SkillBentoProps) {
  return (
    <div
      className={`glass-card reveal reveal-s${index}`}
      style={{ padding: '2rem', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative hover glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '10rem', height: '10rem',
        background: 'radial-gradient(circle at 70% 30%, rgba(139,92,246,0.12), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
        <span style={{ fontSize: '1.4rem' }} aria-hidden>{category.icon}</span>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--fg)' }}>{category.name}</h3>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {category.skills.map((skill) => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </div>
    </div>
  );
}
