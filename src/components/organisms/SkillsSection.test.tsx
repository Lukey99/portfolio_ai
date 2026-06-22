import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SkillsSection } from './SkillsSection';
import type { SkillCategory } from '@/types/portfolio.types';

const SKILLS: SkillCategory[] = [
  { id: 'stack',  name: 'Stack',     icon: '⚡', skills: ['React', 'TypeScript', 'Vue'] },
  { id: 'ui',     name: 'UI/Design', icon: '🎨', skills: ['Figma', 'Tailwind'] },
  { id: 'tools',  name: 'Outils',    icon: '🛠',  skills: ['Git', 'Docker'] },
  { id: 'ide',    name: 'IDE',       icon: '💻', skills: ['VSCode'] },
];

describe('SkillsSection', () => {
  it('rend sans erreur', () => {
    render(<SkillsSection skills={SKILLS} />);
  });

  it('affiche le titre de section', () => {
    render(<SkillsSection skills={SKILLS} />);
    expect(screen.getByText('Ma Stack')).toBeInTheDocument();
  });

  it('affiche les catégories de compétences', () => {
    render(<SkillsSection skills={SKILLS} />);
    expect(screen.getByText('Stack')).toBeInTheDocument();
    expect(screen.getByText('UI/Design')).toBeInTheDocument();
  });

  it('affiche les skills individuels', () => {
    render(<SkillsSection skills={SKILLS} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('fonctionne avec une liste partielle (moins de 4 catégories)', () => {
    render(<SkillsSection skills={[SKILLS[0]]} />);
    expect(screen.getByText('Stack')).toBeInTheDocument();
  });
});
