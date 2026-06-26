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
      className={`glass-card workflow-card reveal reveal-s${index}`}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="workflow-card__header">
        <span className="workflow-card__icon">{item.icon}</span>
        <h3 className="workflow-card__title">{item.title}</h3>
      </div>

      <p className="workflow-card__desc">{item.desc}</p>

      <div className="workflow-card__benefit">
        {/* background is data-driven (from/to per card), must stay inline */}
        <span className="workflow-card__dot" style={{ background: `linear-gradient(135deg, ${item.from}, ${item.to})` }} />
        <span className="workflow-card__benefit-text">{item.benefit}</span>
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
    <section id="ai-workflow" ref={ref} className="section">
      <div className="container">
        <SectionTitle
          number={section.number}
          label={section.label}
          title={section.title}
          subtitle={section.subtitle}
        />

        {/* Tool pills — bg/border/color are data-driven, stay inline */}
        <div className="reveal reveal-s3 workflow-tools">
          {TOOLS.map((tool) => (
            <div
              key={tool.name}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                padding: '0.45rem 1rem', borderRadius: '9999px',
                background: tool.bg, border: `1px solid ${tool.border}`,
                fontSize: 'var(--text-sm)', fontWeight: 600, color: tool.color,
              }}
            >
              {tool.icon}
              {tool.name}
            </div>
          ))}
        </div>

        <div className="workflow-grid">
          {items.map((item, i) => (
            <WorkflowCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
