'use client';

import { useRef, useState } from 'react';
import { Tag } from '@/components/atoms';
import type { Project } from '@/types/portfolio.types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
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
      style={{
        perspective: '1000px',
        cursor: 'default',
      }}
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
        {/* Top gradient line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,#8b5cf6,#22d3ee,transparent)' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(var(--fg-rgb), 0.4)', fontWeight: 500, marginBottom: '0.35rem' }}>{project.period}</p>
            <h3 className="gradient-text" style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.3rem' }}>{project.company}</h3>
            <p style={{ color: 'rgba(var(--fg-rgb), 0.7)', fontWeight: 600, fontSize: '1.1rem' }}>{project.title}</p>
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(var(--overlay-rgb), 0.05)', marginBottom: '1.5rem' }} />

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.75rem' }}>
          {project.description.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(var(--fg-rgb), 0.55)', lineHeight: 1.65 }}>
              <span style={{ marginTop: '0.55em', width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(34,211,238,0.7)', flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </div>
    </div>
  );
}
