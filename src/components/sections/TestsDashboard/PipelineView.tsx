'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { useLocale } from '@/contexts/LocaleContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import { CARD, PIPELINE_STATIC, PIPELINE_SECS, TOTAL_SECS, TOTAL_DURATION, mix } from './data';

export function PipelineView() {
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
          { label: statsLabels[0], value: TOTAL_DURATION, color: 'var(--t-unit)' },
          { label: statsLabels[1], value: String(totalTests), color: 'var(--t-api)' },
          { label: statsLabels[2], value: t.testsDashboard.pipelineGreenBadge, color: 'var(--t-organism)' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ ...CARD, textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color, letterSpacing: '-0.03em' }}>{value}</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(var(--fg-rgb), 0.4)', marginTop: '0.3rem' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Stages */}
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
                      background: isSelected ? mix(stage.color, 7) : 'transparent',
                      border: `1px solid ${isSelected ? mix(stage.color, 25) : 'rgba(var(--overlay-rgb), 0.07)'}`,
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
                        <div style={{ background: mix(stage.color, 7), border: `1px solid ${mix(stage.color, 25)}`, borderRadius: '0.6rem', padding: '0.65rem 0.85rem', margin: '0.2rem 0', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
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
                      style={{ flex: 1, background: isSelected ? mix(stage.color, 9) : 'var(--card-bg)', border: `1px solid ${isSelected ? mix(stage.color, 38) : 'rgba(var(--overlay-rgb), 0.09)'}`, borderRadius: '0.75rem', padding: '0.9rem 0.75rem', cursor: 'pointer', textAlign: 'center', transition: 'background 0.2s, border-color 0.2s', minWidth: '72px' }}
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
                        <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: i * 0.08 + 0.2, duration: 0.3 }} style={{ height: '1px', width: '100%', background: `linear-gradient(90deg, ${mix(pipeline[i].color, 38)}, ${mix(pipeline[i + 1].color, 38)})`, transformOrigin: 'left' }} />
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
                  <div style={{ background: mix(pipeline[selected].color, 7), border: `1px solid ${mix(pipeline[selected].color, 25)}`, borderRadius: '0.6rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: pipeline[selected].color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.72rem', color: 'rgba(var(--fg-rgb), 0.75)' }}>{pipeline[selected].detail}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Gantt durations */}
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
                      style={{ height: '100%', background: stage.color, borderRadius: '999px', boxShadow: isSlowest ? `0 0 8px ${mix(stage.color, 50)}` : 'none' }}
                    />
                  </div>
                  <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: isSlowest ? stage.color : 'rgba(var(--fg-rgb), 0.45)', fontWeight: isSlowest ? 700 : 400, width: '36px', textAlign: 'right', flexShrink: 0 }}>{pct.toFixed(0)}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div style={{ marginTop: '0.875rem', padding: '0.6rem 0.85rem', background: mix(slowest.color, 5), border: `1px solid ${mix(slowest.color, 19)}`, borderRadius: '0.5rem', fontSize: '0.62rem', color: 'rgba(var(--fg-rgb), 0.55)', lineHeight: 1.6 }}>
          <span style={{ color: slowest.color, fontWeight: 700 }}>{slowest.label}</span>{' '}
          {t.testsDashboard.pipelineSlowestTemplate}{' '}
          ({slowest.duration} · {((PIPELINE_SECS[slowest.label] ?? 0) / TOTAL_SECS * 100).toFixed(0)}% du total).
        </div>
      </div>
    </div>
  );
}
