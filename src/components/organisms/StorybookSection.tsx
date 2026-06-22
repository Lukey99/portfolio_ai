'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { SectionTitle } from '@/components/molecules';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Tag } from '@/components/atoms/Tag';

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

interface ShowcaseBlock {
  name: string;
  path: string;
  description: string;
  stories: { label: string; node: React.ReactNode }[];
}

const SHOWCASES: ShowcaseBlock[] = [
  {
    name: 'Button',
    path: 'src/components/atoms/Button.tsx',
    description: 'Bouton primaire (gradient) ou secondaire (outline), accepte href ou onClick.',
    stories: [
      { label: 'primary',   node: <Button href="#" variant="primary">Voir mon parcours →</Button> },
      { label: 'secondary', node: <Button href="#" variant="secondary">Me contacter</Button> },
    ],
  },
  {
    name: 'Badge',
    path: 'src/components/atoms/Badge.tsx',
    description: 'Étiquette inline pour typer un contenu : accent violet, cyan, ou neutre.',
    stories: [
      { label: 'accent',    node: <Badge variant="accent">CDI</Badge> },
      { label: 'cyan',      node: <Badge variant="cyan">Alternance</Badge> },
      { label: 'dim',       node: <Badge variant="dim">Projet</Badge> },
    ],
  },
  {
    name: 'Tag',
    path: 'src/components/atoms/Tag.tsx',
    description: 'Chip technologie utilisé dans les cartes de projets et compétences.',
    stories: [
      { label: 'default', node: (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Tag>React</Tag>
          <Tag>TypeScript</Tag>
          <Tag>Next.js</Tag>
          <Tag>Framer Motion</Tag>
        </div>
      )},
    ],
  },
];

function ShowcaseCard({ block, index, isInView }: { block: ShowcaseBlock; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        borderRadius: '1rem',
        background: 'var(--card-bg)',
        border: '1px solid rgba(var(--overlay-rgb), 0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Card header */}
      <div style={{ padding: '1.25rem 1.5rem 1rem', borderBottom: '1px solid rgba(var(--overlay-rgb), 0.06)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.35rem', fontFamily: 'monospace' }}>
            {block.name}
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'rgba(var(--fg-rgb), 0.4)', lineHeight: 1.5 }}>
            {block.description}
          </p>
        </div>
        <span style={{ flexShrink: 0, fontSize: '0.65rem', color: 'rgba(var(--fg-rgb), 0.25)', fontFamily: 'monospace', paddingTop: '0.2rem', whiteSpace: 'nowrap' }}>
          Atom
        </span>
      </div>

      {/* Stories */}
      <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {block.stories.map((story) => (
          <div key={story.label}>
            <span style={{ display: 'block', fontSize: '0.68rem', color: 'rgba(var(--fg-rgb), 0.3)', fontFamily: 'monospace', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>
              {story.label}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              {story.node}
            </div>
          </div>
        ))}
      </div>

      {/* File path */}
      <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid rgba(var(--overlay-rgb), 0.05)', background: 'rgba(var(--overlay-rgb), 0.02)' }}>
        <span style={{ fontSize: '0.7rem', color: 'rgba(var(--fg-rgb), 0.25)', fontFamily: 'monospace' }}>
          {block.path}
        </span>
      </div>
    </motion.div>
  );
}

export function StorybookSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section ref={ref} style={{ padding: '7rem 1.5rem 8rem', backgroundColor: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '64rem', margin: '0 auto', position: 'relative' }}>
        <SectionTitle number="06" label="Storybook" title="Bibliothèque de composants" />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontSize: '1rem', color: 'rgba(var(--fg-rgb), 0.45)', maxWidth: '540px', marginBottom: '3rem', lineHeight: 1.7 }}
        >
          Chaque atome est documenté et isolé dans Storybook — variants, props, états interactifs et documentation auto-générée.
        </motion.p>

        {/* Component showcase */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {SHOWCASES.map((block, i) => (
            <ShowcaseCard key={block.name} block={block} index={i} isInView={isInView} />
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
            gap: '1.5rem', padding: '1.75rem 2rem', borderRadius: '1rem',
            background: 'var(--card-bg)',
            border: '1px solid rgba(var(--overlay-rgb), 0.08)',
          }}
        >
          <div>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.35rem' }}>
              Explorer le Storybook complet
            </p>
            <p style={{ fontSize: '0.82rem', color: 'rgba(var(--fg-rgb), 0.4)' }}>
              Lancer en local :{' '}
              <code style={{ fontFamily: 'monospace', color: 'var(--violet-soft)', background: 'rgba(139,92,246,0.1)', padding: '0.15rem 0.5rem', borderRadius: '0.3rem' }}>
                npm run storybook
              </code>
            </p>
          </div>

          <a
            href="https://github.com/Lukey99/portfolio_ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.65rem 1.4rem', borderRadius: '9999px',
              fontSize: '0.85rem', fontWeight: 600, color: '#fff', textDecoration: 'none',
              background: 'linear-gradient(135deg,#8b5cf6,#22d3ee)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Voir le repo
            <ExternalIcon />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
