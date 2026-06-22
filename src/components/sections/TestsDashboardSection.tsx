'use client';

import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { SectionTitle } from '@/components/molecules';
import { useReveal } from '@/hooks/useReveal';

// ── Data ─────────────────────────────────────────────────────

const QUALITY = [
  {
    label: 'Couverture', score: 100, color: '#8b5cf6', desc: 'Tous les fichiers source testés',
    popover: {
      title: 'Couverture de code',
      body: 'Tous les fichiers source publics ont au minimum un test unitaire, mesurée via @vitest/coverage-v8.',
      items: ['46 suites · 252 tests au total', 'App · Atoms · Molecules · Organisms · Hooks · Service · Lib', 'E2E et benchmarks Organisms restent à compléter'],
    },
  },
  {
    label: 'Accessibilité', score: 95, color: '#22d3ee', desc: 'Score WCAG 2A/2AA via axe-core',
    popover: {
      title: 'Score accessibilité',
      body: '0 violation critique détectée sur les 3 pages testées, conforme au standard WCAG 2.1 Niveau AA.',
      items: ['9 tests unitaires via axe-core', '5 tests E2E dark + 5 tests E2E light', 'Alt texts + rôles ARIA vérifiés'],
    },
  },
  {
    label: 'Performance', score: 88, color: '#4ade80', desc: 'LCP, CLS, TTFB dans les cibles',
    popover: {
      title: 'Web Vitals',
      body: "Core Web Vitals mesurés via PerformanceObserver dans Playwright sur la page d'accueil en local.",
      items: ['LCP < 2.5s ✓ · CLS < 0.1 ✓', 'TTFB < 500ms ✓ · API < 200ms ✓', 'FCP non mesuré → 12pts manquants'],
    },
  },
  {
    label: 'Densité', score: 90, color: '#f59e0b', desc: 'Tests par composant exposé',
    popover: {
      title: 'Densité de tests',
      body: "Ratio entre le nombre total de tests et les composants publics exposés dans l'application.",
      items: ['~10 tests / composant en moyenne', '6 types de tests différents', 'E2E Organisms + benchmarks à compléter'],
    },
  },
] as const;

const OVERALL = Math.round(QUALITY.reduce((s, q) => s + q.score, 0) / QUALITY.length);

const COVERAGE_LAYERS = [
  { label: 'App',       pct: 100, color: '#f87171' },
  { label: 'Atoms',     pct: 100, color: '#22d3ee' },
  { label: 'Molecules', pct: 100, color: '#8b5cf6' },
  { label: 'Hooks',     pct: 100, color: '#a78bfa' },
  { label: 'API',       pct: 100, color: '#10b981' },
  { label: 'Organisms', pct: 100, color: '#4ade80' },
] as const;

const PIPELINE = [
  { label: 'Lint & Types', duration: '0.3s',  count: null, color: '#4ade80', detail: 'TypeScript strict + ESLint — 0 erreur' },
  { label: 'Unit',          duration: '9s',    count: 252,  color: '#8b5cf6', detail: '46 fichiers · 252 tests · App · Atoms · Molecules · Organisms · Hooks · Service · Lib' },
  { label: 'API',           duration: '0.8s',  count: 12,   color: '#22d3ee', detail: '5 routes REST · données mockées' },
  { label: 'A11y',          duration: '1.2s',  count: 14,   color: '#f59e0b', detail: 'axe-core + Playwright · dark & light mode · WCAG 2A + 2AA' },
  { label: 'E2E',           duration: '12s',   count: 11,   color: '#10b981', detail: 'Playwright · 3 pages · navigation + contenu' },
  { label: 'Perf',          duration: '8s',    count: 7,    color: '#f87171', detail: 'LCP < 2.5s · CLS < 0.1 · TTFB < 500ms' },
] as const;

const TOTAL_DURATION = '31.3s';

// Durées numériques (secondes) pour le gantt
const PIPELINE_SECS: Record<string, number> = {
  'Lint & Types': 0.3, 'Unit': 9.0, 'API': 0.8, 'A11y': 1.2, 'E2E': 12, 'Perf': 8,
};
const TOTAL_SECS = Object.values(PIPELINE_SECS).reduce((s, v) => s + v, 0);

// Axes d'amélioration pour le score
const IMPROVEMENTS = [
  { label: 'Densité',       gap: 10, priority: 'high',   color: '#f59e0b', action: 'Tests E2E & Bench Organisms',  detail: '15 Organisms couverts en unitaire. E2E et benchmarks manquants pour compléter la densité.' },
  { label: 'Performance',   gap:  7, priority: 'medium', color: '#4ade80', action: 'Mesurer FCP & TTI',            detail: 'First Contentful Paint et Time to Interactive non encore mesurés.' },
  { label: 'Accessibilité', gap:  5, priority: 'low',    color: '#22d3ee', action: 'Tests de navigation clavier',  detail: 'Focus trap, ordre de tabulation et raccourcis clavier à valider.' },
] as const;

