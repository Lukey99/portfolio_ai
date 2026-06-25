'use client';

import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { SectionTitle } from '@/components/molecules';
import { useReveal } from '@/hooks/useReveal';
import { useLocale } from '@/contexts/LocaleContext';
import { useIsMobile } from '@/hooks/useIsMobile';

// ── Static data (scores, colors, counts — no translatable text) ───────────────

const QUALITY_STATIC = [
  { score: 100, color: '#8b5cf6' },
  { score: 95,  color: '#22d3ee' },
  { score: 88,  color: '#4ade80' },
  { score: 90,  color: '#f59e0b' },
] as const;

const OVERALL = Math.round(QUALITY_STATIC.reduce((s, q) => s + q.score, 0) / QUALITY_STATIC.length);

const COVERAGE_LAYERS = [
  { label: 'App',       pct: 100, color: '#f87171' },
  { label: 'Atoms',     pct: 100, color: '#22d3ee' },
  { label: 'Molecules', pct: 100, color: '#8b5cf6' },
  { label: 'Hooks',     pct: 100, color: '#a78bfa' },
  { label: 'API',       pct: 100, color: '#10b981' },
  { label: 'Organisms', pct: 100, color: '#4ade80' },
] as const;

const PIPELINE_STATIC = [
  { label: 'Lint & Types', duration: '0.3s',  count: null as null, color: '#4ade80' },
  { label: 'Unit',          duration: '9s',    count: 245,          color: '#8b5cf6' },
  { label: 'API',           duration: '0.8s',  count: 12,           color: '#22d3ee' },
  { label: 'A11y',          duration: '1.2s',  count: 10,           color: '#f59e0b' },
  { label: 'E2E',           duration: '12s',   count: 11,           color: '#10b981' },
  { label: 'Perf',          duration: '8s',    count: 7,            color: '#f87171' },
];

const TOTAL_DURATION = '31.3s';
const PIPELINE_SECS: Record<string, number> = {
  'Lint & Types': 0.3, 'Unit': 9.0, 'API': 0.8, 'A11y': 1.2, 'E2E': 12, 'Perf': 8,
};
const TOTAL_SECS = Object.values(PIPELINE_SECS).reduce((s, v) => s + v, 0);

type Priority = 'high' | 'medium' | 'low';

const IMPROVEMENTS_STATIC: { label: string; gap: number; priority: Priority; color: string }[] = [
  { label: 'Densité',       gap: 10, priority: 'high',   color: '#f59e0b' },
  { label: 'Performance',   gap:  7, priority: 'medium', color: '#4ade80' },
  { label: 'Accessibilité', gap:  5, priority: 'low',    color: '#22d3ee' },
];

type TestType = 'Unit' | 'API' | 'A11y' | 'E2E' | 'Bench';

const COVERAGE_GAPS_STATIC: { name: string; layer: string; missing: TestType[]; count: number; priority: Priority }[] = [
  { name: 'Organisms',    layer: 'organism', missing: ['E2E', 'Bench'],         count: 15, priority: 'medium' },
  { name: 'SectionTitle', layer: 'molecule', missing: ['Unit', 'E2E', 'Bench'], count: 1,  priority: 'medium' },
  { name: 'AnimatedText', layer: 'atom',     missing: ['E2E', 'Bench'],         count: 1,  priority: 'low'    },
  { name: 'useReveal',    layer: 'hook',     missing: ['A11y', 'E2E', 'Bench'], count: 1,  priority: 'low'    },
];

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

const GLOBAL_STATS_STATIC = [
  { value: 245,     suffix: '',     color: '#8b5cf6' },
  { value: 0,       suffix: '',     color: '#4ade80' },
  { value: OVERALL, suffix: '/100', color: '#22d3ee' },
  { value: 100,     suffix: '%',    color: '#f59e0b' },
] as const;

