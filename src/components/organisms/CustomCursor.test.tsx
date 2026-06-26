import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomCursor } from './CustomCursor';

describe('CustomCursor', () => {
  it('rend sans erreur', () => {
    render(<CustomCursor />);
  });

  it("répond aux événements mousemove sans lever d'erreur", () => {
    render(<CustomCursor />);
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 200 }));
  });

  it('retire le listener au démontage', () => {
    const spy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<CustomCursor />);
    unmount();
    expect(spy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    spy.mockRestore();
  });
});