// Lacunes de couverture identifiées
const COVERAGE_GAPS = [
  { name: 'Organisms',    layer: 'organism', missing: ['E2E', 'Bench'],         count: 15, priority: 'medium', note: 'Tests unitaires couverts (252 tests). E2E et benchmarks à compléter pour une couverture totale.' },
  { name: 'SectionTitle', layer: 'molecule', missing: ['Unit', 'E2E', 'Bench'], count: 1,  priority: 'medium', note: 'Uniquement couvert en accessibilité. 2-3 tests unitaires seraient suffisants.' },
  { name: 'AnimatedText', layer: 'atom',     missing: ['E2E', 'Bench'],         count: 1,  priority: 'low',    note: 'E2E et benchmark manquants. Composant fréquemment utilisé.' },
  { name: 'useReveal',    layer: 'hook',     missing: ['A11y', 'E2E', 'Bench'], count: 1,  priority: 'low',    note: 'Hook sans rendu direct — A11y non applicable, Bench optionnel.' },
] as const;

const COMPONENTS = [
  { name: 'App layer ×9',    layer: 'app'      },
  { name: 'Badge',           layer: 'atom'     },
  { name: 'Button',          layer: 'atom'     },
  { name: 'Tag',             layer: 'atom'     },
  { name: 'AnimatedText',    layer: 'atom'     },
  { name: 'TimelineCard',    layer: 'molecule' },
  { name: 'SectionTitle',    layer: 'molecule' },
  { name: 'useReveal',       layer: 'hook'     },
  { name: 'usePortfolio',    layer: 'hook'     },
  { name: 'API Routes',      layer: 'api'      },
  { name: 'Hero',            layer: 'organism' },
  { name: 'Header',          layer: 'organism' },
  { name: 'Organisms ×13',   layer: 'organism' },
] as const;

const TEST_COLS = ['Unit', 'API', 'A11y', 'E2E', 'Bench'] as const;
type TestCol = typeof TEST_COLS[number];

const MATRIX: Record<string, Partial<Record<TestCol, boolean>>> = {
  'App layer ×9':   { Unit: true },
  'Badge':          { Unit: true, A11y: true, Bench: true },
  'Button':         { Unit: true, A11y: true, Bench: true },
  'Tag':            { Unit: true, A11y: true, Bench: true },
  'AnimatedText':   { Unit: true, A11y: true },
  'TimelineCard':   { Unit: true, A11y: true, Bench: true },
  'SectionTitle':   { A11y: true },
  'useReveal':      { Unit: true },
  'usePortfolio':   { Unit: true },
  'API Routes':     { API: true, E2E: true, Bench: true },
  'Hero':           { Unit: true },
  'Header':         { Unit: true },
  'Organisms ×13':  { Unit: true },
};

const COL_COLORS: Record<TestCol, string> = {
  Unit: '#8b5cf6', API: '#22d3ee', A11y: '#f59e0b', E2E: '#10b981', Bench: '#a78bfa',
};

const LAYER_COLORS: Record<string, string> = {
  app: '#f87171', atom: '#22d3ee', molecule: '#8b5cf6', hook: '#a78bfa', api: '#10b981', organism: '#4ade80',
};

// ── Tabs ──────────────────────────────────────────────────────

type DashTab = 'global' | 'score' | 'pipeline' | 'coverage' | 'why';

const TABS: { id: DashTab; label: string; icon: string }[] = [
  { id: 'global',   label: 'Vue globale',   icon: '◉' },
  { id: 'score',    label: 'Score qualité', icon: '◎' },
  { id: 'pipeline', label: 'Pipeline',      icon: '▶' },
  { id: 'coverage', label: 'Couverture',    icon: '▦' },
  { id: 'why',      label: 'Pourquoi ?',    icon: '◆' },
];

// ── Shared styles ─────────────────────────────────────────────

const CARD: React.CSSProperties = {
  background: 'var(--card-bg)',
  border: '1px solid rgba(var(--overlay-rgb), 0.09)',
  borderRadius: '1rem',
  padding: '1.5rem',
};

// ── Hooks ─────────────────────────────────────────────────────

function useCount(target: number, active: boolean, duration = 1000) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

// ── Primitives ────────────────────────────────────────────────

function scoreGrade(s: number) {
  if (s >= 90) return { grade: 'A', color: '#4ade80' };
  if (s >= 80) return { grade: 'B', color: '#8b5cf6' };
  if (s >= 70) return { grade: 'C', color: '#f59e0b' };
  return { grade: 'D', color: '#f87171' };
}

function ScoreRing({ score, color, size = 120, stroke = 10 }: { score: number; color: string; size?: number; stroke?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  const R = (size - stroke * 2) / 2;
  const C = 2 * Math.PI * R;
  const cx = size / 2;
  return (
    <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={cx} cy={cx} r={R} fill="none" stroke="rgba(var(--overlay-rgb), 0.1)" strokeWidth={stroke} />
      <motion.circle
        cx={cx} cy={cx} r={R} fill="none"
        stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={C}
        initial={{ strokeDashoffset: C }}
        animate={inView ? { strokeDashoffset: C * (1 - score / 100) } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </svg>
  );
}


function CoverageBar({ label, pct, color, delay }: { label: string; pct: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.3, delay }}
      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'default' }}
    >
      <span style={{ fontSize: '0.72rem', color: hovered ? color : 'rgba(var(--fg-rgb), 0.55)', fontFamily: 'monospace', width: '72px', flexShrink: 0, transition: 'color 0.2s' }}>{label}</span>
      <div style={{ flex: 1, height: hovered ? '9px' : '7px', borderRadius: '9999px', background: 'rgba(var(--overlay-rgb), 0.08)', overflow: 'hidden', transition: 'height 0.2s ease' }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ height: '100%', borderRadius: '9999px', background: color, width: `${pct}%`, transformOrigin: 'left' }}
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.6 }}
        style={{ fontSize: hovered ? '0.82rem' : '0.72rem', fontWeight: 800, color, fontFamily: 'monospace', width: '40px', textAlign: 'right', transition: 'font-size 0.15s' }}
      >{pct}%</motion.span>
    </motion.div>
  );
}

