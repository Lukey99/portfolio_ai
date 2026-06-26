'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 80, damping: 20 });
  const ringY = useSpring(dotY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    setMounted(true);
    let rafId = 0;
    const moveCursor = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        dotX.set(e.clientX);
        dotY.set(e.clientY);
      });
    };
    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(rafId);
    };
  }, [dotX, dotY]);

  if (!mounted) return null;

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'var(--gradient)',
        }}
      />
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid rgba(139,92,246,0.5)',
        }}
      />
    </>
  );
}
