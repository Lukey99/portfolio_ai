'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { SectionTitle } from '@/components/molecules';
import { useReveal } from '@/hooks/useReveal';
import { useLocale } from '@/contexts/LocaleContext';
import { useIsMobile } from '@/hooks/useIsMobile';

// ── Static layer data (colors, component names) ───────────────

const LAYERS_STATIC = [
  {
    level: 'Atoms',
    color: '#22d3ee', bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.22)',
    components: ['Button', 'Badge', 'Tag', 'GradientText'],
  },
  {
    level: 'Molecules',
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.22)',
    components: ['SectionTitle', 'ExperienceCard', 'ProjectCard', 'EducationCard', 'ContactItem', 'SkillBento'],
  },
  {
    level: 'Organisms',
    color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.22)',
    components: ['Header', 'Hero', 'Timeline', 'BentoGrid', 'CardList', 'ContactSection', 'ApiSection', 'AIWorkflowSection', 'TestsSection', 'TestsDashboardSection', 'ArchitectureSection', 'StorybookSection', 'CustomCursor'],
  },
  {
    level: 'Templates',
    color: '#c4b5fd', bg: 'rgba(196,181,253,0.06)', border: 'rgba(196,181,253,0.18)',
    components: ['MainLayout'],
  },
  {
    level: 'Pages',
    color: 'var(--fg)', bg: 'rgba(var(--overlay-rgb), 0.04)', border: 'rgba(var(--overlay-rgb), 0.12)',
    components: ['Portfolio (/)', 'Tech (/tech)', 'Contact (/contact)'],
  },
];

const DEMO_STATIC = [
  { color: '#64748b', component: '—' },
  { color: '#f59e0b', component: 'Timeline' },
  { color: '#8b5cf6', component: 'TimelineCard' },
  { color: '#22d3ee', component: 'Badge · GradientText · text' },
];

const STATS_N = ['4', '6', '13', '3'];

// ── Sub-components ────────────────────────────────────────────

function LayerRow({ layer, index, isInView }: { layer: typeof LAYERS_STATIC[0] & { label: string; description: string }; index: number; isInView: boolean }) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '10rem 1fr', gap: isMobile ? '0.5rem' : '1.5rem', alignItems: 'flex-start' }}
    >
      <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: isMobile ? 'center' : 'flex-start', gap: '0.35rem', paddingTop: '0.25rem', flexWrap: 'wrap' }}>
        <span style={{
          display: 'inline-block', padding: '0.3rem 0.75rem', borderRadius: '9999px',
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: layer.color, background: layer.bg, border: `1px solid ${layer.border}`,
          flexShrink: 0,
        }}>
          {layer.label}
        </span>
        <span style={{ fontSize: '0.72rem', color: 'rgba(var(--fg-rgb), 0.35)', lineHeight: 1.4 }}>
          {layer.description}
        </span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: isMobile ? 0 : '0.2rem' }}>
        {layer.components.map((comp, ci) => (
          <motion.span
            key={comp}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.28 + 0.18 + ci * 0.05 }}
            style={{
              padding: '0.25rem 0.55rem', borderRadius: '0.4rem',
              fontSize: isMobile ? '0.7rem' : '0.8rem', fontWeight: 500,
              color: 'rgba(var(--fg-rgb), 0.75)', background: 'var(--card-bg)',
              border: `1px solid ${layer.border}`, fontFamily: 'monospace', letterSpacing: '-0.01em',
              maxWidth: '100%', wordBreak: 'break-all',
            }}
          >
            {comp}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function Connector({ index, isInView }: { index: number; isInView: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '4.25rem', margin: '0.5rem 0' }}>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.25, delay: index * 0.28 + 0.22, ease: 'easeOut' }}
        style={{
          width: '1px', height: '2.5rem',
          background: 'linear-gradient(to bottom, rgba(139,92,246,0.4), rgba(34,211,238,0.4))',
          transformOrigin: 'top', marginLeft: '5rem',
        }}
      />
    </div>
  );
}

type ExplodeStep = 0 | 1 | 2 | 3;

