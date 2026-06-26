import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { useReveal } from './useReveal';

describe('useReveal', () => {
  beforeEach(() => {
    // IntersectionObserver mock is already set up in setup.ts
  });

  it('retourne une ref non nulle', () => {
    const { result } = renderHook(() => useReveal());
    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull(); // pas encore attaché à un DOM node
  });

  it("ne plante pas quand la ref n'est pas attachée", () => {
    expect(() => renderHook(() => useReveal())).not.toThrow();
  });

  it('disconnect est appelé au démontage quand ref attachée', () => {
    const disconnectSpy = vi.fn();

    global.IntersectionObserver = class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = disconnectSpy;
    } as unknown as typeof IntersectionObserver;

    // Wrapper component qui attache correctement la ref
    const { unmount } = renderHook(() => {
      const ref = useReveal();
      // Simule l'attachement au DOM avant l'effet
      if (!ref.current) {
        const el = document.createElement('section');
        (ref as React.MutableRefObject<HTMLElement>).current = el;
      }
      return ref;
    });

    unmount();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
