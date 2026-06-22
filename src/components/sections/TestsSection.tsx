'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useReveal } from '@/hooks/useReveal';
import { SectionTitle } from '@/components/molecules';

// ─── Data ───────────────────────────────────────────────────────────────────

const UNIT_SUITES = [
  {
    category: 'Hook',
    file: 'useTheme.test.ts',
    path: 'src/hooks/',
    colorVar: 'var(--violet)',
    bg: 'rgba(139,92,246,0.10)',
    border: 'rgba(139,92,246,0.22)',
    tests: [
      "démarre en mode sombre par défaut",
      "détecte le mode clair depuis la classe html (anti-flash)",
      "toggle → mode clair + classe + localStorage",
      "toggle → mode sombre, supprime la classe",
      "deux toggles consécutifs reviennent à l'état initial",
    ],
  },
  {
    category: 'Atom',
    file: 'Button.test.tsx',
    path: 'src/components/atoms/',
    colorVar: 'var(--cyan)',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.20)',
    tests: [
      "rend un <a> quand href est fourni",
      "rend un <button> quand href est absent",
      "classe btn--primary par défaut",
      "classe btn--secondary avec variant secondary",
      'rel="noopener noreferrer" sur target _blank',
      "pas de rel quand target n'est pas _blank",
    ],
  },
  {
    category: 'Atom',
    file: 'Badge.test.tsx',
    path: 'src/components/atoms/',
    colorVar: 'var(--cyan)',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.20)',
    tests: [
      "affiche son contenu",
      "variante dim par défaut",
      "badge--accent avec variant accent",
      "badge--cyan avec variant cyan",
    ],
  },
  {
    category: 'Atom',
    file: 'Tag.test.tsx',
    path: 'src/components/atoms/',
    colorVar: 'var(--cyan)',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.20)',
    tests: [
      "affiche son contenu",
      "applique la classe chip",
    ],
  },
  {
    category: 'Molecule',
    file: 'SectionTitle.test.tsx',
    path: 'src/components/molecules/',
    colorVar: 'var(--violet-mid)',
    bg: 'rgba(167,139,250,0.10)',
    border: 'rgba(167,139,250,0.22)',
    tests: [
      "affiche le numéro watermark",
      "affiche le label avec le numéro",
      "affiche le titre en h2",
      "affiche le subtitle quand fourni",
      "n'affiche pas de subtitle quand absent",
    ],
  },
  {
    category: 'Molecule',
    file: 'TimelineCard.test.tsx',
    path: 'src/components/molecules/',
    colorVar: 'var(--violet-mid)',
    bg: 'rgba(167,139,250,0.10)',
    border: 'rgba(167,139,250,0.22)',
    tests: [
      "affiche badge, titre, sous-titre et période",
      "affiche tous les points de la liste",
      "affiche le badge passé en prop",
    ],
  },
  {
    category: 'Molecule',
    file: 'ContactItem.test.tsx',
    path: 'src/components/molecules/',
    colorVar: 'var(--violet-mid)',
    bg: 'rgba(167,139,250,0.10)',
    border: 'rgba(167,139,250,0.22)',
    tests: [
      "affiche le label et la valeur",
      "rend un lien cliquable quand href fourni",
      "ne rend pas de lien quand href absent",
      "affiche l'icône",
    ],
  },
  {
    category: 'Route',
    file: 'api.test.ts',
    path: 'src/app/api/portfolio/',
    colorVar: '#10b981',
    bg: 'rgba(16,185,129,0.07)',
    border: 'rgba(16,185,129,0.20)',
    tests: [
      'GET /api/portfolio — retourne 200',
      'retourne les 5 clés principales',
      'personalInfo contient name et email',
      'GET /api/portfolio/experiences — retourne 200',
      'retourne un tableau de 4 expériences',
      'chaque expérience a un id, company et type valide',
      'GET /api/portfolio/skills — retourne 200',
      'retourne 4 catégories avec id, name et skills[]',
      'GET /api/portfolio/education — retourne 200',
      'retourne 2 formations avec id et degree',
      'GET /api/portfolio/projects — retourne 200',
      'retourne 1 projet avec tags[]',
    ],
  },
] as const;

const E2E_SUITES = [
  {
    file: 'theme.spec.ts',
    label: 'Thème dark/light',
    bg: 'rgba(139,92,246,0.10)',
    border: 'rgba(139,92,246,0.22)',
    tests: [
      "charge en mode sombre par défaut",
      "toggle passe en mode clair",
      "toggle repasse en mode sombre",
      "thème persiste après rechargement de page",
      "localStorage contient le bon thème",
    ],
  },
  {
    file: 'navigation.spec.ts',
    label: 'Navigation',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.20)',
    tests: [
      "header visible dès le chargement",
      "logo pointe vers #home",
      "lien Expériences → #experience",
      "clic scroll vers la section",
      "section Contact a un lien mailto valide",
      "CTA Me contacter → #contact",
    ],
  },
] as const;

const TOTAL_UNIT = UNIT_SUITES.reduce((s, suite) => s + suite.tests.length, 0);
const TOTAL_E2E  = E2E_SUITES.reduce((s, suite) => s + suite.tests.length, 0);
const TOTAL      = TOTAL_UNIT + TOTAL_E2E;

// ─── Sub-components ──────────────────────────────────────────────────────────

const categoryClass: Record<string, string> = {
  Hook:     'badge badge--accent',
  Atom:     'badge badge--cyan',
  Molecule: 'badge badge--dim',
  Route:    'badge badge--dim',
};

