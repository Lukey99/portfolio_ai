'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  gradient?: boolean;
}

const letterVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      type: 'spring' as const,
      damping: 22,
      stiffness: 120,
      delay: i * 0.05,
    },
  }),
};

export function AnimatedText({ text, className, style, delay = 0, gradient = false }: AnimatedTextProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const gradientStyle: CSSProperties = gradient
    ? {
        background: 'linear-gradient(135deg, #8b5cf6 0%, #22d3ee 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }
    : {};

  const combinedStyle: CSSProperties = { ...gradientStyle, ...style };

  // Render static text before client mount to avoid blank page on SSR
  if (!mounted) {
    return (
      <span className={className} style={combinedStyle} aria-label={text}>
        {text}
      </span>
    );
  }

  const letters = text.split('');

  return (
    <span
      className={className}
      style={combinedStyle}
      aria-label={text}
    >
      {letters.map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 'inherit' }}
        >
          <motion.span
            custom={i + delay / 0.05}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'block', whiteSpace: 'pre' }}
          >
            {letter}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