function SubScoreCard({ q, parentInView, index }: { q: typeof QUALITY[number]; parentInView: boolean; index: number }) {
  const count = useCount(q.score, parentInView, 900 + index * 100);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const r = cardRef.current.getBoundingClientRect();
      setPos({ top: r.top - 12, left: r.left + r.width / 2 });
    }
    setHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 12 }}
      animate={parentInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'var(--card-bg)',
        border: `1px solid ${hovered ? q.color + '50' : 'rgba(var(--overlay-rgb), 0.09)'}`,
        borderRadius: '0.75rem', padding: '1rem',
        display: 'flex', alignItems: 'center', gap: '0.85rem',
        cursor: 'help', transition: 'border-color 0.2s',
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <ScoreRing score={q.score} color={q.color} size={52} stroke={5} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 900, color: q.color }}>{count}</span>
        </div>
      </div>
      <div>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {q.label}
          <span style={{ fontSize: '0.52rem', color: 'rgba(var(--fg-rgb), 0.4)', border: '1px solid rgba(var(--overlay-rgb), 0.18)', borderRadius: '50%', width: '13px', height: '13px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>?</span>
        </div>
        <div style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.4)', lineHeight: 1.4 }}>{q.desc}</div>
      </div>
      <AnimatePresence>
        {hovered && createPortal(
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              top: pos.top,
              left: pos.left,
              transform: 'translateX(-50%) translateY(-100%)',
              zIndex: 9999,
              width: '240px',
              background: 'var(--menu-bg)',
              border: `1px solid ${q.color}35`,
              borderRadius: '0.85rem',
              padding: '1rem 1.1rem',
              boxShadow: `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px ${q.color}15`,
              pointerEvents: 'none',
            }}
          >
            <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '10px', height: '10px', background: 'var(--menu-bg)', borderRight: `1px solid ${q.color}35`, borderBottom: `1px solid ${q.color}35` }} />
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: q.color, marginBottom: '0.45rem' }}>{q.popover.title}</div>
            <div style={{ fontSize: '0.63rem', color: 'rgba(var(--fg-rgb), 0.6)', lineHeight: 1.55, marginBottom: '0.6rem' }}>{q.popover.body}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.28rem' }}>
              {q.popover.items.map((item) => (
                <div key={item} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.5)' }}>
                  <span style={{ color: q.color, flexShrink: 0 }}>›</span><span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Matrix ────────────────────────────────────────────────────

function MatrixBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [activeCol, setActiveCol] = useState<TestCol | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <div ref={ref} style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'separate', borderSpacing: 0, width: '100%', minWidth: '480px' }}>
        <thead>
          <tr>
            <th style={{ width: '120px', paddingBottom: '0.75rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.58rem', color: 'rgba(var(--fg-rgb), 0.3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Composant</span>
            </th>
            {TEST_COLS.map((col) => {
              const isActive = activeCol === col;
              return (
                <th key={col} style={{ paddingBottom: '0.75rem', textAlign: 'center' }}>
                  <button onClick={() => setActiveCol(isActive ? null : col)} style={{ fontSize: '0.62rem', fontWeight: 700, color: isActive ? COL_COLORS[col] : 'rgba(var(--fg-rgb), 0.45)', background: isActive ? `${COL_COLORS[col]}18` : 'transparent', border: `1px solid ${isActive ? COL_COLORS[col] + '50' : 'rgba(var(--overlay-rgb), 0.12)'}`, borderRadius: '999px', padding: '0.2rem 0.6rem', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {col}
                  </button>
                </th>
              );
            })}
            <th style={{ paddingBottom: '0.75rem', textAlign: 'right' }}>
              <span style={{ fontSize: '0.58rem', color: 'rgba(var(--fg-rgb), 0.3)', fontWeight: 600 }}>Cov.</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPONENTS.map((comp, ri) => {
            const covered = TEST_COLS.filter((c) => MATRIX[comp.name]?.[c]).length;
            const pct = Math.round((covered / TEST_COLS.length) * 100);
            const isHovered = hoveredRow === comp.name;
            return (
              <motion.tr key={comp.name} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: ri * 0.04, duration: 0.3 }} onMouseEnter={() => setHoveredRow(comp.name)} onMouseLeave={() => setHoveredRow(null)} style={{ background: isHovered ? 'rgba(var(--overlay-rgb), 0.04)' : 'transparent', borderRadius: '0.5rem', transition: 'background 0.15s' }}>
                <td style={{ padding: '0.4rem 0.5rem 0.4rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: LAYER_COLORS[comp.layer], flexShrink: 0, opacity: 0.7 }} />
                    <span style={{ fontSize: '0.72rem', color: isHovered ? 'var(--fg)' : 'rgba(var(--fg-rgb), 0.6)', fontFamily: 'monospace', transition: 'color 0.15s', whiteSpace: 'nowrap' }}>{comp.name}</span>
                  </div>
                </td>
                {TEST_COLS.map((col, ci) => {
                  const isCovered = !!MATRIX[comp.name]?.[col];
                  const dim = !!activeCol && activeCol !== col;
                  return (
                    <td key={col} style={{ textAlign: 'center', padding: '0.35rem 0.25rem' }}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1, opacity: dim ? 0.15 : 1 } : {}}
                        transition={{ delay: ri * 0.04 + ci * 0.03 + 0.1, duration: 0.25, type: 'spring', stiffness: 300 }}
                        style={{ width: '20px', height: '20px', borderRadius: '50%', margin: '0 auto', background: isCovered ? COL_COLORS[col] : 'transparent', border: isCovered ? 'none' : '1.5px solid rgba(var(--overlay-rgb), 0.15)', boxShadow: isCovered && isHovered ? `0 0 8px ${COL_COLORS[col]}80` : 'none', transition: 'box-shadow 0.15s' }}
                      />
                    </td>
                  );
                })}
                <td style={{ textAlign: 'right', padding: '0.35rem 0 0.35rem 0.5rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, fontFamily: 'monospace', color: pct === 100 ? '#4ade80' : pct >= 60 ? '#f59e0b' : 'rgba(var(--fg-rgb), 0.3)' }}>{pct}%</span>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1rem', flexWrap: 'wrap', paddingTop: '0.75rem', borderTop: '1px solid rgba(var(--overlay-rgb), 0.08)' }}>
        {Object.entries(LAYER_COLORS).map(([layer, color]) => (
          <div key={layer} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }} />
            <span style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.38)', textTransform: 'capitalize' }}>{layer}</span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginLeft: 'auto' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8b5cf6' }} />
          <span style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.38)' }}>couvert</span>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1.5px solid rgba(var(--overlay-rgb), 0.2)', marginLeft: '0.5rem' }} />
          <span style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.38)' }}>non couvert</span>
        </div>
      </div>
    </div>
  );
}

