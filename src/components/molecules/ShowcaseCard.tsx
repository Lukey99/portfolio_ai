'use client';

import { useRef, useState } from 'react';
import { Tag } from '@/components/atoms';

interface ShowcaseCardProps {
  period: string;
  title: string;
  subtitle: string;
  description: string[];
  tags: string[];
  index: number;
}

export function ShowcaseCard({
  period,
  title,
  subtitle,
  description,
  tags,
  index,
}: ShowcaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, hover: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setTilt({
      x: -((e.clientY - r.top) / r.height - 0.5) * 7,
      y: ((e.clientX - r.left) / r.width - 0.5) * 7,
      hover: true,
    });
  };

  const onLeave = () => setTilt({ x: 0, y: 0, hover: false });

  return (
    <div
      className={`reveal reveal-s${index}`}
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: '1000px', cursor: 'default' }}
    >
      <div
        className="glass-card"
        style={{
          padding: '2.5rem 3rem',
          position: 'relative',
          overflow: 'hidden',
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.hover ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
      >
        <div className="gradient-top-border" />

        <div className="sc-header">
          <div>
            <p className="text-meta" style={{ marginBottom: '0.35rem' }}>
              {period}
            </p>
            <h3 className="gradient-text sc-title">{title}</h3>
            <p className="sc-subtitle">{subtitle}</p>
          </div>
        </div>

        <div className="divider" style={{ marginBottom: '1.5rem' }} />

        <ul className="bullet-list bullet-list--lg" style={{ marginBottom: '1.75rem' }}>
          {description.map((item, i) => (
            <li key={i} className="bullet-list__item">
              <span className="bullet-list__dot bullet-list__dot--cyan" />
              {item}
            </li>
          ))}
        </ul>

        <div className="sc-tags">
          {tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
