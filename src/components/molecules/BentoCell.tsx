import { Tag } from '@/components/atoms';

interface BentoCellProps {
  icon: string;
  name: string;
  skills: string[];
  index: number;
}

export function BentoCell({ icon, name, skills, index }: BentoCellProps) {
  return (
    <div
      className={`glass-card reveal reveal-s${index}`}
      style={{ padding: '2rem', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <div className="bc-glow" />

      <div className="bc-header">
        <span style={{ fontSize: '1.4rem' }} aria-hidden>
          {icon}
        </span>
        <h3 className="bc-name">{name}</h3>
      </div>

      <div className="bc-tags">
        {skills.map(skill => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </div>
    </div>
  );
}
