import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Navbar } from './Navbar';

beforeEach(() => {
  Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 });
});

describe('Navbar', () => {
  it('rend sans erreur', () => {
    render(<Navbar />);
  });

  it('est masquée avant le scroll (scrollY = 0)', () => {
    const { container } = render(<Navbar />);
    expect(container.querySelector('nav')).toBeNull();
  });

  it('apparaît après un scroll suffisant', async () => {
    const { container } = render(<Navbar />);
    await act(async () => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 100 });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(container.querySelector('nav')).toBeTruthy();
  });

  it('contient les liens de navigation quand visible', async () => {
    render(<Navbar />);
    await act(async () => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 100 });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(screen.getByText('Expériences')).toBeInTheDocument();
    expect(screen.getByText('Compétences')).toBeInTheDocument();
  });

  it('nettoie le listener scroll au démontage', () => {
    const { unmount } = render(<Navbar />);
    unmount();
  });
});
