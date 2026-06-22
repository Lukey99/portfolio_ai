import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AnimatedText } from './AnimatedText';

describe('AnimatedText', () => {
  it('affiche le texte via aria-label (SSR/non monté)', () => {
    render(<AnimatedText text="Bonjour" />);
    expect(screen.getByLabelText('Bonjour')).toBeInTheDocument();
  });

  it('applique className', () => {
    render(<AnimatedText text="Test" className="hero-title" />);
    const el = screen.getByLabelText('Test');
    expect(el).toHaveClass('hero-title');
  });

  it('applique le style gradient si gradient=true', () => {
    render(<AnimatedText text="Gradient" gradient />);
    const el = screen.getByLabelText('Gradient');
    expect(el.getAttribute('style')).toContain('linear-gradient');
  });

  it('n\'applique pas le gradient par défaut', () => {
    render(<AnimatedText text="Normal" />);
    const el = screen.getByLabelText('Normal');
    expect(el.getAttribute('style') ?? '').not.toContain('linear-gradient');
  });
});
