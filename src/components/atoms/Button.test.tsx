import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('rend un lien <a> quand href est fourni', () => {
    render(<Button href="#contact">Me contacter</Button>);
    const link = screen.getByRole('link', { name: 'Me contacter' });
    expect(link).toHaveAttribute('href', '#contact');
  });

  it('rend un <button> quand href est absent', () => {
    render(<Button>Action</Button>);
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('applique la classe btn--primary par défaut', () => {
    render(<Button href="#">Test</Button>);
    expect(screen.getByRole('link')).toHaveClass('btn--primary');
  });

  it('applique la classe btn--secondary avec variant secondary', () => {
    render(<Button variant="secondary" href="#">Test</Button>);
    expect(screen.getByRole('link')).toHaveClass('btn--secondary');
  });

  it('ajoute rel="noopener noreferrer" sur target="_blank"', () => {
    render(<Button href="https://example.com" target="_blank">Externe</Button>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('n\'ajoute pas rel quand target n\'est pas _blank', () => {
    render(<Button href="#section">Interne</Button>);
    expect(screen.getByRole('link')).not.toHaveAttribute('rel');
  });
});