function SuiteCard({ suite, index }: { suite: typeof UNIT_SUITES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px 0px 0px' });

  return (
    <motion.div
      ref={ref}
      className={`glass-card reveal reveal-s${index % 6}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span className={categoryClass[suite.category]}>{suite.category}</span>
        <span style={{ fontSize: '0.72rem', color: 'rgba(var(--fg-rgb), 0.35)', fontFamily: 'monospace' }}>
          {suite.path}<strong style={{ color: suite.colorVar }}>{suite.file}</strong>
        </span>
      </div>

      {/* Test list */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', flexGrow: 1 }}>
        {suite.tests.map((name, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: index * 0.07 + i * 0.06 + 0.15 }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.78rem', lineHeight: 1.5 }}
          >
            <span style={{ color: '#4ade80', flexShrink: 0, marginTop: '0.05em' }}>✓</span>
            <span style={{ color: 'rgba(var(--fg-rgb), 0.6)' }}>{name}</span>
          </motion.li>
        ))}
      </ul>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(var(--overlay-rgb), 0.06)' }}>
        <span style={{ fontSize: '0.72rem', color: 'rgba(var(--fg-rgb), 0.35)' }}>
          {suite.tests.length} test{suite.tests.length > 1 ? 's' : ''}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
          <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: 600 }}>passed</span>
        </div>
      </div>
    </motion.div>
  );
}

function StatCounter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <motion.div
        className="gradient-text"
        style={{ fontSize: 'clamp(2.5rem,6vw,4rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {value}
      </motion.div>
      <div style={{ fontSize: '0.8rem', color: 'rgba(var(--fg-rgb), 0.45)', marginTop: '0.35rem' }}>{label}</div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export function TestsSection() {
  const ref = useReveal();

  return (
    <section id="tests" ref={ref} style={{ padding: '7rem 1.5rem', backgroundColor: 'var(--bg)' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <SectionTitle
          number="02"
          label="Tests & Qualité"
          title="Couverture de tests"
          subtitle="Tests unitaires sur les atomes, molécules et hooks — tests E2E sur les flux utilisateur critiques. Exécutés en CI à chaque push."
        />

        {/* ── Stats globales ── */}
        <div className="reveal reveal-s3" style={{ marginBottom: '4rem' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
            gap: '1.5rem', padding: '2.5rem',
            borderRadius: '1.25rem',
            border: '1px solid rgba(var(--overlay-rgb), 0.08)',
            background: 'var(--card-bg)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Ambient glow */}
            <div style={{
              position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)',
              width: '500px', height: '200px',
              background: 'radial-gradient(ellipse, rgba(139,92,246,0.09) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <StatCounter value={TOTAL} label="tests au total" />
            <div style={{ borderLeft: '1px solid rgba(var(--overlay-rgb),0.07)', borderRight: '1px solid rgba(var(--overlay-rgb),0.07)', padding: '0 1rem' }}>
              <StatCounter value={UNIT_SUITES.length + E2E_SUITES.length} label="fichiers de tests" />
            </div>
            <StatCounter value={100} label="% passing" />
          </div>
        </div>

        {/* ── Tests unitaires ── */}
        <div className="reveal reveal-s2" style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.35rem 0.9rem', borderRadius: '9999px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.22)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--violet)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Vitest + React Testing Library
          </div>
          <span style={{ fontSize: '0.78rem', color: 'rgba(var(--fg-rgb), 0.35)' }}>{TOTAL_UNIT} tests · {UNIT_SUITES.length} fichiers</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.875rem', marginBottom: '3rem' }}>
          {UNIT_SUITES.map((suite, i) => (
            <SuiteCard key={suite.file} suite={suite} index={i} />
          ))}
        </div>

        {/* ── Tests E2E ── */}
        <div className="reveal reveal-s2" style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.35rem 0.9rem', borderRadius: '9999px', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--cyan)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Playwright E2E
          </div>
          <span style={{ fontSize: '0.78rem', color: 'rgba(var(--fg-rgb), 0.35)' }}>{TOTAL_E2E} tests · {E2E_SUITES.length} fichiers</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.875rem', marginBottom: '3rem' }}>
          {E2E_SUITES.map((suite, i) => (
            <motion.div
              key={suite.file}
              className="glass-card"
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--fg)' }}>{suite.label}</span>
                <span style={{ fontSize: '0.72rem', color: 'rgba(var(--fg-rgb), 0.35)', fontFamily: 'monospace' }}>{suite.file}</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', flexGrow: 1 }}>
                {suite.tests.map((name, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.78rem', lineHeight: 1.5 }}>
                    <span style={{ color: '#4ade80', flexShrink: 0 }}>✓</span>
                    <span style={{ color: 'rgba(var(--fg-rgb), 0.6)' }}>{name}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(var(--overlay-rgb), 0.06)' }}>
                <span style={{ fontSize: '0.72rem', color: 'rgba(var(--fg-rgb), 0.35)' }}>{suite.tests.length} tests</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
                  <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: 600 }}>passed</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CI Badge ── */}
        <div className="reveal reveal-s3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <a
            href="https://github.com/Lukey99/portfolio_ai/actions/workflows/ci.yml"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: '1px solid rgba(var(--overlay-rgb), 0.08)', background: 'var(--card-bg)', textDecoration: 'none', transition: 'border-color 0.2s ease' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(139,92,246,0.35)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(var(--overlay-rgb), 0.08)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(var(--fg-rgb),0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
            </svg>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github.com/Lukey99/portfolio_ai/actions/workflows/ci.yml/badge.svg"
              alt="CI status"
              style={{ height: '20px' }}
            />
            <span style={{ fontSize: '0.78rem', color: 'rgba(var(--fg-rgb), 0.45)' }}>Voir les actions GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
