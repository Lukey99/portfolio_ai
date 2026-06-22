import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CredentialCard } from './CredentialCard';

const base = {
  period: '2019 — 2022',
  institution: 'ESIEA',
  title: 'Ingénieur Informatique',
  index: 0,
};

describe('CredentialCard', () => {
  it('affiche institution, titre et période', () => {
    render(<CredentialCard {...base} />);
    expect(screen.getByText('ESIEA')).toBeInTheDocument();
    expect(screen.getByText('Ingénieur Informatique')).toBeInTheDocument();
    expect(screen.getByText('2019 — 2022')).toBeInTheDocument();
  });

  it('affiche le détail optionnel quand fourni', () => {
    render(<CredentialCard {...base} detail="Spécialisation IA" />);
    expect(screen.getByText('Spécialisation IA')).toBeInTheDocument();
  });

  it("n'affiche pas de détail quand absent", () => {
    const { container } = render(<CredentialCard {...base} />);
    expect(container.querySelectorAll('p').length).toBeLessThan(4);
  });
});