// ── Vue globale ───────────────────────────────────────────────

const GLOBAL_STATS = [
  { value: 252,      suffix: '',     label: 'Tests',         color: '#8b5cf6', sub: '6 types · 0 skip'      },
  { value: 0,        suffix: '',     label: 'Échecs',        color: '#4ade80', sub: 'Pipeline vert'         },
  { value: OVERALL,  suffix: '/100', label: 'Score qualité', color: '#22d3ee', sub: 'Moyenne 4 axes'        },
  { value: 100,      suffix: '%',    label: 'Cov. min',      color: '#f59e0b', sub: 'Tous fichiers couverts' },
] as const;

function StatHeroCard({ stat, inView, index }: { stat: typeof GLOBAL_STATS[number]; inView: boolean; index: number }) {
  const count = useCount(stat.value, inView, 900 + index * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      style={{ ...CARD, padding: '1.1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}
    >
      <div style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)' }}>{stat.label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
        <span style={{ fontSize: '2rem', fontWeight: 900, color: stat.color, letterSpacing: '-0.04em', lineHeight: 1 }}>
          {count}
        </span>
        {stat.suffix && <span style={{ fontSize: '0.85rem', fontWeight: 700, color: stat.color, opacity: 0.7 }}>{stat.suffix}</span>}
      </div>
      <div style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.35)' }}>{stat.sub}</div>
      <div style={{ marginTop: '0.5rem', height: '2px', background: `linear-gradient(90deg, ${stat.color}60, ${stat.color}10)`, borderRadius: '999px' }} />
    </motion.div>
  );
}

