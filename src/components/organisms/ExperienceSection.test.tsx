import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ExperienceSection } from './ExperienceSection';
import type { Experience } from '@/types/portfolio.types';

const EXPS: Experience[] = [
  { id: '1', company: 'Acme Corp', title: 'Dev Front', period: '2022 — 2024', type: 'full-time', description: ['Tâche A', 'Tâche B'] },
  { id: '2', company: 'Beta Inc',  title: 'Apprenti',   period: '2020 — 2022', type: 'apprenticeship', description: ['Tâche C'] },
];

describe('ExperienceSection', () => {
  it('rend sans erreur', () => {
    render(<ExperienceSection experiences={EXPS} />);
  });

  it('affiche le titre de section', () => {
    render(<ExperienceSection experiences={EXPS} />);
    expect(screen.getByText('Mon Parcours')).toBeInTheDocument();
  });

  it('affiche toutes les entreprises', () => {
    render(<ExperienceSection experiences={EXPS} />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Beta Inc')).toBeInTheDocument();
  });

  it('expose un id "experience" sur la section', () => {
    const { container } = render(<ExperienceSection experiences={EXPS} />);
    expect(container.querySelector('#experience')).toBeTruthy();
  });

  it('fonctionne avec une liste vide', () => {
    render(<ExperienceSection experiences={[]} />);
    expect(screen.getByText('Mon Parcours')).toBeInTheDocument();
  });
});
