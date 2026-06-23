'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useReveal } from '@/hooks/useReveal';
import { useLocale } from '@/contexts/LocaleContext';
import { SectionTitle } from '@/components/molecules';

const TOOLS = [
  {
    name: 'Cursor',
    color: 'var(--violet-soft)',
    bg: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.28)',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3l14 9-7 1-4 7z"/>
      </svg>
    ),
  },
  {
    name: 'Claude Code',
    color: 'var(--cyan-soft)',
    bg: 'rgba(34,211,238,0.10)',
    border: 'rgba(34,211,238,0.22)',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
];

const WORKFLOW_STATIC = [
  { icon: '🔍', metric: '–75%', progress: 75, from: '#8b5cf6', to: '#22d3ee' },
  { icon: '🧪', metric: '3×',   progress: 85, from: '#22d3ee', to: '#8b5cf6' },
  { icon: '⚡', metric: '+60%', progress: 60, from: '#8b5cf6', to: '#22d3ee' },
  { icon: '🔀', metric: '–50%', progress: 50, from: '#22d3ee', to: '#8b5cf6' },
];

function WorkflowCard({ item, index }: { item: { icon: string; metric: string; progress: number; from: string; to: string; title: string; desc: string; metricLabel: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px 0px 0px' });

  return (
    <div
      ref={ref}
      className={`glass-card reveal reveal-s${index}`}
      style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.35rem' }}>{item.icon}</span>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--fg)' }}>{item.title}</h3>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'rgba(var(--fg-rgb), 0.45)', lineHeight: 1.65, flexGrow: 1 }}>
        {item.desc}
      </p>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
          <span style={{
            fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em',
            background: `linear-gradient(135deg, ${item.from}, ${item.to})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {item.metric}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'rgba(var(--fg-rgb), 0.3)', textAlign: 'right', maxWidth: '9rem', lineHeight: 1.4 }}>
            {item.metricLabel}
          </span>
        </div>

        <div style={{ height: '3px', borderRadius: '9999px', background: 'rgba(var(--overlay-rgb), 0.06)', overflow: 'hidden' }}>
          <motion.div
            style={{
              height: '100%',
              borderRadius: '9999px',
              background: `linear-gradient(90deg, ${item.from}, ${item.to})`,
              originX: 0,
            }}
            initial={{ width: '0%' }}
            animate={{ width: isInView ? `${item.progress}%` : '0%' }}
            transition={{ duration: 1.4, delay: index * 0.12 + 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          />
        </div>
      </div>
    </div>
  );
}

function ProductivityCounter({ label, desc }: { label: string; desc: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px 0px 0px' });
  const [display, setDisplay] = useState('1.0×');
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;

    const duration = 1600;
    let startTime: number;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = 1 + ease;

      if (progress < 1) {
        setDisplay(value.toFixed(1) + '×');
        requestAnimationFrame(tick);
      } else {
        setDisplay('2×');
      }
    };

    requestAnimationFrame(tick);
  }, [isInView]);

  return (
    <div ref={ref} className="reveal reveal-s3" style={{ marginBottom: '2.5rem' }}>
      <div style={{
        padding: '1px', borderRadius: '1.25rem',
        background: 'linear-gradient(135deg, rgba(139,92,246,0.55), rgba(34,211,238,0.38))',
        boxShadow: '0 0 60px rgba(139,92,246,0.12)',
      }}>
        <div style={{
          borderRadius: '1.2rem',
          background: 'var(--card-bg)',
          backdropFilter: 'blur(20px)',
          padding: '3rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
            width: '600px', height: '260px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.11) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <motion.p
            style={{ fontSize: '0.72rem', color: 'rgba(var(--fg-rgb), 0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {label}
          </motion.p>

          <motion.div
            className="gradient-text"
            style={{ fontSize: 'clamp(4.5rem, 12vw, 9rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {display}
          </motion.div>

          <motion.p
            style={{ fontSize: '1rem', color: 'rgba(var(--fg-rgb), 0.4)', marginTop: '1rem', fontWeight: 400, lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {desc}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export function AIWorkflowSection() {
  const ref   = useReveal();
  const { t } = useLocale();
  const { section, productivityLabel, productivityDesc, workflow } = t.aiWorkflow;

  const items = WORKFLOW_STATIC.map((s, i) => ({ ...s, ...workflow[i] }));

  return (
    <section id="ai-workflow" ref={ref} style={{ padding: '7rem 1.5rem', backgroundColor: 'var(--bg)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <SectionTitle
          number={section.number}
          label={section.label}
          title={section.title}
          subtitle={section.subtitle}
        />

        {/* Tool pills */}
        <div className="reveal reveal-s3" style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {TOOLS.map((tool) => (
            <div
              key={tool.name}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                padding: '0.45rem 1rem', borderRadius: '9999px',
                background: tool.bg, border: `1px solid ${tool.border}`,
                fontSize: '0.82rem', fontWeight: 600, color: tool.color,
              }}
            >
              {tool.icon}
              {tool.name}
            </div>
          ))}
        </div>

        <ProductivityCounter label={productivityLabel} desc={productivityDesc} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {items.map((item, i) => (
            <WorkflowCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
