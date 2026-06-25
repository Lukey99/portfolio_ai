import type { CSSProperties } from 'react';
import {
  UNIT_TOTAL, A11Y_E2E, A11Y_TOTAL, API_COUNT,
  E2E_TOTAL, PERF_TOTAL, BENCH_TOTAL,
} from '@/lib/generated/test-stats';

// ── Color helper ──────────────────────────────────────────────
/** Returns a color-mix() opacity variant — replaces hex-alpha suffixes like #8b5cf640 */
export const mix = (color: string, pct: number): string =>
  `color-mix(in srgb, ${color} ${pct}%, transparent)`;

// ── Static data (no translatable text) ───────────────────────

export type Priority = 'high' | 'medium' | 'low';
export type TestType = 'Unit' | 'API' | 'A11y' | 'E2E' | 'Bench';
export type DashTab  = 'global' | 'score' | 'pipeline' | 'coverage' | 'why';

export const QUALITY_STATIC = [
  { score: 100, color: 'var(--t-unit)' },
  { score: 95,  color: 'var(--t-api)' },
  { score: 88,  color: 'var(--t-organism)' },
  { score: 90,  color: 'var(--t-a11y)' },
] as const;

export const OVERALL = Math.round(QUALITY_STATIC.reduce((s, q) => s + q.score, 0) / QUALITY_STATIC.length);

export const COVERAGE_LAYERS = [
  { label: 'App',       pct: 80,  color: 'var(--t-perf)' },
  { label: 'Atoms',     pct: 100, color: 'var(--t-api)' },
  { label: 'Molecules', pct: 72,  color: 'var(--t-unit)' },
  { label: 'Hooks',     pct: 68,  color: 'var(--t-bench)' },
  { label: 'API',       pct: 100, color: 'var(--t-e2e)' },
  { label: 'Organisms', pct: 12,  color: 'var(--t-organism)' },
];

export const PIPELINE_STATIC = [
  { label: 'Lint & Types', duration: '0.3s',  count: null as null, color: 'var(--t-organism)' },
  { label: 'Unit',          duration: '9s',    count: UNIT_TOTAL,   color: 'var(--t-unit)' },
  { label: 'API',           duration: '0.8s',  count: API_COUNT,    color: 'var(--t-api)' },
  { label: 'A11y',          duration: '1.2s',  count: A11Y_E2E,     color: 'var(--t-a11y)' },
  { label: 'E2E',           duration: '12s',   count: E2E_TOTAL,    color: 'var(--t-e2e)' },
  { label: 'Perf',          duration: '8s',    count: PERF_TOTAL,   color: 'var(--t-perf)' },
];

export const TOTAL_DURATION = '31.3s';
export const PIPELINE_SECS: Record<string, number> = {
  'Lint & Types': 0.3, 'Unit': 9.0, 'API': 0.8, 'A11y': 1.2, 'E2E': 12, 'Perf': 8,
};
export const TOTAL_SECS = Object.values(PIPELINE_SECS).reduce((s, v) => s + v, 0);

export const IMPROVEMENTS_STATIC: { label: string; gap: number; priority: Priority; color: string }[] = [
  { label: 'Densité',       gap: 10, priority: 'high',   color: 'var(--t-a11y)' },
  { label: 'Performance',   gap:  7, priority: 'medium', color: 'var(--t-organism)' },
  { label: 'Accessibilité', gap:  5, priority: 'low',    color: 'var(--t-api)' },
];

export const COVERAGE_GAPS_STATIC: { name: string; layer: string; missing: TestType[]; count: number; priority: Priority }[] = [
  { name: 'Organisms',    layer: 'organism', missing: ['E2E', 'Bench'],         count: 15, priority: 'medium' },
  { name: 'SectionTitle', layer: 'molecule', missing: ['Unit', 'E2E', 'Bench'], count: 1,  priority: 'medium' },
  { name: 'AnimatedText', layer: 'atom',     missing: ['E2E', 'Bench'],         count: 1,  priority: 'low'    },
  { name: 'useReveal',    layer: 'hook',     missing: ['A11y', 'E2E', 'Bench'], count: 1,  priority: 'low'    },
];

export const COMPONENTS = [
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

export const TEST_COLS = ['Unit', 'API', 'A11y', 'E2E', 'Bench'] as const;
export type TestCol = typeof TEST_COLS[number];

export const MATRIX: Record<string, Partial<Record<TestCol, boolean>>> = {
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
  'Hero':           { Unit: true, A11y: true },
  'Header':         { Unit: true, A11y: true },
  'Organisms ×13':  { Unit: true, A11y: true },
};

export const COL_COLORS: Record<TestCol, string> = {
  Unit: 'var(--t-unit)', API: 'var(--t-api)', A11y: 'var(--t-a11y)', E2E: 'var(--t-e2e)', Bench: 'var(--t-bench)',
};

export const LAYER_COLORS: Record<string, string> = {
  app: 'var(--t-perf)', atom: 'var(--t-api)', molecule: 'var(--t-unit)', hook: 'var(--t-bench)', api: 'var(--t-e2e)', organism: 'var(--t-organism)',
};

export const GLOBAL_STATS_STATIC = [
  { value: UNIT_TOTAL, suffix: '',     color: 'var(--t-unit)' },
  { value: 0,          suffix: '',     color: 'var(--t-organism)' },
  { value: OVERALL,    suffix: '/100', color: 'var(--t-api)' },
  { value: 100,        suffix: '%',    color: 'var(--t-a11y)' },
] as const;

export const WHY_REASONS_STATIC = [
  { icon: '⚡', color: 'var(--t-unit)',     stat: '0' },
  { icon: '⏱', color: 'var(--t-api)',      stat: '9s' },
  { icon: '📖', color: 'var(--t-organism)', stat: String(UNIT_TOTAL) },
  { icon: '↺',  color: 'var(--t-a11y)',    stat: '100%' },
];

export const WHY_TEST_TYPES_STATIC = [
  { id: 'Unit',  color: 'var(--t-unit)',     count: UNIT_TOTAL  },
  { id: 'A11y',  color: 'var(--t-a11y)',     count: A11Y_TOTAL  },
  { id: 'API',   color: 'var(--t-api)',      count: API_COUNT   },
  { id: 'E2E',   color: 'var(--t-e2e)',      count: E2E_TOTAL   },
  { id: 'Perf',  color: 'var(--t-perf)',     count: PERF_TOTAL  },
  { id: 'Bench', color: 'var(--t-bench)',    count: BENCH_TOTAL },
];

export const TABS_STATIC: { id: DashTab; icon: string }[] = [
  { id: 'global',   icon: '◉' },
  { id: 'score',    icon: '◎' },
  { id: 'pipeline', icon: '▶' },
  { id: 'coverage', icon: '▦' },
  { id: 'why',      icon: '◆' },
];

export const CARD: CSSProperties = {
  background: 'var(--card-bg)',
  border: '1px solid rgba(var(--overlay-rgb), 0.09)',
  borderRadius: '1rem',
  padding: '1.5rem',
};

// ── Merged types ──────────────────────────────────────────────

export interface QualityMerged {
  score: number;
  color: string;
  label: string;
  desc: string;
  popover: { title: string; body: string; items: readonly string[] };
}

export interface StatHeroCardData {
  value: number;
  suffix: string;
  color: string;
  label: string;
  sub: string;
}