const WHY_REASONS_STATIC = [
  { icon: '⚡', color: '#8b5cf6', stat: '0' },
  { icon: '⏱', color: '#22d3ee', stat: '~10×' },
  { icon: '📖', color: '#4ade80', stat: '245' },
  { icon: '↺',  color: '#f59e0b', stat: '100%' },
] as const;

const WHY_TEST_TYPES_STATIC = [
  { id: 'Unit',  color: '#8b5cf6', count: 252 },
  { id: 'A11y',  color: '#f59e0b', count: 14  },
  { id: 'API',   color: '#22d3ee', count: 12  },
  { id: 'E2E',   color: '#10b981', count: 11  },
  { id: 'Perf',  color: '#f87171', count: 7   },
  { id: 'Bench', color: '#a78bfa', count: 8   },
] as const;

// ── Tabs ──────────────────────────────────────────────────────

type DashTab = 'global' | 'score' | 'pipeline' | 'coverage' | 'why';

const TABS_STATIC: { id: DashTab; icon: string }[] = [
  { id: 'global',   icon: '◉' },
  { id: 'score',    icon: '◎' },
  { id: 'pipeline', icon: '▶' },
  { id: 'coverage', icon: '▦' },
  { id: 'why',      icon: '◆' },
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

// ── SubScoreCard ──────────────────────────────────────────────

interface QualityMerged {
  score: number;
  color: string;
  label: string;
  desc: string;
  popover: { title: string; body: string; items: readonly string[] };
}

function SubScoreCard({ q, parentInView, index }: { q: QualityMerged; parentInView: boolean; index: number }) {
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
  const { t } = useLocale();

  return (
    <div ref={ref} style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'separate', borderSpacing: 0, width: '100%', minWidth: '480px' }}>
        <thead>
          <tr>
            <th style={{ width: '120px', paddingBottom: '0.75rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.58rem', color: 'rgba(var(--fg-rgb), 0.3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.testsDashboard.componentColLabel}</span>
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
              <span style={{ fontSize: '0.58rem', color: 'rgba(var(--fg-rgb), 0.3)', fontWeight: 600 }}>{t.testsDashboard.covColLabel}</span>
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
          <span style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.38)' }}>{t.testsDashboard.coveredLabel}</span>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1.5px solid rgba(var(--overlay-rgb), 0.2)', marginLeft: '0.5rem' }} />
          <span style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.38)' }}>{t.testsDashboard.notCoveredLabel}</span>
        </div>
      </div>
    </div>
  );
}

// ── StatHeroCard ──────────────────────────────────────────────

interface StatHeroCardData {
  value: number;
  suffix: string;
  color: string;
  label: string;
  sub: string;
}

