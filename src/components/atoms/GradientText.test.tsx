import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GradientText } from './GradientText';

describe('GradientText', () => {
  it('affiche son contenu', () => {
    render(<GradientText>Mon texte</GradientText>);
    expect(screen.getByText('Mon texte')).toBeInTheDocument();
  });

  it('applique la classe gradient-text', () => {
    render(<GradientText>Hello</GradientText>);
    expect(screen.getByText('Hello')).toHaveClass('gradient-text');
  });

  it('accepte une className supplémentaire', () => {
    render(<GradientText className="extra">Hello</GradientText>);
    const el = screen.getByText('Hello');
    expect(el).toHaveClass('gradient-text');
    expect(el).toHaveClass('extra');
  });

  it('rend un <span>', () => {
    const { container } = render(<GradientText>Test</GradientText>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });
});
