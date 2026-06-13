import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('affiche son contenu', () => {
    render(<Badge>CDI</Badge>);
    expect(screen.getByText('CDI')).toBeInTheDocument();
  });

  it('utilise la variante dim par défaut', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText('Default')).toHaveClass('badge--dim');
  });

  it('applique badge--accent avec variant accent', () => {
    render(<Badge variant="accent">Alternance</Badge>);
    expect(screen.getByText('Alternance')).toHaveClass('badge--accent');
  });

  it('applique badge--cyan avec variant cyan', () => {
    render(<Badge variant="cyan">Projet</Badge>);
    expect(screen.getByText('Projet')).toHaveClass('badge--cyan');
  });
});
