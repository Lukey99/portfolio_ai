'use client';

import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { CARD, mix } from './data';
import type { QualityMerged, StatHeroCardData } from './data';

export type { QualityMerged, StatHeroCardData };

// ── useCount ──────────────────────────────────────────────────

export function useCount(target: number, active: boolean, duration = 1000) {
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

// ── scoreGrade ────────────────────────────────────────────────

export function scoreGrade(s: number) {
  if (s >= 90) return { grade: 'A', color: 'var(--t-organism)' };
  if (s >= 80) return { grade: 'B', color: 'var(--t-unit)' };
  if (s >= 70) return { grade: 'C', color: 'var(--t-a11y)' };
  return { grade: 'D', color: 'var(--t-perf)' };
}

// ── ScoreRing ─────────────────────────────────────────────────

export function ScoreRing({
  score,
  color,
  size = 120,
  stroke = 10,
}: {
  score: number;
  color: string;
  size?: number;
  stroke?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  const R = (size - stroke * 2) / 2;
  const C = 2 * Math.PI * R;
  const cx = size / 2;
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}
    >
      <circle
        cx={cx}
        cy={cx}
        r={R}
        fill="none"
        stroke="rgba(var(--overlay-rgb), 0.1)"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={cx}
        cy={cx}
        r={R}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={C}
        initial={{ strokeDashoffset: C }}
        animate={inView ? { strokeDashoffset: C * (1 - score / 100) } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </svg>
  );
}

// ── CoverageBar ───────────────────────────────────────────────

export function CoverageBar({
  label,
  pct,
  color,
  delay,
}: {
  label: string;
  pct: number;
  color: string;
  delay: number;
}) {
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
      <span
        style={{
          fontSize: 'var(--text-xs)',
          color: hovered ? color : 'rgba(var(--fg-rgb), 0.55)',
          fontFamily: 'monospace',
          width: '72px',
          flexShrink: 0,
          transition: 'color 0.2s',
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: hovered ? '9px' : '7px',
          borderRadius: '9999px',
          background: 'rgba(var(--overlay-rgb), 0.08)',
          overflow: 'hidden',
          transition: 'height 0.2s ease',
        }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            height: '100%',
            borderRadius: '9999px',
            background: color,
            width: `${pct}%`,
            transformOrigin: 'left',
          }}
        />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.6 }}
        style={{
          fontSize: hovered ? '0.82rem' : '0.72rem',
          fontWeight: 800,
          color,
          fontFamily: 'monospace',
          width: '40px',
          textAlign: 'right',
          transition: 'font-size 0.15s',
        }}
      >
        {pct}%
      </motion.span>
    </motion.div>
  );
}

// ── SubScoreCard ──────────────────────────────────────────────

export function SubScoreCard({
  q,
  parentInView,
  index,
}: {
  q: QualityMerged;
  parentInView: boolean;
  index: number;
}) {
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
        border: `1px solid ${hovered ? mix(q.color, 31) : 'rgba(var(--overlay-rgb), 0.09)'}`,
        borderRadius: '0.75rem',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        cursor: 'help',
        transition: 'border-color 0.2s',
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <ScoreRing score={q.score} color={q.color} size={52} stroke={5} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '0.7rem', fontWeight: 900, color: q.color }}>{count}</span>
        </div>
      </div>
      <div>
        <div
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--fg)',
            marginBottom: '0.2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          {q.label}
          <span
            style={{
              fontSize: '0.52rem',
              color: 'rgba(var(--fg-rgb), 0.4)',
              border: '1px solid rgba(var(--overlay-rgb), 0.18)',
              borderRadius: '50%',
              width: '13px',
              height: '13px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            ?
          </span>
        </div>
        <div style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.4)', lineHeight: 1.4 }}>
          {q.desc}
        </div>
      </div>
      <AnimatePresence>
        {hovered &&
          createPortal(
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
                border: `1px solid ${mix(q.color, 21)}`,
                borderRadius: '0.85rem',
                padding: '1rem 1.1rem',
                boxShadow: `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px ${mix(q.color, 8)}`,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(45deg)',
                  width: '10px',
                  height: '10px',
                  background: 'var(--menu-bg)',
                  borderRight: `1px solid ${mix(q.color, 21)}`,
                  borderBottom: `1px solid ${mix(q.color, 21)}`,
                }}
              />
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 800,
                  color: q.color,
                  marginBottom: '0.45rem',
                }}
              >
                {q.popover.title}
              </div>
              <div
                style={{
                  fontSize: '0.63rem',
                  color: 'rgba(var(--fg-rgb), 0.6)',
                  lineHeight: 1.55,
                  marginBottom: '0.6rem',
                }}
              >
                {q.popover.body}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.28rem' }}>
                {q.popover.items.map(item => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      gap: '0.4rem',
                      fontSize: '0.62rem',
                      color: 'rgba(var(--fg-rgb), 0.5)',
                    }}
                  >
                    <span style={{ color: q.color, flexShrink: 0 }}>›</span>
                    <span>{item}</span>
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

// ── StatHeroCard ──────────────────────────────────────────────

export function StatHeroCard({
  stat,
  inView,
  index,
}: {
  stat: StatHeroCardData;
  inView: boolean;
  index: number;
}) {
  const count = useCount(stat.value, inView, 900 + index * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      style={{
        ...CARD,
        padding: '1.1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
      }}
    >
      <div
        style={{
          fontSize: '0.58rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(var(--fg-rgb), 0.3)',
        }}
      >
        {stat.label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
        <span
          style={{
            fontSize: '2rem',
            fontWeight: 900,
            color: stat.color,
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          {count}
        </span>
        {stat.suffix && (
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: stat.color, opacity: 0.7 }}>
            {stat.suffix}
          </span>
        )}
      </div>
      <div style={{ fontSize: '0.6rem', color: 'rgba(var(--fg-rgb), 0.35)' }}>{stat.sub}</div>
      <div
        style={{
          marginTop: '0.5rem',
          height: '2px',
          background: `linear-gradient(90deg, ${mix(stat.color, 38)}, ${mix(stat.color, 6)})`,
          borderRadius: '999px',
        }}
      />
    </motion.div>
  );
}

// ── MobileSubScoreRow ─────────────────────────────────────────

export function MobileSubScoreRow({
  q,
  inView,
  index,
}: {
  q: QualityMerged;
  inView: boolean;
  index: number;
}) {
  const count = useCount(q.score, inView, 900 + index * 100);
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.07 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.6rem 0',
        borderBottom: index < 3 ? '1px solid rgba(var(--overlay-rgb), 0.05)' : 'none',
      }}
    >
      <span style={{ fontSize: 'var(--text-xs)', color: 'rgba(var(--fg-rgb), 0.7)', flex: 1 }}>
        {q.label}
      </span>
      <div
        style={{
          width: '52px',
          height: '4px',
          background: 'rgba(var(--overlay-rgb), 0.1)',
          borderRadius: '999px',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${q.score}%` } : {}}
          transition={{ delay: 0.25 + index * 0.07, duration: 0.7, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: q.color,
            borderRadius: '999px',
            boxShadow: `0 0 4px ${mix(q.color, 38)}`,
          }}
        />
      </div>
      <span
        style={{
          fontSize: 'var(--text-sm)',
          fontWeight: 800,
          color: q.color,
          fontFamily: 'monospace',
          width: '28px',
          textAlign: 'right',
          flexShrink: 0,
        }}
      >
        {count}
      </span>
    </motion.div>
  );
}
