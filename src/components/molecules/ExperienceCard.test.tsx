import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ExperienceCard } from './ExperienceCard';
import type { Experience } from '@/types/portfolio.types';

const base: Experience = {
  id: '1',
  company: 'Crédit Agricole',
  title: 'Développeur Front-End',
  period: '2022 — 2024',
  type: 'full-time',
  description: ['Développement de composants React', 'Mise en place du design system'],
};

describe('ExperienceCard', () => {
  it('affiche la société, le poste et la période', () => {
    render(<ExperienceCard experience={base} index={0} />);
    expect(screen.getByText('Crédit Agricole')).toBeInTheDocument();
    expect(screen.getByText('Développeur Front-End')).toBeInTheDocument();
    expect(screen.getByText('2022 — 2024')).toBeInTheDocument();
  });

  it('affiche le badge CDI pour type full-time', () => {
    render(<ExperienceCard experience={base} index={0} />);
    expect(screen.getByText('CDI')).toBeInTheDocument();
  });

  it('affiche le badge Alternance pour type apprenticeship', () => {
    render(<ExperienceCard experience={{ ...base, type: 'apprenticeship' }} index={0} />);
    expect(screen.getByText('Alternance')).toBeInTheDocument();
  });

  it('affiche le badge Projet pour type entrepreneur', () => {
    render(<ExperienceCard experience={{ ...base, type: 'entrepreneur' }} index={0} />);
    expect(screen.getByText('Projet')).toBeInTheDocument();
  });

  it('affiche tous les points de description', () => {
    render(<ExperienceCard experience={base} index={0} />);
    expect(screen.getByText('Développement de composants React')).toBeInTheDocument();
    expect(screen.getByText('Mise en place du design system')).toBeInTheDocument();
  });
});
