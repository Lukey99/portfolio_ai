'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useLocale } from '@/contexts/LocaleContext';
import { COMPONENTS, TEST_COLS, MATRIX, COL_COLORS, LAYER_COLORS } from './data';
import type { TestCol } from './data';

export function MatrixBlock() {
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
