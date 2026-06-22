import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BentoCell } from './BentoCell';

const base = {
  icon: '⚡',
  name: 'Stack',
  skills: ['React', 'TypeScript', 'Next.js'],
  index: 0,
};

describe('BentoCell', () => {
  it('affiche le nom de catégorie', () => {
    render(<BentoCell {...base} />);
    expect(screen.getByText('Stack')).toBeInTheDocument();
  });

  it('affiche tous les skills comme tags', () => {
    render(<BentoCell {...base} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it("affiche l'icône", () => {
    render(<BentoCell {...base} />);
    expect(screen.getByText('⚡')).toBeInTheDocument();
  });
});
