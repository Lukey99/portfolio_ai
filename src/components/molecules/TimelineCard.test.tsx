import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TimelineCard } from './TimelineCard';

const base = {
  badge: 'CDI',
  period: '2022 — 2024',
  title: 'Crédit Agricole',
  subtitle: 'Développeur Front-End',
  items: ['Développement de composants React', 'Mise en place du design system'],
  index: 0,
};

describe('TimelineCard', () => {
  it('affiche titre, sous-titre et période', () => {
    render(<TimelineCard {...base} />);
    expect(screen.getByText('Crédit Agricole')).toBeInTheDocument();
    expect(screen.getByText('Développeur Front-End')).toBeInTheDocument();
    expect(screen.getByText('2022 — 2024')).toBeInTheDocument();
  });

  it('affiche le badge passé en prop', () => {
    render(<TimelineCard {...base} />);
    expect(screen.getByText('CDI')).toBeInTheDocument();
  });

  it('affiche un badge différent', () => {
    render(<TimelineCard {...base} badge="Alternance" />);
    expect(screen.getByText('Alternance')).toBeInTheDocument();
  });

  it('affiche tous les points de la liste', () => {
    render(<TimelineCard {...base} />);
    expect(screen.getByText('Développement de composants React')).toBeInTheDocument();
    expect(screen.getByText('Mise en place du design system')).toBeInTheDocument();
  });
});