function LevelBorder({ color, label, visible, children }: { color: string; label: string; visible: boolean; children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence>
        {visible && (
          <motion.div
            key="level-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ position: 'absolute', inset: '-14px', borderRadius: '1.1rem', border: `1.5px solid ${color}`, background: `${color}0C`, pointerEvents: 'none', zIndex: 0 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.12 }}
              style={{ position: 'absolute', top: '-11px', left: '14px', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color, fontFamily: 'monospace', background: 'var(--bg)', padding: '0 8px', whiteSpace: 'nowrap' }}
            >
              {label}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

function ExperienceSkeletonCard() {
  return (
    <div className="glass-card" style={{ padding: '0.75rem 0.9rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.15),rgba(34,211,238,0.15),transparent)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
        <div style={{ width: '28px', height: '13px', borderRadius: '9999px', background: 'rgba(var(--overlay-rgb), 0.07)' }} />
        <div style={{ width: '72px', height: '5px', borderRadius: '3px', background: 'rgba(var(--overlay-rgb), 0.05)' }} />
      </div>
      <div style={{ width: '62%', height: '7px', borderRadius: '3px', background: 'rgba(var(--overlay-rgb), 0.08)', marginBottom: '0.22rem' }} />
      <div style={{ width: '80%', height: '5px', borderRadius: '3px', background: 'rgba(var(--overlay-rgb), 0.06)' }} />
    </div>
  );
}

function MiniExperienceCard() {
  return (
    <div className="glass-card" style={{ padding: '0.75rem 0.9rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,#8b5cf6,#22d3ee,transparent)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
        <span style={{ display: 'inline-block', padding: '0.1rem 0.45rem', borderRadius: '9999px', fontSize: '0.58rem', fontWeight: 700, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa' }}>CDI</span>
        <span style={{ fontSize: '0.55rem', color: 'rgba(var(--fg-rgb), 0.35)', fontFamily: 'monospace' }}>2023 — Ajd</span>
      </div>
      <p className="gradient-text" style={{ fontSize: '0.82rem', fontWeight: 800, marginBottom: '0.12rem' }}>Acme Corp</p>
      <p style={{ fontSize: '0.67rem', color: 'rgba(var(--fg-rgb), 0.6)', fontWeight: 500 }}>Développeur Front-End Sr</p>
    </div>
  );
}

function DemoExperienceCard() {
  return (
    <div className="glass-card" style={{ padding: '1.75rem 2rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,#8b5cf6,#22d3ee,transparent)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.22rem 0.75rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700, background: 'rgba(139,92,246,0.14)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa' }}>CDI</span>
        <p style={{ fontSize: '0.75rem', color: 'rgba(var(--fg-rgb), 0.38)', fontFamily: 'monospace' }}>Jan. 2023 — Aujourd'hui</p>
      </div>
      <h3 className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.2rem' }}>Acme Corp</h3>
      <p style={{ color: 'rgba(var(--fg-rgb), 0.68)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.1rem' }}>Développeur Front-End Senior</p>
      <div style={{ height: '1px', background: 'rgba(var(--overlay-rgb), 0.05)', marginBottom: '1.1rem' }} />
      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.84rem', color: 'rgba(var(--fg-rgb), 0.52)', lineHeight: 1.6, listStyle: 'none', marginBottom: '0.55rem' }}>
        <span style={{ marginTop: '0.52em', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(34,211,238,0.65)', flexShrink: 0 }} />
        Mise en place d'un design system React partagé entre 4 équipes.
      </li>
      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.84rem', color: 'rgba(var(--fg-rgb), 0.52)', lineHeight: 1.6, listStyle: 'none' }}>
        <span style={{ marginTop: '0.52em', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(34,211,238,0.65)', flexShrink: 0 }} />
        Refonte de l'interface admin (−40% temps de chargement).
      </li>
    </div>
  );
}

function PageThumbnail() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.7rem', background: 'rgba(var(--overlay-rgb), 0.04)', borderRadius: '0.5rem', border: '1px solid rgba(var(--overlay-rgb), 0.06)' }}>
        <div style={{ width: '40px', height: '5px', borderRadius: '3px', background: 'linear-gradient(90deg,#8b5cf6,#22d3ee)' }} />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[28, 22, 26, 20].map((w, i) => (
            <div key={i} style={{ width: `${w}px`, height: '4px', borderRadius: '2px', background: 'rgba(var(--overlay-rgb), 0.1)' }} />
          ))}
        </div>
      </div>
      <div style={{ padding: '0.9rem 0.7rem', background: 'rgba(var(--overlay-rgb), 0.03)', borderRadius: '0.5rem', border: '1px solid rgba(var(--overlay-rgb), 0.05)' }}>
        <div style={{ width: '55%', height: '8px', borderRadius: '4px', background: 'linear-gradient(90deg,rgba(139,92,246,0.3),rgba(34,211,238,0.2))', marginBottom: '0.35rem' }} />
        <div style={{ width: '75%', height: '5px', borderRadius: '3px', background: 'rgba(var(--overlay-rgb), 0.07)', marginBottom: '0.22rem' }} />
        <div style={{ width: '60%', height: '5px', borderRadius: '3px', background: 'rgba(var(--overlay-rgb), 0.05)', marginBottom: '0.55rem' }} />
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <div style={{ width: '50px', height: '13px', borderRadius: '9999px', background: 'rgba(139,92,246,0.18)', border: '1px solid rgba(139,92,246,0.25)' }} />
          <div style={{ width: '44px', height: '13px', borderRadius: '9999px', background: 'rgba(var(--overlay-rgb), 0.06)', border: '1px solid rgba(var(--overlay-rgb), 0.09)' }} />
        </div>
      </div>
      <div style={{ padding: '0.7rem 0.7rem', background: 'rgba(var(--overlay-rgb), 0.03)', borderRadius: '0.5rem', border: '1px solid rgba(var(--overlay-rgb), 0.05)' }}>
        <div style={{ width: '35%', height: '5px', borderRadius: '3px', background: 'rgba(var(--overlay-rgb), 0.08)', marginBottom: '0.45rem' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.28rem' }}>
          <MiniExperienceCard />
          <div style={{ opacity: 0.45 }}><ExperienceSkeletonCard /></div>
        </div>
      </div>
      <div style={{ padding: '0.55rem 0.7rem', background: 'rgba(var(--overlay-rgb), 0.02)', borderRadius: '0.5rem', border: '1px solid rgba(var(--overlay-rgb), 0.04)' }}>
        <div style={{ display: 'flex', gap: '0.28rem', flexWrap: 'wrap' }}>
          {[38, 30, 44, 34, 28].map((w, i) => (
            <div key={i} style={{ width: `${w}px`, height: '8px', borderRadius: '9999px', background: 'rgba(var(--overlay-rgb), 0.06)' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionView() {
  return (
    <div style={{ position: 'relative', padding: '1.2rem', border: '1.5px solid #f59e0b', borderRadius: '1rem', background: '#f59e0b08' }}>
      <span style={{ position: 'absolute', top: '-10px', left: '14px', fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#f59e0b', fontFamily: 'monospace', background: 'var(--card-bg)', padding: '0 7px', whiteSpace: 'nowrap' }}>
        Organism · Timeline
      </span>
      <div style={{ marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
          <div style={{ width: '1rem', height: '1px', background: 'linear-gradient(90deg,#8b5cf6,#22d3ee)' }} />
          <span style={{ fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#a78bfa' }}>02 — Expériences</span>
        </div>
        <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.02em' }}>Mon parcours</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        <MiniExperienceCard />
        <div style={{ opacity: 0.5 }}><ExperienceSkeletonCard /></div>
        <div style={{ opacity: 0.3 }}><ExperienceSkeletonCard /></div>
      </div>
    </div>
  );
}

function AtomBreakdownView() {
  const CYAN = '#22d3ee';
  const atoms = [
    { label: 'Atom · Badge', delay: 0, content: (
      <span style={{ display: 'inline-flex', padding: '0.18rem 0.65rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700, background: 'rgba(139,92,246,0.14)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa' }}>CDI</span>
    )},
    { label: 'Atom · GradientText', delay: 0.07, content: (
      <span className="gradient-text" style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Acme Corp</span>
    )},
    { label: 'Atom · text', delay: 0.14, content: (
      <p style={{ fontSize: '0.72rem', color: 'rgba(var(--fg-rgb), 0.65)', fontWeight: 600 }}>Développeur Front-End Senior</p>
    )},
    { label: 'Atom · text', delay: 0.21, content: (
      <p style={{ fontSize: '0.65rem', color: 'rgba(var(--fg-rgb), 0.38)', fontFamily: 'monospace' }}>Jan. 2023 — Aujourd'hui</p>
    )},
    { label: 'Atom · text', delay: 0.28, content: (
      <p style={{ fontSize: '0.7rem', color: 'rgba(var(--fg-rgb), 0.45)', lineHeight: 1.5 }}>Design system React partagé entre 4 équipes.</p>
    )},
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%' }}>
      {atoms.map((atom, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: atom.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: 'relative', padding: '0.55rem 0.7rem', borderRadius: '0.5rem', border: `1px dashed ${CYAN}`, background: `${CYAN}08` }}
        >
          <span style={{ position: 'absolute', top: '-9px', left: '8px', fontSize: '0.48rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: CYAN, fontFamily: 'monospace', background: 'var(--card-bg)', padding: '0 5px', whiteSpace: 'nowrap' }}>
            {atom.label}
          </span>
          {atom.content}
        </motion.div>
      ))}
    </div>
  );
}

const zoomVariants = {
  enter: (dir: number) => ({ scale: dir > 0 ? 0.82 : 1.16, opacity: 0, filter: 'blur(6px)' }),
  center: { scale: 1, opacity: 1, filter: 'blur(0px)' },
  exit: (dir: number) => ({ scale: dir > 0 ? 1.16 : 0.82, opacity: 0, filter: 'blur(6px)' }),
};
const zoomTransitionIn  = { duration: 0.42, ease: 'easeOut' as const };

function ExplodeDemo({ demoLabel, steps }: { demoLabel: string; steps: { label: string; desc: string }[] }) {
  const [step, setStep] = useState<ExplodeStep>(0);
  const [dir, setDir]   = useState<1 | -1>(1);
  const isMobile        = useIsMobile();
  const current         = { ...DEMO_STATIC[step], ...steps[step] };

  function goTo(i: ExplodeStep) {
    setDir(i > step ? 1 : -1);
    setStep(i);
  }

  return (
    <div className="arch-demo" style={{ marginTop: '4rem' }}>
      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <div style={{ height: '1px', flex: 1, background: 'rgba(var(--overlay-rgb), 0.08)' }} />
        <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.28)', padding: '0.3rem 1.1rem', border: '1px solid rgba(var(--overlay-rgb), 0.09)', borderRadius: '9999px', background: 'var(--card-bg)', whiteSpace: 'nowrap' }}>
          {demoLabel}
        </span>
        <div style={{ height: '1px', flex: 1, background: 'rgba(var(--overlay-rgb), 0.08)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', background: 'var(--card-bg)', borderRadius: '1.5rem', border: '1px solid rgba(var(--overlay-rgb), 0.07)', marginBottom: '2.5rem', overflow: 'hidden', minHeight: isMobile ? 'auto' : '480px' }}>

        {/* LEFT — zoom view */}
        <div style={{ padding: isMobile ? '1.5rem 1rem' : '2.5rem 2rem', borderRight: isMobile ? 'none' : '1px solid rgba(var(--overlay-rgb), 0.07)', borderBottom: isMobile ? '1px solid rgba(var(--overlay-rgb), 0.07)' : 'none', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <AnimatePresence mode="wait" custom={dir}>
            {step === 0 && (
              <motion.div key={0} custom={dir} variants={zoomVariants} initial="enter" animate="center" exit="exit" transition={zoomTransitionIn} style={{ width: '100%' }}>
                <PageThumbnail />
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key={1} custom={dir} variants={zoomVariants} initial="enter" animate="center" exit="exit" transition={zoomTransitionIn} style={{ width: '100%' }}>
                <SectionView />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key={2} custom={dir} variants={zoomVariants} initial="enter" animate="center" exit="exit" transition={zoomTransitionIn} style={{ width: '100%' }}>
                <LevelBorder color="#8b5cf6" label="Molecule · ExperienceCard" visible={true}>
                  <DemoExperienceCard />
                </LevelBorder>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key={3} custom={dir} variants={zoomVariants} initial="enter" animate="center" exit="exit" transition={zoomTransitionIn} style={{ width: '100%' }}>
                <AtomBreakdownView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT — info + stepper */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: isMobile ? '1.25rem 1.25rem 1rem' : '3.5rem 2.5rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
                <span style={{ fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.25)', fontFamily: 'monospace' }}>
                  {String(step + 1).padStart(2, '0')} / {steps.length}
                </span>
                <h4 style={{ fontSize: isMobile ? '1.4rem' : '2rem', fontWeight: 800, color: current.color, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: '0.5rem', marginBottom: '0.3rem' }}>
                  {current.label}
                </h4>
                {current.component !== '—' && (
                  <p style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: 'rgba(var(--fg-rgb), 0.32)', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
                    {current.component}
                  </p>
                )}
                <p style={{ fontSize: isMobile ? '0.8rem' : '0.87rem', color: 'rgba(var(--fg-rgb), 0.5)', lineHeight: 1.65, marginTop: current.component === '—' ? '1.25rem' : 0 }}>
                  {current.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ height: '1px', background: 'rgba(var(--overlay-rgb), 0.07)', margin: isMobile ? '0 1.25rem' : '0 2rem' }} />

          <div style={{ padding: isMobile ? '0.85rem 1.25rem 1.25rem' : '1.25rem 2rem 1.75rem' }}>
            {isMobile ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                {steps.map((s, i) => {
                  const color = DEMO_STATIC[i].color;
                  return (
                    <motion.button
                      key={i}
                      onClick={() => goTo(i as ExplodeStep)}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        borderColor: i <= step ? color : 'rgba(148,163,184,0.18)',
                        backgroundColor: i === step ? `${color}20` : i < step ? `${color}0C` : 'rgba(0,0,0,0)',
                        color: i <= step ? color : 'rgba(148,163,184,0.45)',
                      }}
                      transition={{ duration: 0.25 }}
                      style={{ padding: '0.45rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.62rem', fontWeight: i <= step ? 700 : 400, fontFamily: 'monospace', letterSpacing: '0.03em', cursor: 'pointer', border: '1.5px solid', textAlign: 'center' as const }}
                    >
                      {s.label}
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                {steps.map((s, i) => {
                  const color = DEMO_STATIC[i].color;
                  return (
                    <div key={i} style={{ display: 'contents' }}>
                      <motion.button
                        onClick={() => goTo(i as ExplodeStep)}
                        whileHover={{ scale: 1.06, backgroundColor: `${color}28` }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          borderColor: i <= step ? color : 'rgba(148,163,184,0.18)',
                          backgroundColor: i === step ? `${color}20` : i < step ? `${color}0C` : 'rgba(0,0,0,0)',
                          color: i <= step ? color : 'rgba(148,163,184,0.45)',
                        }}
                        transition={{ duration: 0.25 }}
                        style={{ padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: i <= step ? 700 : 400, fontFamily: 'monospace', letterSpacing: '0.05em', cursor: 'pointer', border: '1.5px solid', whiteSpace: 'nowrap', flexShrink: 0 }}
                      >
                        {s.label}
                      </motion.button>
                      {i < 3 && (
                        <div style={{ flex: 1, minWidth: '0.5rem', height: '2px', position: 'relative', background: 'rgba(var(--overlay-rgb), 0.1)' }}>
                          <motion.div
                            animate={{ scaleX: step > i ? 1 : 0 }}
                            initial={{ scaleX: 0 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                            style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${color}, ${DEMO_STATIC[i + 1].color})`, transformOrigin: 'left' }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────

export function ArchitectureSection() {
  const ref       = useReveal();
  const { t }     = useLocale();
  const isInView  = useInView(ref, { once: true, margin: '-10% 0px' });
  const { section, layers, stats, demoLabel, demoSteps } = t.architecture;

  const mergedLayers = LAYERS_STATIC.map((l, i) => ({ ...l, label: layers[i].label, description: layers[i].description }));

  return (
    <section ref={ref} style={{ padding: 'clamp(3rem,8vw,7rem) 1.5rem', backgroundColor: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '30%', right: '-10%', width: '500px', height: '400px', background: 'radial-gradient(ellipse at center, rgba(34,211,238,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '72rem', margin: '0 auto', position: 'relative' }}>
        <SectionTitle
          number={section.number}
          label={section.label}
          title={section.title}
          subtitle={section.subtitle}
        />

        {/* Layer tree */}
        <div>
          {mergedLayers.map((layer, i) => (
            <div key={layer.level}>
              <LayerRow layer={layer} index={i} isInView={isInView} />
              {i < mergedLayers.length - 1 && <Connector index={i} isInView={isInView} />}
            </div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: LAYERS_STATIC.length * 0.28 + 0.2 }}
          style={{ marginTop: '3rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '1.5rem 2rem', borderRadius: '1rem', background: 'var(--card-bg)', border: '1px solid rgba(var(--overlay-rgb), 0.07)' }}
        >
          {STATS_N.map((n, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(135deg,#8b5cf6,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n}</span>
              <span style={{ fontSize: '0.78rem', color: 'rgba(var(--fg-rgb), 0.4)' }}>{stats[i].label}</span>
            </div>
          ))}
        </motion.div>

        <ExplodeDemo demoLabel={demoLabel} steps={demoSteps} />
      </div>
    </section>
  );
}
