import type { CSSProperties } from 'react';

// ── Static data (no translatable text) ───────────────────────

export type Priority = 'high' | 'medium' | 'low';
export type TestType = 'Unit' | 'API' | 'A11y' | 'E2E' | 'Bench';
export type DashTab  = 'global' | 'score' | 'pipeline' | 'coverage' | 'why';

export const QUALITY_STATIC = [
  { score: 100, color: '#8b5cf6' },
  { score: 95,  color: '#22d3ee' },
  { score: 88,  color: '#4ade80' },
  { score: 90,  color: '#f59e0b' },
] as const;

export const OVERALL = Math.round(QUALITY_STATIC.reduce((s, q) => s + q.score, 0) / QUALITY_STATIC.length);

export const COVERAGE_LAYERS = [
  { label: 'App',       pct: 80,  color: '#f87171' },
  { label: 'Atoms',     pct: 100, color: '#22d3ee' },
  { label: 'Molecules', pct: 72,  color: '#8b5cf6' },
  { label: 'Hooks',     pct: 68,  color: '#a78bfa' },
  { label: 'API',       pct: 100, color: '#10b981' },
  { label: 'Organisms', pct: 12,  color: '#4ade80' },
];

export const PIPELINE_STATIC = [
  { label: 'Lint & Types', duration: '0.3s',  count: null as null, color: '#4ade80' },
  { label: 'Unit',          duration: '9s',    count: 245,          color: '#8b5cf6' },
  { label: 'API',           duration: '0.8s',  count: 12,           color: '#22d3ee' },
  { label: 'A11y',          duration: '1.2s',  count: 10,           color: '#f59e0b' },
  { label: 'E2E',           duration: '12s',   count: 11,           color: '#10b981' },
  { label: 'Perf',          duration: '8s',    count: 7,            color: '#f87171' },
];

export const TOTAL_DURATION = '31.3s';
export const PIPELINE_SECS: Record<string, number> = {
  'Lint & Types': 0.3, 'Unit': 9.0, 'API': 0.8, 'A11y': 1.2, 'E2E': 12, 'Perf': 8,
};
export const TOTAL_SECS = Object.values(PIPELINE_SECS).reduce((s, v) => s + v, 0);

export const IMPROVEMENTS_STATIC: { label: string; gap: number; priority: Priority; color: string }[] = [
  { label: 'Densité',       gap: 10, priority: 'high',   color: '#f59e0b' },
  { label: 'Performance',   gap:  7, priority: 'medium', color: '#4ade80' },
  { label: 'Accessibilité', gap:  5, priority: 'low',    color: '#22d3ee' },
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
  Unit: '#8b5cf6', API: '#22d3ee', A11y: '#f59e0b', E2E: '#10b981', Bench: '#a78bfa',
};

export const LAYER_COLORS: Record<string, string> = {
  app: '#f87171', atom: '#22d3ee', molecule: '#8b5cf6', hook: '#a78bfa', api: '#10b981', organism: '#4ade80',
};

export const GLOBAL_STATS_STATIC = [
  { value: 245,     suffix: '',     color: '#8b5cf6' },
  { value: 0,       suffix: '',     color: '#4ade80' },
  { value: OVERALL, suffix: '/100', color: '#22d3ee' },
  { value: 100,     suffix: '%',    color: '#f59e0b' },
] as const;

export const WHY_REASONS_STATIC = [
  { icon: '⚡', color: '#8b5cf6', stat: '0' },
  { icon: '⏱', color: '#22d3ee', stat: '~10×' },
  { icon: '📖', color: '#4ade80', stat: '245' },
  { icon: '↺',  color: '#f59e0b', stat: '100%' },
] as const;

export const WHY_TEST_TYPES_STATIC = [
  { id: 'Unit',  color: '#8b5cf6', count: 245 },
  { id: 'A11y',  color: '#f59e0b', count: 10  },
  { id: 'API',   color: '#22d3ee', count: 12  },
  { id: 'E2E',   color: '#10b981', count: 11  },
  { id: 'Perf',  color: '#f87171', count: 7   },
  { id: 'Bench', color: '#a78bfa', count: 8   },
] as const;

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