function StatHeroCard({ stat, inView, index }: { stat: StatHeroCardData; inView: boolean; index: number }) {
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

// ── Vue globale ───────────────────────────────────────────────

function GlobalView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const isMobile = useIsMobile();
  const { t } = useLocale();
  const { grade, color: gradeColor } = scoreGrade(OVERALL);
  const totalTests = PIPELINE_STATIC.reduce((s, p) => s + (p.count ?? 0), 0);

  const quality: QualityMerged[] = QUALITY_STATIC.map((s, i) => ({
    ...s,
    label: t.testsDashboard.qualityItems[i].label,
    desc: t.testsDashboard.qualityItems[i].desc,
    popover: t.testsDashboard.qualityItems[i].popover,
  }));

  const globalStats: StatHeroCardData[] = GLOBAL_STATS_STATIC.map((s, i) => ({
    ...s,
    label: t.testsDashboard.globalStats[i].label,
    sub: t.testsDashboard.globalStats[i].sub,
  }));

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Bandeau stats hero */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, 1fr)`, gap: '0.875rem' }}>
        {globalStats.map((stat, i) => (
          <StatHeroCard key={stat.label} stat={stat} inView={inView} index={i} />
        ))}
      </div>

      {/* Corps principal */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.25rem' }}>

        {/* Axes qualité */}
        <div style={CARD}>
          <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1.1rem' }}>{t.testsDashboard.qualityAxesLabel}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {quality.map((q, i) => (
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
            <span style={{ fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.4)' }}>{t.testsDashboard.globalGradeLabel}</span>
          </div>
        </div>

        {/* Pipeline */}
        <div style={CARD}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
            <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)' }}>{t.testsDashboard.pipelineCiLabel}</p>
            <span style={{ fontSize: '0.6rem', color: '#4ade80', fontWeight: 700, background: '#4ade8015', border: '1px solid #4ade8030', borderRadius: '999px', padding: '0.15rem 0.6rem' }}>{t.testsDashboard.pipelineGreenBadge}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {PIPELINE_STATIC.map((stage, i) => {
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
            <span style={{ fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.35)' }}>
              {t.testsDashboard.pipelineSummaryTemplate.replace('{tests}', String(totalTests)).replace('{total}', TOTAL_DURATION)}
            </span>
            <span style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.3)', fontFamily: 'monospace' }}>{t.testsDashboard.pipelineTimestamp}</span>
          </div>
        </div>
      </div>

      {/* Couverture full-width */}
      <div style={{ ...CARD }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)' }}>{t.testsDashboard.coverageAtomicLabel}</p>
          <span style={{ fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.35)' }}>
            {t.testsDashboard.coverageWeakPrefix}{' '}
            <span style={{ color: '#f59e0b', fontWeight: 700 }}>{t.testsDashboard.coverageWeakHighlight}</span>
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0.7rem 2.5rem' }}>
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

// ── Mobile sub-score row (compact list alternative to SubScoreCard) ──

function MobileSubScoreRow({ q, inView, index }: { q: QualityMerged; inView: boolean; index: number }) {
  const count = useCount(q.score, inView, 900 + index * 100);
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.07 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0.6rem 0',
        borderBottom: index < 3 ? '1px solid rgba(var(--overlay-rgb), 0.05)' : 'none',
      }}
    >
      <span style={{ fontSize: '0.72rem', color: 'rgba(var(--fg-rgb), 0.7)', flex: 1 }}>{q.label}</span>
      <div style={{ width: '52px', height: '4px', background: 'rgba(var(--overlay-rgb), 0.1)', borderRadius: '999px', overflow: 'hidden', flexShrink: 0 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${q.score}%` } : {}}
          transition={{ delay: 0.25 + index * 0.07, duration: 0.7, ease: 'easeOut' }}
          style={{ height: '100%', background: q.color, borderRadius: '999px', boxShadow: `0 0 4px ${q.color}60` }}
        />
      </div>
      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: q.color, fontFamily: 'monospace', width: '28px', textAlign: 'right', flexShrink: 0 }}>{count}</span>
    </motion.div>
  );
}

// ── Vue Score qualité ─────────────────────────────────────────

