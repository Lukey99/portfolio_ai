'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
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

  const cls = [gradient ? 'gradient-text' : '', className].filter(Boolean).join(' ');

  if (!mounted) {
    return (
      <span className={cls} style={style} aria-label={text}>
        {text}
      </span>
    );
  }

  return (
    <span className={cls} style={style} aria-label={text}>
      {text.split('').map((letter, i) => (
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
