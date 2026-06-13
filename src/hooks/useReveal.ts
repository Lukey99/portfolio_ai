'use client';

import { useEffect, useRef } from 'react';

/**
 * Attach this ref to a section container.
 * Every child with class "reveal" gets "is-visible" added once it enters
 * the viewport, triggering the CSS transition defined in animations.scss.
 */
export function useReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>('.reveal, .timeline__fill');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '-60px 0px 0px 0px', threshold: 0.05 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}
