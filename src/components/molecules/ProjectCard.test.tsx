import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/types/portfolio.types';

const base: Project = {
  id: 'aerin',
  title: 'Co-Fondateur',
  company: 'Aerin Studio',
  period: '2026 — Présent',
  description: ['Développement Shopify', 'Direction artistique'],
  tags: ['Shopify', 'Front-End', 'Branding'],
};

describe('ProjectCard', () => {
  it('affiche le titre et la société', () => {
    render(<ProjectCard project={base} index={0} />);
    expect(screen.getByText('Co-Fondateur')).toBeInTheDocument();
    expect(screen.getByText('Aerin Studio')).toBeInTheDocument();
  });

  it('affiche la période', () => {
    render(<ProjectCard project={base} index={0} />);
    expect(screen.getByText('2026 — Présent')).toBeInTheDocument();
  });

  it('affiche tous les points de description', () => {
    render(<ProjectCard project={base} index={0} />);
    expect(screen.getByText('Développement Shopify')).toBeInTheDocument();
    expect(screen.getByText('Direction artistique')).toBeInTheDocument();
  });

  it('affiche tous les tags', () => {
    render(<ProjectCard project={base} index={0} />);
    expect(screen.getByText('Shopify')).toBeInTheDocument();
    expect(screen.getByText('Front-End')).toBeInTheDocument();
    expect(screen.getByText('Branding')).toBeInTheDocument();
  });
});
