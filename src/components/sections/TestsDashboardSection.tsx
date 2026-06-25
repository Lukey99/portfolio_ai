'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionTitle } from '@/components/molecules';
import { useReveal } from '@/hooks/useReveal';
import { useLocale } from '@/contexts/LocaleContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import { TABS_STATIC } from './TestsDashboard/data';
import { GlobalView }   from './TestsDashboard/GlobalView';
import { ScoreView }    from './TestsDashboard/ScoreView';
import { PipelineView } from './TestsDashboard/PipelineView';
import { CoverageView } from './TestsDashboard/CoverageView';
import { WhyView }      from './TestsDashboard/WhyView';
import type { DashTab } from './TestsDashboard/data';

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
    <section id="tests-dashboard" ref={ref} className="section">
      <div className="container--wide">
        <SectionTitle
          number={t.testsDashboard.section.number}
          label={t.testsDashboard.section.label}
          title={t.testsDashboard.section.title}
          subtitle={t.testsDashboard.section.subtitle}
        />

        {/* Tab bar */}
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
