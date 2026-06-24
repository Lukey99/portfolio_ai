'use client';

import { motion, useInView } from 'motion/react';
import { useReveal } from '@/hooks/useReveal';
import { useIsMobile } from '@/hooks/useIsMobile';
import { SectionTitle } from '@/components/molecules';
import { useLocale } from '@/contexts/LocaleContext';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Tag } from '@/components/atoms/Tag';
import { GradientText } from '@/components/atoms/GradientText';
import { TimelineCard } from '@/components/molecules/TimelineCard';
import { CredentialCard } from '@/components/molecules/CredentialCard';
import { ShowcaseCard } from '@/components/molecules/ShowcaseCard';
import { BentoCell } from '@/components/molecules/BentoCell';
import { ContactItem } from '@/components/molecules/ContactItem';

// ── Icons ─────────────────────────────────────────────────────

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// ── Types ─────────────────────────────────────────────────────

interface ShowcaseBlock {
  name: string;
  category: 'Atom' | 'Molecule';
  path: string;
  stories: { label: string; node: React.ReactNode }[];
}

// ── Showcases (static: no description text) ───────────────────

const SHOWCASES: ShowcaseBlock[] = [
  // ── Atoms ──────────────────────────────────────────────────
  {
    name: 'Button',
    category: 'Atom',
    path: 'src/components/atoms/Button.tsx',
    stories: [
      { label: 'primary', node: <Button href="#" variant="primary">Voir mon parcours →</Button> },
      { label: 'secondary', node: <Button href="#" variant="secondary">Me contacter</Button> },
    ],
  },
  {
    name: 'Badge',
    category: 'Atom',
    path: 'src/components/atoms/Badge.tsx',
    stories: [
      { label: 'accent', node: <Badge variant="accent">CDI</Badge> },
      { label: 'cyan', node: <Badge variant="cyan">Alternance</Badge> },
      { label: 'dim', node: <Badge variant="dim">Projet</Badge> },
    ],
  },
  {
    name: 'Tag',
    category: 'Atom',
    path: 'src/components/atoms/Tag.tsx',
    stories: [
      {
        label: 'default',
        node: (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Tag>React</Tag>
            <Tag>TypeScript</Tag>
            <Tag>Next.js</Tag>
            <Tag>Tailwind</Tag>
          </div>
        ),
      },
    ],
  },
  {
    name: 'GradientText',
    category: 'Atom',
    path: 'src/components/atoms/GradientText.tsx',
    stories: [
      {
        label: 'heading',
        node: (
          <p style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            <GradientText>Design System</GradientText>
          </p>
        ),
      },
      {
        label: 'inline',
        node: (
          <p style={{ fontSize: '0.9rem', color: 'rgba(var(--fg-rgb), 0.7)' }}>
            Spécialisé en <GradientText>React & TypeScript</GradientText>
          </p>
        ),
      },
    ],
  },
  // ── Molecules ──────────────────────────────────────────────
  {
    name: 'TimelineCard',
    category: 'Molecule',
    path: 'src/components/molecules/TimelineCard.tsx',
    stories: [
      {
        label: 'full-time',
        node: (
          <TimelineCard
            badge="CDI"
            period="Jan. 2023 — Aujourd'hui"
            title="Acme Corp"
            subtitle="Développeur Front-End Senior"
            items={[
              'Design system React partagé entre 4 équipes product.',
              'Refonte de l\'interface admin (−40 % temps de chargement).',
            ]}
            index={0}
          />
        ),
      },
      {
        label: 'apprenticeship',
        node: (
          <TimelineCard
            badge="Alternance"
            period="Sept. 2021 — Août 2023"
            title="StartupXYZ"
            subtitle="Développeur Front-End"
            items={['Migration Angular → Vue 3 + Composition API.']}
            index={0}
          />
        ),
      },
    ],
  },
  {
    name: 'ShowcaseCard',
    category: 'Molecule',
    path: 'src/components/molecules/ShowcaseCard.tsx',
    stories: [
      {
        label: 'default',
        node: (
          <ShowcaseCard
            period="2024"
            title="Portfolio AI"
            subtitle="Portefeuille généré avec IA"
            description={[
              'Next.js 16 + React 19, animations Framer Motion v12.',
              'Pipeline CI/CD : 252 tests Vitest, couverture 100 %.',
            ]}
            tags={['Next.js', 'TypeScript', 'Framer Motion', 'Vitest']}
            index={0}
          />
        ),
      },
    ],
  },
  {
    name: 'CredentialCard',
    category: 'Molecule',
    path: 'src/components/molecules/CredentialCard.tsx',
    stories: [
      {
        label: 'with-detail',
        node: (
          <CredentialCard
            period="2020 — 2023"
            institution="IUT de Bordeaux"
            title="BUT Informatique"
            detail="Développement logiciel & web"
            index={0}
          />
        ),
      },
    ],
  },
  {
    name: 'ContactItem',
    category: 'Molecule',
    path: 'src/components/molecules/ContactItem.tsx',
    stories: [
      {
        label: 'with-link',
        node: (
          <ContactItem
            icon={<EmailIcon />}
            label="Email"
            value="kevin@example.com"
            href="mailto:kevin@example.com"
            index={0}
          />
        ),
      },
      {
        label: 'no-link',
        node: <ContactItem icon={<LocationIcon />} label="Localisation" value="Paris, France" index={0} />,
      },
      {
        label: 'github',
        node: (
          <ContactItem
            icon={<GithubIcon />}
            label="GitHub"
            value="github.com/kevin-nguyen"
            href="https://github.com"
            index={0}
          />
        ),
      },
    ],
  },
  {
    name: 'BentoCell',
    category: 'Molecule',
    path: 'src/components/molecules/BentoCell.tsx',
    stories: [
      {
        label: 'default',
        node: (
          <BentoCell
            icon="⚛️"
            name="Front-End"
            skills={['React', 'Vue', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion']}
            index={0}
          />
        ),
      },
    ],
  },
];

// ── ComponentShowcase ─────────────────────────────────────────

const CATEGORY_COLOR: Record<'Atom' | 'Molecule', string> = {
  Atom: '#22d3ee',
  Molecule: '#8b5cf6',
};

function ComponentShowcase({
  block,
  description,
  index,
  isInView,
}: {
  block: ShowcaseBlock;
  description: string;
  index: number;
  isInView: boolean;
}) {
  const color = CATEGORY_COLOR[block.category];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        borderRadius: '1rem',
        background: 'var(--card-bg)',
        border: '1px solid rgba(var(--overlay-rgb), 0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1.25rem 1.5rem 1rem',
          borderBottom: '1px solid rgba(var(--overlay-rgb), 0.06)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--fg)',
              marginBottom: '0.35rem',
              fontFamily: 'monospace',
            }}
          >
            {block.name}
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'rgba(var(--fg-rgb), 0.4)', lineHeight: 1.5 }}>
            {description}
          </p>
        </div>
        <span
          style={{
            flexShrink: 0,
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            color,
            background: `${color}18`,
            border: `1px solid ${color}30`,
            padding: '0.2rem 0.55rem',
            borderRadius: '9999px',
            fontFamily: 'monospace',
            whiteSpace: 'nowrap' as const,
          }}
        >
          {block.category}
        </span>
      </div>

      {/* Stories */}
      <div
        style={{
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          flex: 1,
        }}
      >
        {block.stories.map(story => (
          <div key={story.label}>
            <span
              style={{
                display: 'block',
                fontSize: '0.68rem',
                color: 'rgba(var(--fg-rgb), 0.3)',
                fontFamily: 'monospace',
                marginBottom: '0.6rem',
                letterSpacing: '0.05em',
              }}
            >
              {story.label}
            </span>
            {block.category === 'Atom' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                {story.node}
              </div>
            ) : (
              <div style={{ width: '100%' }}>{story.node}</div>
            )}
          </div>
        ))}
      </div>

      {/* File path */}
      <div
        style={{
          padding: '0.75rem 1.5rem',
          borderTop: '1px solid rgba(var(--overlay-rgb), 0.05)',
          background: 'rgba(var(--overlay-rgb), 0.02)',
        }}
      >
        <span style={{ fontSize: '0.7rem', color: 'rgba(var(--fg-rgb), 0.25)', fontFamily: 'monospace' }}>
          {block.path}
        </span>
      </div>
    </motion.div>
  );
}

