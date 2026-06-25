'use client';

import { useRef } from 'react';
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
  { icon: '🔍', from: '#8b5cf6', to: '#22d3ee' },
  { icon: '🧪', from: '#22d3ee', to: '#8b5cf6' },
  { icon: '⚡', from: '#8b5cf6', to: '#22d3ee' },
  { icon: '🔀', from: '#22d3ee', to: '#8b5cf6' },
];

function WorkflowCard({ item, index }: { item: { icon: string; from: string; to: string; title: string; desc: string; benefit: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px 0px 0px' });

  return (
    <motion.div
      ref={ref}
      className={`glass-card reveal reveal-s${index}`}
      style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.35rem' }}>{item.icon}</span>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--fg)' }}>{item.title}</h3>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'rgba(var(--fg-rgb), 0.45)', lineHeight: 1.65, flexGrow: 1 }}>
        {item.desc}
      </p>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', paddingTop: '0.25rem', borderTop: '1px solid rgba(var(--overlay-rgb), 0.06)' }}>
        <span style={{ flexShrink: 0, marginTop: '0.1rem', width: '6px', height: '6px', borderRadius: '50%', background: `linear-gradient(135deg, ${item.from}, ${item.to})`, display: 'inline-block' }} />
        <span style={{ fontSize: '0.78rem', color: 'rgba(var(--fg-rgb), 0.38)', lineHeight: 1.5 }}>
          {item.benefit}
        </span>
      </div>
    </motion.div>
  );
}

export function AIWorkflowSection() {
  const ref   = useReveal();
  const { t } = useLocale();
  const { section, workflow } = t.aiWorkflow;

  const items = WORKFLOW_STATIC.map((s, i) => ({ ...s, ...workflow[i] }));

  return (
    <section id="ai-workflow" ref={ref} style={{ padding: 'clamp(3rem,8vw,7rem) 1.5rem', backgroundColor: 'var(--bg)' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {items.map((item, i) => (
            <WorkflowCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
