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
    <section id="home" ref={sectionRef} className="hero">

      {/* Orbs */}
      <div className="hero__orbs">
        <div className="orb orb--violet" style={{ width: '700px', height: '700px', top: '-10%', right: '-10%' }} />
        <div className="orb orb--cyan"   style={{ width: '500px', height: '500px', bottom: '-10%', left: '-10%' }} />
        <div className="hero__dots" />
      </div>

      {/* Content — y/opacity are Framer Motion animated values, must stay inline */}
      <motion.div style={{ y, opacity }} className="hero__content">
        <div className="container--full">

          <div className="eyebrow eyebrow--hero a-fade-left d-0">
            <div className="eyebrow__line" />
            <span className="eyebrow__label">{info.title}</span>
          </div>

          <AnimatedText
            text="KÉVIN"
            className="block font-black"
            style={{ fontSize: 'clamp(4rem,13vw,10rem)', letterSpacing: '-0.04em', lineHeight: 0.93, marginBottom: '0.1rem', color: 'var(--fg)' }}
            delay={0.2}
          />
          <AnimatedText
            text="NGUYEN"
            gradient
            className="block font-black"
            style={{ fontSize: 'clamp(4rem,13vw,10rem)', letterSpacing: '-0.04em', lineHeight: 0.93, marginBottom: '2.5rem' }}
            delay={0.6}
          />

          <p className="hero__description a-fade-up d-8">{info.description}</p>

          <div className="hero__cta-row a-fade-up d-9">
            <Button href="#experience" variant="primary">
              {t.hero.ctaExperience}
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </Button>
            <Button href="/contact" variant="secondary">
              {t.hero.ctaContact}
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Button>
          </div>

          <div className="hero__stats-row a-fade-up d-10">
            {t.hero.stats.map((s, i) => (
              <div key={i}>
                <div className="stat__value">{s.value}</div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator a-fade d-12">
        <span className="hero__scroll-label">{t.hero.scrollLabel}</span>
        <div className="hero__scroll-line scroll-bounce" />
      </div>
    </section>
  );
}