// ── Group header ──────────────────────────────────────────────

function GroupLabel({
  label,
  count,
  color,
  isInView,
  delay,
}: {
  label: string;
  count: number;
  color: string;
  isInView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}
    >
      <div style={{ width: '2px', height: '1rem', background: color, borderRadius: '1px' }} />
      <span
        style={{
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase' as const,
          color,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '0.6rem',
          fontWeight: 600,
          padding: '0.1rem 0.5rem',
          borderRadius: '9999px',
          background: `${color}15`,
          color,
          border: `1px solid ${color}25`,
          fontFamily: 'monospace',
        }}
      >
        {count}
      </span>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────

export function StorybookSection() {
  const ref      = useReveal();
  const { t }    = useLocale();
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const allBlocks = SHOWCASES.map((block, i) => ({
    block,
    description: t.storybook.showcaseDescriptions[i] ?? '',
  }));
  const atoms     = allBlocks.filter(b => b.block.category === 'Atom');
  const molecules = allBlocks.filter(b => b.block.category === 'Molecule');

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(3rem,8vw,7rem) 1.5rem clamp(3rem,8vw,8rem)',
        backgroundColor: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative' }}>
        <SectionTitle
          number={t.storybook.section.number}
          label={t.storybook.section.label}
          title={t.storybook.section.title}
          subtitle={t.storybook.section.subtitle}
        />

        <GroupLabel label={t.storybook.atomsLabel} count={atoms.length} color="#22d3ee" isInView={isInView} delay={0.05} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3.5rem',
          }}
        >
          {atoms.map(({ block, description }, i) => (
            <ComponentShowcase key={block.name} block={block} description={description} index={i} isInView={isInView} />
          ))}
        </div>

        <GroupLabel label={t.storybook.moleculesLabel} count={molecules.length} color="#8b5cf6" isInView={isInView} delay={0.1} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem',
          }}
        >
          {molecules.map(({ block, description }, i) => (
            <ComponentShowcase key={block.name} block={block} description={description} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            padding: '1.75rem 2rem',
            borderRadius: '1rem',
            background: 'var(--card-bg)',
            border: '1px solid rgba(var(--overlay-rgb), 0.08)',
          }}
        >
          <div>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.35rem' }}>
              {t.storybook.exploreTitle}
            </p>
            <p style={{ fontSize: '0.82rem', color: 'rgba(var(--fg-rgb), 0.4)' }}>
              {t.storybook.exploreLaunch}{' '}
              <code
                style={{
                  fontFamily: 'monospace',
                  color: 'var(--violet-soft)',
                  background: 'rgba(139,92,246,0.1)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '0.3rem',
                }}
              >
                npm run storybook
              </code>
            </p>
          </div>

          <a
            href="https://github.com/Lukey99/portfolio_ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.4rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#fff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg,#8b5cf6,#22d3ee)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.85';
              e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {t.storybook.exploreRepoBtn}
            <ExternalIcon />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
