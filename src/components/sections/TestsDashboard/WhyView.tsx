'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useLocale } from '@/contexts/LocaleContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import { CARD, WHY_REASONS_STATIC, WHY_TEST_TYPES_STATIC, mix } from './data';

export function WhyView() {
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
              borderTop: `2px solid ${mix(r.color, 25)}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{
                width: '2rem', height: '2rem', borderRadius: '0.5rem',
                background: mix(r.color, 9), border: `1px solid ${mix(r.color, 19)}`,
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

      {/* 6 test type angles */}
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
                    background: mix(wt.color, 4),
                    border: `1px solid ${mix(wt.color, 13)}`,
                    borderRadius: '0.75rem',
                    display: 'flex', flexDirection: 'column', gap: '0.6rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, fontFamily: 'monospace', color: wt.color, background: mix(wt.color, 9), border: `1px solid ${mix(wt.color, 21)}`, borderRadius: '4px', padding: '0.15rem 0.55rem' }}>{wt.id}</span>
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
                style={{ padding: '0.875rem', background: mix(wt.color, 4), border: `1px solid ${mix(wt.color, 13)}`, borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, fontFamily: 'monospace', color: wt.color, background: mix(wt.color, 9), border: `1px solid ${mix(wt.color, 21)}`, borderRadius: '4px', padding: '0.1rem 0.45rem' }}>{wt.id}</span>
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
