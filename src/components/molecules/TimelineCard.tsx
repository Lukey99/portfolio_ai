import { Badge } from '@/components/atoms';

interface TimelineCardProps {
  badge: string;
  period: string;
  title: string;
  subtitle: string;
  items: string[];
  index: number;
}

export function TimelineCard({ badge, period, title, subtitle, items, index }: TimelineCardProps) {
  return (
    <div className={`timeline__item reveal reveal--left reveal-s${index}`} style={{ position: 'relative' }}>
      <div className="timeline__dot timeline__dot--violet" />

      <div className="glass-card" style={{ padding: '2rem 2.5rem' }}>
        <div className="tc-header">
          <div>
            <p className="text-meta" style={{ marginBottom: '0.3rem' }}>{period}</p>
            <h3 className="gradient-text tc-title">{title}</h3>
            <p className="tc-subtitle">{subtitle}</p>
          </div>
          <Badge variant="accent">{badge}</Badge>
        </div>

        <div className="divider" style={{ marginBottom: '1.25rem' }} />

        <ul className="bullet-list">
          {items.map((item, i) => (
            <li key={i} className="bullet-list__item">
              <span className="bullet-list__dot bullet-list__dot--violet" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
