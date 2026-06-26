'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView } from 'motion/react';
import { useLocale } from '@/contexts/LocaleContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import {
  CARD,
  OVERALL,
  QUALITY_STATIC,
  PIPELINE_STATIC,
  PIPELINE_SECS,
  TOTAL_SECS,
  COVERAGE_LAYERS,
  GLOBAL_STATS_STATIC,
  mix,
} from './data';
import type { QualityMerged, StatHeroCardData } from './data';
import { scoreGrade, StatHeroCard } from './primitives';

export function GlobalView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const isMobile = useIsMobile();
  const { t } = useLocale();
  const { grade, color: gradeColor } = scoreGrade(OVERALL);
  const totalTests = PIPELINE_STATIC.reduce((s, p) => s + (p.count ?? 0), 0);

  const quality = useMemo<QualityMerged[]>(
    () =>
      QUALITY_STATIC.map((s, i) => ({
        ...s,
        label: t.testsDashboard.qualityItems[i].label,
        desc: t.testsDashboard.qualityItems[i].desc,
        popover: t.testsDashboard.qualityItems[i].popover,
      })),
    [t]
  );

  const globalStats = useMemo<StatHeroCardData[]>(
    () =>
      GLOBAL_STATS_STATIC.map((s, i) => ({
        ...s,
        label: t.testsDashboard.globalStats[i].label,
        sub: t.testsDashboard.globalStats[i].sub,
      })),
    [t]
  );

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Stats banner */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, 1fr)`,
          gap: '0.875rem',
        }}
      >
        {globalStats.map((stat, i) => (
          <StatHeroCard key={stat.label} stat={stat} inView={inView} index={i} />
        ))}
      </div>

      {/* Main body */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '1.25rem',
        }}
      >
        {/* Quality axes */}
        <div style={CARD}>
          <p
            style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(var(--fg-rgb), 0.3)',
              marginBottom: '1.1rem',
            }}
          >
            {t.testsDashboard.qualityAxesLabel}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {quality.map((q, i) => (
              <motion.div
                key={q.label}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.07 }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '0.35rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      color: 'rgba(var(--fg-rgb), 0.7)',
                    }}
                  >
                    {q.label}
                  </span>
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 900,
                      color: q.color,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {q.score}
                    <span style={{ fontSize: '0.55rem', opacity: 0.6, marginLeft: '1px' }}>
                      /100
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    height: '5px',
                    background: 'rgba(var(--overlay-rgb), 0.08)',
                    borderRadius: '999px',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${q.score}%` } : {}}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.7, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: q.color,
                      borderRadius: '999px',
                      boxShadow: `0 0 6px ${mix(q.color, 38)}`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div
            style={{
              marginTop: '1.1rem',
              paddingTop: '0.875rem',
              borderTop: '1px solid rgba(var(--overlay-rgb), 0.07)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: mix(gradeColor, 9),
                border: `1px solid ${mix(gradeColor, 25)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: gradeColor }}>
                {grade}
              </span>
            </div>
            <span style={{ fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.4)' }}>
              {t.testsDashboard.globalGradeLabel}
            </span>
          </div>
        </div>

        {/* Pipeline overview */}
        <div style={CARD}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.1rem',
            }}
          >
            <p
              style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(var(--fg-rgb), 0.3)',
              }}
            >
              {t.testsDashboard.pipelineCiLabel}
            </p>
            <span
              style={{
                fontSize: '0.6rem',
                color: 'var(--t-organism)',
                fontWeight: 700,
                background: mix('var(--t-organism)', 8),
                border: `1px solid ${mix('var(--t-organism)', 19)}`,
                borderRadius: '999px',
                padding: '0.15rem 0.6rem',
              }}
            >
              {t.testsDashboard.pipelineGreenBadge}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {PIPELINE_STATIC.map((stage, i) => {
              const pct = ((PIPELINE_SECS[stage.label] ?? 0) / TOTAL_SECS) * 100;
              return (
                <motion.div
                  key={stage.label}
                  initial={{ opacity: 0, x: 8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: stage.color,
                      boxShadow: `0 0 5px ${stage.color}`,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      color: 'rgba(var(--fg-rgb), 0.75)',
                      flex: 1,
                    }}
                  >
                    {stage.label}
                  </span>
                  <div
                    style={{
                      width: '60px',
                      height: '3px',
                      background: 'rgba(var(--overlay-rgb), 0.08)',
                      borderRadius: '999px',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : {}}
                      transition={{ delay: 0.2 + i * 0.07, duration: 0.5 }}
                      style={{ height: '100%', background: stage.color, borderRadius: '999px' }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: '0.6rem',
                      fontFamily: 'monospace',
                      color: stage.color,
                      fontWeight: 700,
                      width: '28px',
                      textAlign: 'right',
                      flexShrink: 0,
                    }}
                  >
                    {stage.duration}
                  </span>
                </motion.div>
              );
            })}
          </div>
          <div
            style={{
              marginTop: '1rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(var(--overlay-rgb), 0.07)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.35)' }}>
              {t.testsDashboard.pipelineSummaryTemplate
                .replace('{tests}', String(totalTests))
                .replace('{total}', '31.3s')}
            </span>
            <span
              style={{
                fontSize: '0.6rem',
                color: 'rgba(var(--fg-rgb), 0.3)',
                fontFamily: 'monospace',
              }}
            >
              {t.testsDashboard.pipelineTimestamp}
            </span>
          </div>
        </div>
      </div>

      {/* Coverage full-width */}
      <div style={{ ...CARD }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          <p
            style={{
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(var(--fg-rgb), 0.3)',
            }}
          >
            {t.testsDashboard.coverageAtomicLabel}
          </p>
          <span style={{ fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.35)' }}>
            {t.testsDashboard.coverageWeakPrefix}{' '}
            <span style={{ color: '#f59e0b', fontWeight: 700 }}>
              {(() => {
                const w = [...COVERAGE_LAYERS].sort((a, b) => a.pct - b.pct)[0];
                return `${w.label} ${w.pct}%`;
              })()}
            </span>
          </span>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '0.7rem 2.5rem',
          }}
        >
          {COVERAGE_LAYERS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25 + i * 0.07 }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '0.3rem',
                }}
              >
                <span style={{ fontSize: '0.65rem', color: 'rgba(var(--fg-rgb), 0.6)' }}>
                  {c.label}
                </span>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: c.color }}>
                  {c.pct}%
                </span>
              </div>
              <div
                style={{
                  height: '4px',
                  background: 'rgba(var(--overlay-rgb), 0.07)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${c.pct}%` } : {}}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.6, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: c.color,
                    borderRadius: '999px',
                    boxShadow: c.pct < 20 ? `0 0 6px ${c.color}` : 'none',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
