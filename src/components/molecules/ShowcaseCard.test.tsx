import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ShowcaseCard } from './ShowcaseCard';

const base = {
  period: '2024',
  title: 'Portfolio AI',
  subtitle: 'Portefeuille généré avec IA',
  description: ['Next.js 14 + Framer Motion', 'Pipeline CI/CD'],
  tags: ['React', 'TypeScript', 'Next.js'],
  index: 0,
};

describe('ShowcaseCard', () => {
  it('affiche titre, sous-titre et période', () => {
    render(<ShowcaseCard {...base} />);
    expect(screen.getByText('Portfolio AI')).toBeInTheDocument();
    expect(screen.getByText('Portefeuille généré avec IA')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('affiche les points de description', () => {
    render(<ShowcaseCard {...base} />);
    expect(screen.getByText('Next.js 14 + Framer Motion')).toBeInTheDocument();
    expect(screen.getByText('Pipeline CI/CD')).toBeInTheDocument();
  });

  it('affiche les tags', () => {
    render(<ShowcaseCard {...base} />);
    expect(screen.getAllByText('React')[0]).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});