function ScoreView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const isMobile = useIsMobile();
  const { t } = useLocale();
  const count = useCount(OVERALL, inView, 1200);
  const { grade, color: gradeColor } = scoreGrade(OVERALL);
  const [expanded, setExpanded] = useState<number | null>(null);

  const quality: QualityMerged[] = QUALITY_STATIC.map((s, i) => ({
    ...s,
    label: t.testsDashboard.qualityItems[i].label,
    desc: t.testsDashboard.qualityItems[i].desc,
    popover: t.testsDashboard.qualityItems[i].popover,
  }));

  const improvements = IMPROVEMENTS_STATIC.map((s, i) => ({
    ...s,
    action: t.testsDashboard.improvementItems[i].action,
    detail: t.testsDashboard.improvementItems[i].detail,
  }));

  const priorityColors: Record<Priority, string> = { high: '#f87171', medium: '#f59e0b', low: '#4ade80' };
  const { priorityLabels } = t.testsDashboard;

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Rings — mobile: compact header row + subscores list; desktop: ring + 2×2 grid */}
      {isMobile ? (
        <div style={{ ...CARD, padding: '1.1rem' }}>
          {/* Compact header: small ring left + score/grade right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <ScoreRing score={OVERALL} color={gradeColor} size={88} stroke={7} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5, duration: 0.5 }} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: gradeColor, lineHeight: 1 }}>{count}</div>
                  <div style={{ fontSize: '0.65rem', fontWeight: 900, color: gradeColor }}>{grade}</div>
                </motion.div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '0.25rem' }}>Score global</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.15rem' }}>
                <span style={{ fontSize: '2.25rem', fontWeight: 900, color: gradeColor, lineHeight: 1, letterSpacing: '-0.04em' }}>{count}</span>
                <span style={{ fontSize: '0.85rem', color: gradeColor, opacity: 0.6 }}>/100</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.3rem' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: `${gradeColor}18`, border: `1px solid ${gradeColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.58rem', fontWeight: 900, color: gradeColor }}>{grade}</span>
                </div>
                <span style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.38)' }}>{t.testsDashboard.globalGradeLabel}</span>
              </div>
            </div>
          </div>
          {/* Subscores compact list */}
          <div style={{ borderTop: '1px solid rgba(var(--overlay-rgb), 0.07)', paddingTop: '0.65rem' }}>
            {quality.map((q, i) => <MobileSubScoreRow key={q.label} q={q} inView={inView} index={i} />)}
          </div>
        </div>
      ) : (
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
            {quality.map((q, i) => <SubScoreCard key={q.label} q={q} parentInView={inView} index={i} />)}
          </div>
        </div>
      )}

      {/* Axes d'amélioration */}
      <div style={CARD}>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1rem' }}>
          {t.testsDashboard.improvementsLabel}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {improvements.map((imp, i) => {
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
          {t.testsDashboard.scoreCalcNote}
        </div>
      </div>
    </div>
  );
}

// ── Vue Pipeline ──────────────────────────────────────────────

function PipelineView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const isMobile = useIsMobile();
  const { t } = useLocale();
  const [selected, setSelected] = useState<number | null>(null);
  const totalTests = PIPELINE_STATIC.reduce((s, p) => s + (p.count ?? 0), 0);
  const slowest = PIPELINE_STATIC.reduce((a, b) => (PIPELINE_SECS[a.label] ?? 0) >= (PIPELINE_SECS[b.label] ?? 0) ? a : b);

  const pipeline = PIPELINE_STATIC.map((s, i) => ({
    ...s,
    detail: t.testsDashboard.pipelineDetails[i],
  }));

  const statsLabels = t.testsDashboard.pipelineStatsLabels;

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Stats header */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.875rem' }}>
        {[
          { label: statsLabels[0], value: TOTAL_DURATION, color: '#8b5cf6' },
          { label: statsLabels[1], value: String(totalTests), color: '#22d3ee' },
          { label: statsLabels[2], value: t.testsDashboard.pipelineGreenBadge, color: '#4ade80' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ ...CARD, textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color, letterSpacing: '-0.03em' }}>{value}</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(var(--fg-rgb), 0.4)', marginTop: '0.3rem' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Stages — mobile: vertical list with inline detail; desktop: horizontal flow */}
      <div style={CARD}>
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {pipeline.map((stage, i) => {
              const isSelected = selected === i;
              return (
                <div key={stage.label}>
                  <motion.button
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setSelected(isSelected ? null : i)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '0.65rem',
                      background: isSelected ? `${stage.color}12` : 'transparent',
                      border: `1px solid ${isSelected ? stage.color + '40' : 'rgba(var(--overlay-rgb), 0.07)'}`,
                      borderRadius: '0.65rem', padding: '0.65rem 0.85rem',
                      cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s',
                    }}
                  >
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: stage.color, boxShadow: `0 0 5px ${stage.color}`, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.6rem', color: stage.color, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--fg)', flex: 1, textAlign: 'left' }}>{stage.label}</span>
                    <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: stage.color, fontWeight: 700 }}>{stage.duration}</span>
                    {stage.count !== null && <span style={{ fontSize: '0.58rem', color: 'rgba(var(--fg-rgb), 0.38)', marginLeft: '0.25rem' }}>·{stage.count}</span>}
                    <span style={{ fontSize: '0.55rem', color: 'rgba(var(--fg-rgb), 0.25)', marginLeft: '0.35rem', display: 'inline-block', transition: 'transform 0.2s', transform: isSelected ? 'rotate(180deg)' : 'none' }}>▾</span>
                  </motion.button>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} style={{ overflow: 'hidden' }}>
                        <div style={{ background: `${stage.color}12`, border: `1px solid ${stage.color}40`, borderRadius: '0.6rem', padding: '0.65rem 0.85rem', margin: '0.2rem 0', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: stage.color, flexShrink: 0, marginTop: '0.35rem' }} />
                          <span style={{ fontSize: '0.7rem', color: 'rgba(var(--fg-rgb), 0.7)', lineHeight: 1.55 }}>{stage.detail}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, overflowX: 'auto' }}>
              {pipeline.map((stage, i) => {
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
                    {i < pipeline.length - 1 && (
                      <div style={{ flexShrink: 0, width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: i * 0.08 + 0.2, duration: 0.3 }} style={{ height: '1px', width: '100%', background: `linear-gradient(90deg, ${pipeline[i].color}60, ${pipeline[i + 1].color}60)`, transformOrigin: 'left' }} />
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
                  <div style={{ background: `${pipeline[selected].color}12`, border: `1px solid ${pipeline[selected].color}40`, borderRadius: '0.6rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: pipeline[selected].color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.72rem', color: 'rgba(var(--fg-rgb), 0.75)' }}>{pipeline[selected].detail}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Gantt durées */}
      <div style={CARD}>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1rem' }}>
          {t.testsDashboard.pipelineGanttLabel}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {pipeline.map((stage, i) => {
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
          <span style={{ color: slowest.color, fontWeight: 700 }}>{slowest.label}</span>{' '}
          {t.testsDashboard.pipelineSlowestTemplate}{' '}
          ({slowest.duration} · {((PIPELINE_SECS[slowest.label] ?? 0) / TOTAL_SECS * 100).toFixed(0)}% du total).
        </div>
      </div>
    </div>
  );
}

// ── Vue Couverture ────────────────────────────────────────────

function CoverageView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const { t } = useLocale();

  const coverageGaps = COVERAGE_GAPS_STATIC.map((s, i) => ({
    ...s,
    note: t.testsDashboard.coverageGapNotes[i],
  }));

  const priorityMetaColors: Record<Priority, string> = { high: '#f87171', medium: '#f59e0b', low: '#4ade80' };
  const priorityMetaLabels = t.testsDashboard.priorityMeta;

  const TEST_TYPE_COLORS: Record<string, string> = {
    Unit: '#8b5cf6', E2E: '#10b981', A11y: '#f59e0b', Bench: '#22d3ee',
  };

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={CARD}>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1.25rem' }}>{t.testsDashboard.coverageLayerLabel}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {COVERAGE_LAYERS.map((c, i) => <CoverageBar key={c.label} {...c} delay={i * 0.1} />)}
        </div>
      </div>

      {/* Lacunes identifiées */}
      <div style={CARD}>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1rem' }}>
          {t.testsDashboard.coverageGapsLabel}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {coverageGaps.map((gap, i) => {
            const pc = priorityMetaColors[gap.priority];
            const pl = priorityMetaLabels[gap.priority];
            return (
              <motion.div key={gap.name} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.08 + i * 0.07 }} style={{ padding: '0.75rem 1rem', background: `${pc}08`, border: `1px solid ${pc}22`, borderRadius: '0.7rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--fg)' }}>{gap.name}</span>
                  <span style={{ fontSize: '0.57rem', color: 'rgba(var(--fg-rgb), 0.35)', background: 'rgba(var(--overlay-rgb), 0.06)', borderRadius: '4px', padding: '0.1rem 0.45rem' }}>{gap.layer}</span>
                  <span style={{ fontSize: '0.57rem', color: pc, background: `${pc}18`, border: `1px solid ${pc}30`, borderRadius: '999px', padding: '0.1rem 0.5rem', marginLeft: 'auto' }}>{pl}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {gap.missing.map(testType => (
                    <span key={testType} style={{ fontSize: '0.58rem', fontWeight: 600, color: TEST_TYPE_COLORS[testType] ?? '#fff', background: `${TEST_TYPE_COLORS[testType] ?? '#fff'}15`, border: `1px solid ${TEST_TYPE_COLORS[testType] ?? '#fff'}30`, borderRadius: '4px', padding: '0.1rem 0.4rem', fontFamily: 'monospace' }}>
                      {testType} {t.testsDashboard.missingLabel}
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
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1.25rem' }}>{t.testsDashboard.coverageComponentLabel}</p>
        <MatrixBlock />
      </div>
    </div>
  );
}

// ── Vue Pourquoi ─────────────────────────────────────────────

function WhyView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const isMobile = useIsMobile();
  const { t } = useLocale();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [angleIdx, setAngleIdx] = useState(0);

  function scrollToAngle(i: number) {
    if (!carouselRef.current) return;
    setAngleIdx(i);
    const cards = carouselRef.current.children;
    if (cards[i]) (cards[i] as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }

  function handleCarouselScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const cards = el.children;
    let active = 0;
    for (let i = 0; i < cards.length; i++) {
      if ((cards[i] as HTMLElement).offsetLeft <= el.scrollLeft + 8) active = i;
    }
    setAngleIdx(active);
  }

  const whyReasons = WHY_REASONS_STATIC.map((s, i) => ({
    ...s,
    title: t.testsDashboard.whyReasonItems[i].title,
    statSuffix: t.testsDashboard.whyReasonItems[i].statSuffix,
    statLabel: t.testsDashboard.whyReasonItems[i].statLabel,
    body: t.testsDashboard.whyReasonItems[i].body,
  }));

  const whyTestTypes = WHY_TEST_TYPES_STATIC.map((s, i) => ({
    ...s,
    tool: t.testsDashboard.whyTestItems[i].tool,
    points: t.testsDashboard.whyTestItems[i].points,
  }));

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* 4 reason cards */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '0.875rem' }}>
        {whyReasons.map((r, i) => (
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
          {t.testsDashboard.whyAnglesLabel}
        </p>

        {isMobile ? (
          <>
            {/* Carrousel scroll-snap */}
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              style={{
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                gap: '0.75rem',
                marginBottom: '0.875rem',
                paddingBottom: '4px',
              }}
            >
              {whyTestTypes.map((wt) => (
                <div
                  key={wt.id}
                  style={{
                    flexShrink: 0,
                    width: '84%',
                    scrollSnapAlign: 'start',
                    padding: '1rem',
                    background: `${wt.color}07`,
                    border: `1px solid ${wt.color}22`,
                    borderRadius: '0.75rem',
                    display: 'flex', flexDirection: 'column', gap: '0.6rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, fontFamily: 'monospace', color: wt.color, background: `${wt.color}18`, border: `1px solid ${wt.color}35`, borderRadius: '4px', padding: '0.15rem 0.55rem' }}>{wt.id}</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: wt.color }}>{wt.count}</span>
                  </div>
                  <span style={{ fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.35)', fontFamily: 'monospace', lineHeight: 1.35 }}>{wt.tool}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {wt.points.map((pt, pi) => (
                      <div key={pi} style={{ display: 'flex', gap: '0.45rem', alignItems: 'flex-start' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: wt.color, flexShrink: 0, marginTop: '0.32rem' }} />
                        <span style={{ fontSize: '0.65rem', color: 'rgba(var(--fg-rgb), 0.55)', lineHeight: 1.6 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* Dots indicator */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem' }}>
              {whyTestTypes.map((wt, i) => (
                <motion.button
                  key={i}
                  onClick={() => scrollToAngle(i)}
                  animate={{ width: i === angleIdx ? '18px' : '6px', background: i === angleIdx ? wt.color : 'rgba(var(--fg-rgb), 0.18)' }}
                  transition={{ duration: 0.22 }}
                  style={{ height: '6px', borderRadius: '9999px', border: 'none', cursor: 'pointer', padding: 0 }}
                />
              ))}
            </div>
          </>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {whyTestTypes.map((wt, i) => (
              <motion.div
                key={wt.id}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.48 + i * 0.06 }}
                style={{ padding: '0.875rem', background: `${wt.color}07`, border: `1px solid ${wt.color}22`, borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, fontFamily: 'monospace', color: wt.color, background: `${wt.color}18`, border: `1px solid ${wt.color}35`, borderRadius: '4px', padding: '0.1rem 0.45rem' }}>{wt.id}</span>
                  <span style={{ fontSize: '0.6rem', fontWeight: 700, color: wt.color }}>{wt.count}</span>
                </div>
                <span style={{ fontSize: '0.57rem', color: 'rgba(var(--fg-rgb), 0.3)', fontFamily: 'monospace', lineHeight: 1.3 }}>{wt.tool}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '0.15rem' }}>
                  {wt.points.map((pt, pi) => (
                    <div key={pi} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                      <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: wt.color, flexShrink: 0, marginTop: '0.35rem' }} />
                      <span style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.5)', lineHeight: 1.55 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────

export function TestsDashboardSection() {
  const ref = useReveal();
  const { t } = useLocale();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<DashTab>('global');

  const tabs = TABS_STATIC.map((tab, i) => ({
    ...tab,
    label: t.testsDashboard.tabs[i].label,
  }));

  return (
    <section id="tests-dashboard" ref={ref} style={{ padding: 'clamp(3rem,8vw,7rem) 1.5rem' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <SectionTitle
          number={t.testsDashboard.section.number}
          label={t.testsDashboard.section.label}
          title={t.testsDashboard.section.title}
          subtitle={t.testsDashboard.section.subtitle}
        />

        {/* Tab bar — mobile: full-width icon+label column; desktop: fit-content inline */}
        <div className="reveal" style={{ marginBottom: '1.75rem' }}>
          <div style={{
            display: 'flex',
            gap: '0.25rem',
            background: 'var(--card-bg)',
            border: '1px solid rgba(var(--overlay-rgb), 0.09)',
            borderRadius: '0.875rem',
            padding: '0.3rem',
            width: isMobile ? '100%' : 'fit-content',
          }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const shortLabel = tab.label.split(' ')[0].length > 5
                ? tab.label.split(' ')[0].slice(0, 5) + '.'
                : tab.label.split(' ')[0];
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    position: 'relative',
                    flex: isMobile ? 1 : 'none',
                    padding: isMobile ? '0.5rem 0.15rem' : '0.45rem 1rem',
                    borderRadius: '0.6rem',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--fg)' : 'rgba(var(--fg-rgb), 0.45)',
                    transition: 'color 0.2s',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    gap: isMobile ? '0.2rem' : '0.3rem',
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
                  <span style={{ position: 'relative', zIndex: 1, fontSize: isMobile ? '0.9rem' : '0.72rem' }}>{tab.icon}</span>
                  <span style={{ position: 'relative', zIndex: 1, fontSize: isMobile ? '0.48rem' : '0.72rem', lineHeight: 1.2 }}>
                    {isMobile ? shortLabel : tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Views */}
        <div className="reveal" style={{ maxHeight: isMobile ? 'none' : '680px', overflowY: isMobile ? 'visible' : 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(var(--overlay-rgb), 0.15) transparent' }}>
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
