'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { useLocale } from '@/contexts/LocaleContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import { CARD, OVERALL, QUALITY_STATIC, IMPROVEMENTS_STATIC } from './data';
import type { Priority, QualityMerged } from './data';
import { useCount, scoreGrade, ScoreRing, SubScoreCard, MobileSubScoreRow } from './primitives';

export function ScoreView() {
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
      {isMobile ? (
        <div style={{ ...CARD, padding: '1.1rem' }}>
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

      {/* Improvement axes */}
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
