import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CardList } from './CardList';
import { ShowcaseCard } from '@/components/molecules';
import { toShowcaseCardProps } from '@/adapters/portfolio';
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

const TITLE = { number: '03', label: 'Projets', title: 'Projets Entrepreneuriaux', subtitle: 'Sous-titre' };

describe('CardList', () => {
  it('rend sans erreur', () => {
    render(<CardList title={TITLE} items={PROJECTS} renderItem={(proj, i) => <ShowcaseCard {...toShowcaseCardProps(proj)} index={i} />} />);
  });

  it('affiche le titre de section', () => {
    render(<CardList title={TITLE} items={PROJECTS} renderItem={(proj, i) => <ShowcaseCard {...toShowcaseCardProps(proj)} index={i} />} />);
    expect(screen.getByText('Projets Entrepreneuriaux')).toBeInTheDocument();
  });

  it('affiche tous les projets', () => {
    render(<CardList title={TITLE} items={PROJECTS} renderItem={(proj, i) => <ShowcaseCard {...toShowcaseCardProps(proj)} index={i} />} />);
    expect(screen.getByText('Perso')).toBeInTheDocument();
    expect(screen.getByText('Side Project')).toBeInTheDocument();
  });

  it('affiche les tags', () => {
    render(<CardList title={TITLE} items={PROJECTS} renderItem={(proj, i) => <ShowcaseCard {...toShowcaseCardProps(proj)} index={i} />} />);
    expect(screen.getAllByText('React')[0]).toBeInTheDocument();
  });

  it('expose un sectionId sur la section', () => {
    const { container } = render(<CardList sectionId="projects" title={TITLE} items={PROJECTS} renderItem={(proj, i) => <ShowcaseCard {...toShowcaseCardProps(proj)} index={i} />} />);
    expect(container.querySelector('#projects')).toBeTruthy();
  });

  it('fonctionne avec une liste vide', () => {
    render(<CardList title={TITLE} items={[]} renderItem={() => null} />);
    expect(screen.getByText('Projets Entrepreneuriaux')).toBeInTheDocument();
  });
});
