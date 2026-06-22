import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProjectsSection } from './ProjectsSection';
import type { Project } from '@/types/portfolio.types';

const PROJECTS: Project[] = [
  {
    id: '1', title: 'Mon Portfolio', company: 'Perso', period: '2024',
    description: ['Next.js 14 + Framer Motion'], tags: ['React', 'TypeScript', 'Next.js'],
  },
  {
    id: '2', title: 'Design System', company: 'Side Project', period: '2023',
    description: ['Composants réutilisables'], tags: ['Vue', 'Storybook'],
  },
];

describe('ProjectsSection', () => {
  it('rend sans erreur', () => {
    render(<ProjectsSection projects={PROJECTS} />);
  });

  it('affiche le titre de section', () => {
    render(<ProjectsSection projects={PROJECTS} />);
    expect(screen.getByText('Projets Entrepreneuriaux')).toBeInTheDocument();
  });

  it('affiche tous les projets', () => {
    render(<ProjectsSection projects={PROJECTS} />);
    expect(screen.getByText('Mon Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Design System')).toBeInTheDocument();
  });

  it('affiche les tags', () => {
    render(<ProjectsSection projects={PROJECTS} />);
    expect(screen.getAllByText('React')[0]).toBeInTheDocument();
  });

  it('fonctionne avec une liste vide', () => {
    render(<ProjectsSection projects={[]} />);
    expect(screen.getByText('Projets Entrepreneuriaux')).toBeInTheDocument();
  });
});
