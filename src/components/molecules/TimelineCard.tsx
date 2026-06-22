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
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(var(--fg-rgb), 0.4)', fontWeight: 500, marginBottom: '0.3rem' }}>{period}</p>
            <h3 className="gradient-text" style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.15rem' }}>{title}</h3>
            <p style={{ color: 'rgba(var(--fg-rgb), 0.75)', fontWeight: 500 }}>{subtitle}</p>
          </div>
          <Badge variant="accent">{badge}</Badge>
        </div>

        <div style={{ height: '1px', background: 'rgba(var(--overlay-rgb), 0.05)', marginBottom: '1.25rem' }} />

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {items.map((item, i) => (
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
