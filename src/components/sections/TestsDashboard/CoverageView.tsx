'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useLocale } from '@/contexts/LocaleContext';
import { CARD, COVERAGE_LAYERS, COVERAGE_GAPS_STATIC, COL_COLORS, mix } from './data';
import type { Priority, TestType } from './data';
import { CoverageBar } from './primitives';
import { MatrixBlock } from './MatrixBlock';

export function CoverageView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const { t } = useLocale();

  const coverageGaps = COVERAGE_GAPS_STATIC.map((s, i) => ({
    ...s,
    note: t.testsDashboard.coverageGapNotes[i],
  }));

  const priorityMetaColors: Record<Priority, string> = { high: 'var(--t-perf)', medium: 'var(--t-a11y)', low: 'var(--t-organism)' };
  const priorityMetaLabels = t.testsDashboard.priorityMeta;

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={CARD}>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1.25rem' }}>{t.testsDashboard.coverageLayerLabel}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {COVERAGE_LAYERS.map((c, i) => <CoverageBar key={c.label} {...c} delay={i * 0.1} />)}
        </div>
      </div>

      {/* Identified gaps */}
      <div style={CARD}>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.3)', marginBottom: '1rem' }}>
          {t.testsDashboard.coverageGapsLabel}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {coverageGaps.map((gap, i) => {
            const pc = priorityMetaColors[gap.priority];
            const pl = priorityMetaLabels[gap.priority];
            return (
              <motion.div key={gap.name} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.08 + i * 0.07 }} style={{ padding: '0.75rem 1rem', background: mix(pc, 5), border: `1px solid ${mix(pc, 13)}`, borderRadius: '0.7rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--fg)' }}>{gap.name}</span>
                  <span style={{ fontSize: '0.57rem', color: 'rgba(var(--fg-rgb), 0.35)', background: 'rgba(var(--overlay-rgb), 0.06)', borderRadius: '4px', padding: '0.1rem 0.45rem' }}>{gap.layer}</span>
                  <span style={{ fontSize: '0.57rem', color: pc, background: mix(pc, 9), border: `1px solid ${mix(pc, 19)}`, borderRadius: '999px', padding: '0.1rem 0.5rem', marginLeft: 'auto' }}>{pl}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {gap.missing.map((testType: TestType) => {
                    const tc = COL_COLORS[testType] ?? 'var(--fg)';
                    return (
                      <span key={testType} style={{ fontSize: '0.58rem', fontWeight: 600, color: tc, background: mix(tc, 8), border: `1px solid ${mix(tc, 19)}`, borderRadius: '4px', padding: '0.1rem 0.4rem', fontFamily: 'monospace' }}>
                        {testType} {t.testsDashboard.missingLabel}
                      </span>
                    );
                  })}
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
