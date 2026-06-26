'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useReveal } from '@/hooks/useReveal';
import { SectionTitle } from '@/components/molecules';
import { useLocale } from '@/contexts/LocaleContext';
import { VIOLET, CYAN, V_MID, GREEN, va } from '@/lib/colors';

// ─── Static data ─────────────────────────────────────────────────────────────

const UNIT_SUITES_STATIC = [
  { category: 'Hook',     file: 'useTheme.test.ts',      path: 'src/hooks/',                   colorVar: 'var(--violet)',     bg: va(VIOLET, 0.10), border: va(VIOLET, 0.22), count: 5  },
  { category: 'Atom',     file: 'Button.test.tsx',        path: 'src/components/atoms/',         colorVar: 'var(--cyan)',       bg: va(CYAN,   0.08), border: va(CYAN,   0.20), count: 6  },
  { category: 'Atom',     file: 'Badge.test.tsx',         path: 'src/components/atoms/',         colorVar: 'var(--cyan)',       bg: va(CYAN,   0.08), border: va(CYAN,   0.20), count: 4  },
  { category: 'Atom',     file: 'Tag.test.tsx',           path: 'src/components/atoms/',         colorVar: 'var(--cyan)',       bg: va(CYAN,   0.08), border: va(CYAN,   0.20), count: 2  },
  { category: 'Molecule', file: 'SectionTitle.test.tsx',  path: 'src/components/molecules/',     colorVar: 'var(--violet-mid)', bg: va(V_MID,  0.10), border: va(V_MID,  0.22), count: 5  },
  { category: 'Molecule', file: 'TimelineCard.test.tsx',  path: 'src/components/molecules/',     colorVar: 'var(--violet-mid)', bg: va(V_MID,  0.10), border: va(V_MID,  0.22), count: 3  },
  { category: 'Molecule', file: 'ContactItem.test.tsx',   path: 'src/components/molecules/',     colorVar: 'var(--violet-mid)', bg: va(V_MID,  0.10), border: va(V_MID,  0.22), count: 4  },
  { category: 'Route',    file: 'api.test.ts',            path: 'src/app/api/portfolio/',        colorVar: GREEN,               bg: va(GREEN,  0.07), border: va(GREEN,  0.20), count: 12 },
] as const;

const E2E_SUITES_STATIC = [
  { file: 'theme.spec.ts',      bg: va(VIOLET, 0.10), border: va(VIOLET, 0.22), count: 5 },
  { file: 'navigation.spec.ts', bg: va(CYAN,   0.08), border: va(CYAN,   0.20), count: 6 },
] as const;

const TOTAL_UNIT = UNIT_SUITES_STATIC.reduce((s, suite) => s + suite.count, 0);
const TOTAL_E2E  = E2E_SUITES_STATIC.reduce((s, suite) => s + suite.count, 0);
const TOTAL      = TOTAL_UNIT + TOTAL_E2E;

// ─── Types ───────────────────────────────────────────────────────────────────

interface UnitSuiteMerged {
  category: string;
  file: string;
  path: string;
  colorVar: string;
  bg: string;
  border: string;
  tests: readonly string[];
}