function GlobalView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const { grade, color: gradeColor } = scoreGrade(OVERALL);
  const totalTests = PIPELINE.reduce((s, p) => s + (p.count ?? 0), 0);

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Bandeau stats hero */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.875rem' }}>
        {GLOBAL_STATS.map((stat, i) => (
          <StatHeroCard key={stat.label} stat={stat} inView={inView} index={i} />
        ))}
      </div>

      {/* Corps principal */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>

        {/* Axes qualité */}
        <div style={CARD}>
          <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1.1rem' }}>Axes qualité</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {QUALITY.map((q, i) => (
              <motion.div key={q.label} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 + i * 0.07 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'rgba(var(--fg-rgb), 0.7)' }}>{q.label}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 900, color: q.color, letterSpacing: '-0.02em' }}>{q.score}<span style={{ fontSize: '0.55rem', opacity: 0.6, marginLeft: '1px' }}>/100</span></span>
                </div>
                <div style={{ height: '5px', background: 'rgba(var(--overlay-rgb), 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${q.score}%` } : {}}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.7, ease: 'easeOut' }}
                    style={{ height: '100%', background: q.color, borderRadius: '999px', boxShadow: `0 0 6px ${q.color}60` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: '1.1rem', paddingTop: '0.875rem', borderTop: '1px solid rgba(var(--overlay-rgb), 0.07)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `${gradeColor}18`, border: `1px solid ${gradeColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: gradeColor }}>{grade}</span>
            </div>
            <span style={{ fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.4)' }}>Mention globale · moyenne des 4 axes</span>
          </div>
        </div>

        {/* Pipeline */}
        <div style={CARD}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
            <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)' }}>Pipeline CI/CD</p>
            <span style={{ fontSize: '0.6rem', color: '#4ade80', fontWeight: 700, background: '#4ade8015', border: '1px solid #4ade8030', borderRadius: '999px', padding: '0.15rem 0.6rem' }}>6/6 vert</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {PIPELINE.map((stage, i) => {
              const pct = ((PIPELINE_SECS[stage.label] ?? 0) / TOTAL_SECS) * 100;
              return (
                <motion.div key={stage.label} initial={{ opacity: 0, x: 8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 + i * 0.07 }} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: stage.color, boxShadow: `0 0 5px ${stage.color}`, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'rgba(var(--fg-rgb), 0.75)', flex: 1 }}>{stage.label}</span>
                  <div style={{ width: '60px', height: '3px', background: 'rgba(var(--overlay-rgb), 0.08)', borderRadius: '999px', overflow: 'hidden', flexShrink: 0 }}>
                    <motion.div initial={{ width: 0 }} animate={inView ? { width: `${pct}%` } : {}} transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }} style={{ height: '100%', background: stage.color, borderRadius: '999px' }} />
                  </div>
                  <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: stage.color, fontWeight: 700, width: '28px', textAlign: 'right', flexShrink: 0 }}>{stage.duration}</span>
                </motion.div>
              );
            })}
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(var(--overlay-rgb), 0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.35)' }}>{totalTests} tests · {TOTAL_DURATION} total</span>
            <span style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.3)', fontFamily: 'monospace' }}>main · il y a 2h</span>
          </div>
        </div>
      </div>

      {/* Couverture full-width */}
      <div style={{ ...CARD }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)' }}>Couverture par couche atomique</p>
          <span style={{ fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.35)' }}>
            Point faible : <span style={{ color: '#f59e0b', fontWeight: 700 }}>Organisms 12%</span>
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem 2.5rem' }}>
          {COVERAGE_LAYERS.map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.25 + i * 0.07 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.65rem', color: 'rgba(var(--fg-rgb), 0.6)' }}>{c.label}</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: c.color }}>{c.pct}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(var(--overlay-rgb), 0.07)', borderRadius: '999px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${c.pct}%` } : {}}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.6, ease: 'easeOut' }}
                  style={{ height: '100%', background: c.color, borderRadius: '999px', boxShadow: c.pct < 20 ? `0 0 6px ${c.color}` : 'none' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ── Vue Score qualité ─────────────────────────────────────────

function ScoreView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCount(OVERALL, inView, 1200);
  const { grade, color: gradeColor } = scoreGrade(OVERALL);
  const [expanded, setExpanded] = useState<number | null>(null);

  const priorityColors: Record<string, string> = { high: '#f87171', medium: '#f59e0b', low: '#4ade80' };
  const priorityLabels: Record<string, string> = { high: 'Priorité haute', medium: 'Priorité moyenne', low: 'Faible impact' };

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Rings */}
      <div style={{ ...CARD, display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <ScoreRing score={OVERALL} color={gradeColor} size={160} stroke={12} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5, duration: 0.5 }} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: gradeColor, lineHeight: 1, letterSpacing: '-0.04em' }}>{count}</div>
              <div style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.35)', marginTop: '0.2rem' }}>/ 100</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: gradeColor, marginTop: '0.3rem' }}>{grade}</div>
            </motion.div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1, minWidth: '260px' }}>
          {QUALITY.map((q, i) => <SubScoreCard key={q.label} q={q} parentInView={inView} index={i} />)}
        </div>
      </div>

      {/* Axes d'amélioration */}
      <div style={CARD}>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1rem' }}>
          Axes d'amélioration
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {IMPROVEMENTS.map((imp, i) => {
            const isOpen = expanded === i;
            const pc = priorityColors[imp.priority];
            return (
              <motion.div key={imp.label} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 + i * 0.07 }}>
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 0.85rem', background: isOpen ? `${imp.color}0c` : 'transparent', border: `1px solid ${isOpen ? imp.color + '30' : 'rgba(var(--overlay-rgb), 0.07)'}`, borderRadius: '0.6rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: pc, flexShrink: 0, boxShadow: `0 0 5px ${pc}` }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--fg)', flex: 1 }}>{imp.action}</span>
                  <span style={{ fontSize: '0.58rem', color: pc, background: `${pc}18`, border: `1px solid ${pc}30`, borderRadius: '999px', padding: '0.1rem 0.5rem', flexShrink: 0 }}>
                    {priorityLabels[imp.priority]}
                  </span>
                  <span style={{ fontSize: '0.62rem', color: imp.color, fontFamily: 'monospace', fontWeight: 700, marginLeft: '0.25rem' }}>+{imp.gap}pts</span>
                  <span style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.3)', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
                      <div style={{ padding: '0.6rem 0.85rem 0.6rem 2rem', fontSize: '0.65rem', color: 'rgba(var(--fg-rgb), 0.55)', lineHeight: 1.6, borderLeft: `2px solid ${imp.color}30`, marginLeft: '0.85rem', marginTop: '0.25rem' }}>
                        {imp.detail}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        <div style={{ marginTop: '1rem', padding: '0.65rem 0.85rem', background: 'rgba(var(--overlay-rgb), 0.04)', borderRadius: '0.5rem', fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.4)', lineHeight: 1.6 }}>
          Score calculé comme la moyenne des 4 axes. Chaque point gagné sur la couverture ou la densité a le plus fort impact sur le score global.
        </div>
      </div>
    </div>
  );
}

