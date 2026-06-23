'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AnimatedText, Button } from '@/components/atoms';
import { useLocale } from '@/contexts/LocaleContext';
import type { PersonalInfo } from '@/types/portfolio.types';

interface HeroProps {
  info: PersonalInfo;
}

export function Hero({ info }: HeroProps) {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
    >
      {/* ── Orbs ─────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div className="orb orb--violet" style={{ width: '700px', height: '700px', top: '-10%', right: '-10%' }} />
        <div className="orb orb--cyan"   style={{ width: '500px', height: '500px', bottom: '-10%', left: '-10%' }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.025,
          backgroundImage: 'radial-gradient(circle, rgba(var(--fg-rgb), 0.8) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* ── Content (parallax on scroll) ── */}
      <motion.div style={{ y, opacity, position: 'relative', zIndex: 10, width: '100%', padding: '8rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: '90rem', margin: '0 auto' }}>

          <div className="a-fade-left d-0" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: 'linear-gradient(90deg,#8b5cf6,#22d3ee)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--violet-mid)' }}>
              {info.title}
            </span>
          </div>

          <AnimatedText
            text="KÉVIN"
            className="block font-black"
            style={{ fontSize: 'clamp(64px,13vw,160px)', letterSpacing: '-0.04em', lineHeight: 0.93, marginBottom: '0.1rem', color: 'var(--fg)' }}
            delay={0.2}
          />
          <AnimatedText
            text="NGUYEN"
            gradient
            className="block font-black"
            style={{ fontSize: 'clamp(64px,13vw,160px)', letterSpacing: '-0.04em', lineHeight: 0.93, marginBottom: '2.5rem' }}
            delay={0.6}
          />

          <p className="a-fade-up d-8" style={{ fontSize: '1rem', color: 'rgba(var(--fg-rgb), 0.5)', maxWidth: '38rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            {info.description}
          </p>

          <div className="a-fade-up d-9" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '5rem' }}>
            <Button href="#experience" variant="primary">
              {t.hero.ctaExperience}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </Button>
            <Button href="#contact" variant="secondary">
              {t.hero.ctaContact}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Button>
          </div>

          <div className="a-fade-up d-10" style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(var(--overlay-rgb), 0.06)' }}>
            {t.hero.stats.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--fg)' }}>{s.value}</div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(var(--fg-rgb), 0.35)', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="a-fade d-12" style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.62rem', color: 'rgba(var(--overlay-rgb), 0.22)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>{t.hero.scrollLabel}</span>
        <div className="scroll-bounce" style={{ width: '1px', height: '3.5rem', background: 'linear-gradient(to bottom,rgba(139,92,246,0.7),transparent)' }} />
      </div>
    </section>
  );
}