interface E2ESuiteMerged {
  file: string;
  bg: string;
  border: string;
  label: string;
  tests: readonly string[];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

const categoryClass: Record<string, string> = {
  Hook:     'badge badge--accent',
  Atom:     'badge badge--cyan',
  Molecule: 'badge badge--dim',
  Route:    'badge badge--dim',
};

function SuiteCard({ suite, index }: { suite: UnitSuiteMerged; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px 0px 0px' });

  return (
    <motion.div
      ref={ref}
      className={`glass-card suite-card reveal reveal-s${index % 6}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <div className="suite-card__header">
        <span className={categoryClass[suite.category]}>{suite.category}</span>
        <span className="suite-card__path">
          {suite.path}<strong style={{ color: suite.colorVar }}>{suite.file}</strong>
        </span>
      </div>

      <ul className="suite-card__list">
        {suite.tests.map((name, i) => (
          <motion.li
            key={i}
            className="suite-card__test"
            initial={{ opacity: 0, x: -8 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, delay: index * 0.07 + i * 0.06 + 0.15 }}
          >
            <span className="suite-card__check">✓</span>
            <span>{name}</span>
          </motion.li>
        ))}
      </ul>

      <div className="suite-card__footer">
        <span className="suite-card__count">
          {suite.tests.length} test{suite.tests.length > 1 ? 's' : ''}
        </span>
        <div className="status-passed">
          <div className="status-dot status-dot--green" />
          <span className="status-passed__text">passed</span>
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
      <div className="stat__label">{label}</div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export function TestsSection() {
  const ref   = useReveal();
  const { t } = useLocale();

  const unitSuites: UnitSuiteMerged[] = UNIT_SUITES_STATIC.map((suite, i) => ({
    ...suite,
    tests: t.tests.unitSuiteTests[i] as readonly string[],
  }));

  const e2eSuites: E2ESuiteMerged[] = E2E_SUITES_STATIC.map((suite, i) => ({
    ...suite,
    label: t.tests.e2eSuiteLabels[i],
    tests: t.tests.e2eSuiteTests[i] as readonly string[],
  }));

  return (
    <section id="tests" ref={ref} className="section">
      <div className="container--wide">
        <SectionTitle
          number={t.tests.section.number}
          label={t.tests.section.label}
          title={t.tests.section.title}
          subtitle={t.tests.section.subtitle}
        />

        {/* Stats globales */}
        <div className="reveal reveal-s3">
          <div className="tests-stats">
            <div className="section-glow section-glow--tests" />
            <StatCounter value={TOTAL} label={t.tests.totalLabel} />
            <div className="tests-stats__divider">
              <StatCounter value={UNIT_SUITES_STATIC.length + E2E_SUITES_STATIC.length} label={t.tests.filesLabel} />
            </div>
            <StatCounter value={100} label={t.tests.passingLabel} />
          </div>
        </div>

        {/* Tests unitaires */}
        <div className="reveal reveal-s2 tests-runner-label">
          <div className="tests-runner-badge tests-runner-badge--vitest">
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            {t.tests.vitestLabel}
          </div>
          <span className="tests-runner-count">{TOTAL_UNIT} tests · {UNIT_SUITES_STATIC.length} fichiers</span>
        </div>

        <div className="tests-suite-grid">
          {unitSuites.map((suite, i) => (
            <SuiteCard key={suite.file} suite={suite} index={i} />
          ))}
        </div>

        {/* Tests E2E */}
        <div className="reveal reveal-s2 tests-runner-label">
          <div className="tests-runner-badge tests-runner-badge--playwright">
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {t.tests.playwrightLabel}
          </div>
          <span className="tests-runner-count">{TOTAL_E2E} tests · {E2E_SUITES_STATIC.length} fichiers</span>
        </div>

        <div className="tests-suite-grid">
          {e2eSuites.map((suite, i) => (
            <motion.div
              key={suite.file}
              className="glass-card suite-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="suite-card__header">
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--fg)' }}>{suite.label}</span>
                <span className="suite-card__path">{suite.file}</span>
              </div>
              <ul className="suite-card__list">
                {suite.tests.map((name, j) => (
                  <li key={j} className="suite-card__test">
                    <span className="suite-card__check">✓</span>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
              <div className="suite-card__footer">
                <span className="suite-card__count">{suite.tests.length} tests</span>
                <div className="status-passed">
                  <div className="status-dot status-dot--green" />
                  <span className="status-passed__text">passed</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CI Badge */}
        <div className="reveal reveal-s3 tests-ci-wrap">
          <a
            href="https://github.com/Lukey99/portfolio_ai/actions/workflows/ci.yml"
            target="_blank"
            rel="noopener noreferrer"
            className="tests-ci-link"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(var(--fg-rgb),0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
            </svg>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github.com/Lukey99/portfolio_ai/actions/workflows/ci.yml/badge.svg"
              alt="CI status"
              style={{ height: '20px' }}
            />
            <span className="tests-ci-text">{t.tests.ghActionsBtn}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