// ── Vue Pipeline ──────────────────────────────────────────────

function PipelineView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [selected, setSelected] = useState<number | null>(null);
  const totalTests = PIPELINE.reduce((s, p) => s + (p.count ?? 0), 0);
  const slowest = PIPELINE.reduce((a, b) => (PIPELINE_SECS[a.label] ?? 0) >= (PIPELINE_SECS[b.label] ?? 0) ? a : b);

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Stats header */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.875rem' }}>
        {[
          { label: 'Durée totale', value: TOTAL_DURATION, color: '#8b5cf6' },
          { label: 'Tests exécutés', value: String(totalTests), color: '#22d3ee' },
          { label: 'Statut', value: '6/6 vert', color: '#4ade80' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ ...CARD, textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color, letterSpacing: '-0.03em' }}>{value}</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(var(--fg-rgb), 0.4)', marginTop: '0.3rem' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Stages */}
      <div style={CARD}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, overflowX: 'auto' }}>
          {PIPELINE.map((stage, i) => {
            const isSelected = selected === i;
            return (
              <div key={stage.label} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  onClick={() => setSelected(isSelected ? null : i)}
                  style={{ flex: 1, background: isSelected ? `${stage.color}18` : 'var(--card-bg)', border: `1px solid ${isSelected ? stage.color + '60' : 'rgba(var(--overlay-rgb), 0.09)'}`, borderRadius: '0.75rem', padding: '0.9rem 0.75rem', cursor: 'pointer', textAlign: 'center', transition: 'background 0.2s, border-color 0.2s', minWidth: '72px' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', marginBottom: '0.45rem' }}>
                    <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: i * 0.08 + 0.3, type: 'spring', stiffness: 300 }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: stage.color, boxShadow: `0 0 6px ${stage.color}` }} />
                    <span style={{ fontSize: '0.6rem', color: stage.color, fontWeight: 700 }}>✓</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.3rem', whiteSpace: 'nowrap' }}>{stage.label}</div>
                  <div style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.4)', fontFamily: 'monospace' }}>
                    {stage.duration}
                    {stage.count !== null && <span style={{ marginLeft: '0.3rem', color: stage.color }}>·{stage.count}</span>}
                  </div>
                </motion.button>
                {i < PIPELINE.length - 1 && (
                  <div style={{ flexShrink: 0, width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: i * 0.08 + 0.2, duration: 0.3 }} style={{ height: '1px', width: '100%', background: `linear-gradient(90deg, ${PIPELINE[i].color}60, ${PIPELINE[i + 1].color}60)`, transformOrigin: 'left' }} />
                    <div style={{ position: 'absolute', fontSize: '0.55rem', color: 'rgba(var(--fg-rgb), 0.25)' }}>▶</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <AnimatePresence>
          {selected !== null && (
            <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: '0.75rem' }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
              <div style={{ background: `${PIPELINE[selected].color}12`, border: `1px solid ${PIPELINE[selected].color}40`, borderRadius: '0.6rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: PIPELINE[selected].color, flexShrink: 0 }} />
                <span style={{ fontSize: '0.72rem', color: 'rgba(var(--fg-rgb), 0.75)' }}>{PIPELINE[selected].detail}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gantt durées */}
      <div style={CARD}>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1rem' }}>
          Répartition du temps CI
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {PIPELINE.map((stage, i) => {
            const secs = PIPELINE_SECS[stage.label] ?? 0;
            const pct = (secs / TOTAL_SECS) * 100;
            const isSlowest = stage.label === slowest.label;
            return (
              <motion.div key={stage.label} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 + i * 0.06 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 600, color: stage.color, width: '80px', flexShrink: 0 }}>{stage.label}</span>
                  <div style={{ flex: 1, height: '8px', background: 'rgba(var(--overlay-rgb), 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : {}}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: 'easeOut' }}
                      style={{ height: '100%', background: stage.color, borderRadius: '999px', boxShadow: isSlowest ? `0 0 8px ${stage.color}80` : 'none' }}
                    />
                  </div>
                  <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: isSlowest ? stage.color : 'rgba(var(--fg-rgb), 0.45)', fontWeight: isSlowest ? 700 : 400, width: '36px', textAlign: 'right', flexShrink: 0 }}>{pct.toFixed(0)}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div style={{ marginTop: '0.875rem', padding: '0.6rem 0.85rem', background: `${slowest.color}0d`, border: `1px solid ${slowest.color}30`, borderRadius: '0.5rem', fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.55)', lineHeight: 1.6 }}>
          <span style={{ color: slowest.color, fontWeight: 700 }}>{slowest.label}</span> est l'étape la plus longue ({slowest.duration} · {((PIPELINE_SECS[slowest.label] ?? 0) / TOTAL_SECS * 100).toFixed(0)}% du total). Candidat prioritaire pour la parallélisation.
        </div>
      </div>
    </div>
  );
}

// ── Vue Couverture ────────────────────────────────────────────

const PRIORITY_META: Record<string, { color: string; label: string }> = {
  high:   { color: '#f87171', label: 'Critique' },
  medium: { color: '#f59e0b', label: 'Modéré'  },
  low:    { color: '#4ade80', label: 'Faible'   },
};

const TEST_TYPE_COLORS: Record<string, string> = {
  Unit: '#8b5cf6', E2E: '#10b981', A11y: '#f59e0b', Bench: '#22d3ee',
};

function CoverageView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={CARD}>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1.25rem' }}>Par couche atomique</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {COVERAGE_LAYERS.map((c, i) => <CoverageBar key={c.label} {...c} delay={i * 0.1} />)}
        </div>
      </div>

      {/* Lacunes identifiées */}
      <div style={CARD}>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1rem' }}>
          Lacunes identifiées
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {COVERAGE_GAPS.map((gap, i) => {
            const pm = PRIORITY_META[gap.priority];
            return (
              <motion.div key={gap.name} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.08 + i * 0.07 }} style={{ padding: '0.75rem 1rem', background: `${pm.color}08`, border: `1px solid ${pm.color}22`, borderRadius: '0.7rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--fg)' }}>{gap.name}</span>
                  <span style={{ fontSize: '0.57rem', color: 'rgba(var(--fg-rgb), 0.35)', background: 'rgba(var(--overlay-rgb), 0.06)', borderRadius: '4px', padding: '0.1rem 0.45rem' }}>{gap.layer}</span>
                  <span style={{ fontSize: '0.57rem', color: pm.color, background: `${pm.color}18`, border: `1px solid ${pm.color}30`, borderRadius: '999px', padding: '0.1rem 0.5rem', marginLeft: 'auto' }}>{pm.label}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {gap.missing.map(t => (
                    <span key={t} style={{ fontSize: '0.58rem', fontWeight: 600, color: TEST_TYPE_COLORS[t] ?? '#fff', background: `${TEST_TYPE_COLORS[t] ?? '#fff'}15`, border: `1px solid ${TEST_TYPE_COLORS[t] ?? '#fff'}30`, borderRadius: '4px', padding: '0.1rem 0.4rem', fontFamily: 'monospace' }}>
                      {t} manquant
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.5)', lineHeight: 1.55, margin: 0 }}>{gap.note}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div style={CARD}>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1.25rem' }}>Par composant</p>
        <MatrixBlock />
      </div>
    </div>
  );
}

// ── Vue Pourquoi ─────────────────────────────────────────────

const WHY_REASONS = [
  {
    icon: '⚡',
    title: 'Déployer sans peur',
    color: '#8b5cf6',
    stat: '0',
    statSuffix: 'régression',
    statLabel: 'non détectée en production',
    body: 'Un pipeline vert = un code déployable. Fini les vérifications manuelles avant chaque release : si les 252 tests passent, on ship.',
  },
  {
    icon: '⏱',
    title: 'Corriger au plus tôt',
    color: '#22d3ee',
    stat: '~10×',
    statSuffix: '',
    statLabel: 'moins cher à corriger en dev qu\'en prod',
    body: 'Un bug attrapé par un test se corrige en minutes. Détecté en production, il coûte un hotfix, un rollback, et parfois une nuit blanche.',
  },
  {
    icon: '📖',
    title: 'Documentation vivante',
    color: '#4ade80',
    stat: '252',
    statSuffix: 'cas',
    statLabel: 'de comportement spécifiés',
    body: 'Chaque test décrit ce qu\'un composant doit faire. Contrairement aux commentaires, les tests ne mentent pas : si le code change, le test échoue.',
  },
  {
    icon: '↺',
    title: 'Refactoriser librement',
    color: '#f59e0b',
    stat: '100%',
    statSuffix: '',
    statLabel: 'des couches refactorisables en confiance',
    body: 'Changer l\'implémentation sans toucher les tests valide que le comportement est préservé. Les tests testent le quoi, pas le comment.',
  },
] as const;

const WHY_TEST_TYPES = [
  {
    id: 'Unit', color: '#8b5cf6', count: 252, tool: 'Vitest + Testing Library',
    points: [
      'Rendu de chaque composant selon ses props et son état',
      'Interactions : clics, saisie, toggle, navigation',
      'Hooks et service — logique métier isolée du DOM',
    ],
  },
  {
    id: 'A11y', color: '#f59e0b', count: 14, tool: 'axe-core + Playwright',
    points: [
      'Conformité WCAG 2A et 2AA — 0 violation critique',
      'Rôles ARIA, alt texts, hiérarchie des titres',
      'Dark mode et light mode vérifiés indépendamment',
    ],
  },
  {
    id: 'API', color: '#22d3ee', count: 12, tool: 'Vitest + fetch mock',
    points: [
      '5 routes REST : codes HTTP et structure JSON',
      'Erreurs réseau et cas limites gérés',
      'Cohérence des données retournées par chaque endpoint',
    ],
  },
  {
    id: 'E2E', color: '#10b981', count: 11, tool: 'Playwright',
    points: [
      'Navigation complète sur les 3 pages en conditions réelles',
      'Rendu des sections clés dans un vrai navigateur Chromium',
      'Ancres, liens actifs et scroll behavior vérifiés',
    ],
  },
  {
    id: 'Perf', color: '#f87171', count: 7, tool: 'PerformanceObserver + Playwright',
    points: [
      'LCP < 2.5s · CLS < 0.1 · TTFB < 500ms',
      'Temps de réponse API < 200ms mesuré en local',
      'Core Web Vitals sur la page d\'accueil et tech',
    ],
  },
  {
    id: 'Bench', color: '#a78bfa', count: 8, tool: 'Vitest bench',
    points: [
      'Temps de rendu des atoms et molecules (cible < 1ms)',
      'Benchmarks comparatifs entre variantes de composants',
      'Détection de régressions de performance à la compilation',
    ],
  },
] as const;

function WhyView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* 4 reason cards — 2 × 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.875rem' }}>
        {WHY_REASONS.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.06 + i * 0.08 }}
            style={{
              ...CARD, padding: '1.25rem',
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
              borderTop: `2px solid ${r.color}40`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{
                width: '2rem', height: '2rem', borderRadius: '0.5rem',
                background: `${r.color}18`, border: `1px solid ${r.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.95rem', flexShrink: 0,
              }}>{r.icon}</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--fg)' }}>{r.title}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 900, color: r.color, lineHeight: 1 }}>{r.stat}</span>
              {r.statSuffix && <span style={{ fontSize: '0.75rem', fontWeight: 700, color: r.color, opacity: 0.7 }}>{r.statSuffix}</span>}
              <span style={{ fontSize: '0.58rem', color: 'rgba(var(--fg-rgb), 0.35)', lineHeight: 1.3 }}>{r.statLabel}</span>
            </div>
            <p style={{ fontSize: '0.65rem', color: 'rgba(var(--fg-rgb), 0.55)', lineHeight: 1.65, margin: 0 }}>{r.body}</p>
          </motion.div>
        ))}
      </div>

      {/* 6 angles de tir */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.42 }}
        style={{ ...CARD, padding: '1.25rem' }}
      >
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1rem' }}>
          6 angles de tir
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {WHY_TEST_TYPES.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.48 + i * 0.06 }}
              style={{
                padding: '0.875rem',
                background: `${t.color}07`,
                border: `1px solid ${t.color}22`,
                borderRadius: '0.75rem',
                display: 'flex', flexDirection: 'column', gap: '0.5rem',
              }}
            >
              {/* Badge + count */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 800, fontFamily: 'monospace',
                  color: t.color, background: `${t.color}18`,
                  border: `1px solid ${t.color}35`, borderRadius: '4px',
                  padding: '0.1rem 0.45rem',
                }}>{t.id}</span>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: t.color }}>{t.count}</span>
              </div>

              {/* Tool */}
              <span style={{
                fontSize: '0.57rem', color: 'rgba(var(--fg-rgb), 0.3)',
                fontFamily: 'monospace', lineHeight: 1.3,
              }}>{t.tool}</span>

              {/* Points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '0.15rem' }}>
                {t.points.map(pt => (
                  <div key={pt} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: t.color, flexShrink: 0, marginTop: '0.35rem' }} />
                    <span style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.5)', lineHeight: 1.55 }}>{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────

export function TestsDashboardSection() {
  const ref = useReveal();
  const [activeTab, setActiveTab] = useState<DashTab>('global');
  const tabIndex = TABS.findIndex(t => t.id === activeTab);

  return (
    <section id="tests-dashboard" ref={ref} style={{ padding: '7rem 1.5rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <SectionTitle
          number="03"
          label="Quality Report"
          title="Dashboard qualité"
          subtitle="Score global, pipeline CI/CD et couverture par composant — vue complète de la fiabilité du code."
        />

        {/* Tab bar */}
        <div className="reveal" style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', gap: '0.375rem', background: 'var(--card-bg)', border: '1px solid rgba(var(--overlay-rgb), 0.09)', borderRadius: '0.875rem', padding: '0.3rem', width: 'fit-content' }}>
            {TABS.map((tab, i) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    position: 'relative',
                    padding: '0.45rem 1rem',
                    borderRadius: '0.6rem',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--fg)' : 'rgba(var(--fg-rgb), 0.45)',
                    transition: 'color 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="tab-pill"
                      style={{ position: 'absolute', inset: 0, borderRadius: '0.6rem', background: 'rgba(var(--overlay-rgb), 0.08)', border: '1px solid rgba(var(--overlay-rgb), 0.1)', zIndex: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{tab.icon} {tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Views */}
        <div className="reveal" style={{ maxHeight: '680px', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(var(--overlay-rgb), 0.15) transparent' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              {activeTab === 'global'   && <GlobalView />}
              {activeTab === 'score'    && <ScoreView />}
              {activeTab === 'pipeline' && <PipelineView />}
              {activeTab === 'coverage' && <CoverageView />}
              {activeTab === 'why'      && <WhyView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
