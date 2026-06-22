import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BentoGrid } from './BentoGrid';
import { BentoCell } from '@/components/molecules';
import { toBentoCellProps } from '@/adapters/portfolio';
import type { SkillCategory } from '@/types/portfolio.types';

const SKILLS: SkillCategory[] = [
  { id: 'stack',  name: 'Stack',     icon: '⚡', skills: ['React', 'TypeScript', 'Vue'] },
  { id: 'ui',     name: 'UI/Design', icon: '🎨', skills: ['Figma', 'Tailwind'] },
  { id: 'tools',  name: 'Outils',    icon: '🛠',  skills: ['Git', 'Docker'] },
  { id: 'ide',    name: 'IDE',       icon: '💻', skills: ['VSCode'] },
];

const TITLE = { number: '02', label: 'Compétences', title: 'Ma Stack', subtitle: 'Sous-titre' };

describe('BentoGrid', () => {
  it('rend sans erreur', () => {
    const items = SKILLS.map(s => ({ data: s }));
    render(<BentoGrid title={TITLE} items={items} renderItem={(skill, i) => <BentoCell {...toBentoCellProps(skill)} index={i} />} />);
  });

  it('affiche le titre de section', () => {
    const items = SKILLS.map(s => ({ data: s }));
    render(<BentoGrid title={TITLE} items={items} renderItem={(skill, i) => <BentoCell {...toBentoCellProps(skill)} index={i} />} />);
    expect(screen.getByText('Ma Stack')).toBeInTheDocument();
  });

  it('affiche les catégories de compétences', () => {
    const items = SKILLS.map(s => ({ data: s }));
    render(<BentoGrid title={TITLE} items={items} renderItem={(skill, i) => <BentoCell {...toBentoCellProps(skill)} index={i} />} />);
    expect(screen.getByText('Stack')).toBeInTheDocument();
    expect(screen.getByText('UI/Design')).toBeInTheDocument();
  });

  it('affiche les skills individuels', () => {
    const items = SKILLS.map(s => ({ data: s }));
    render(<BentoGrid title={TITLE} items={items} renderItem={(skill, i) => <BentoCell {...toBentoCellProps(skill)} index={i} />} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('applique colSpan et rowSpan via gridColumn/gridRow', () => {
    const items = [
      { data: SKILLS[0], colSpan: 2 },
      { data: SKILLS[1], rowSpan: 2 },
    ];
    const { container } = render(<BentoGrid title={TITLE} items={items} renderItem={(skill, i) => <BentoCell {...toBentoCellProps(skill)} index={i} />} />);
    const wrappers = container.querySelectorAll<HTMLDivElement>('.bento-grid > div');
    expect(wrappers[0].style.gridColumn).toBe('span 2');
    expect(wrappers[1].style.gridRow).toBe('span 2');
  });

  it('fonctionne avec une liste vide', () => {
    render(<BentoGrid title={TITLE} items={[]} renderItem={() => null} />);
    expect(screen.getByText('Ma Stack')).toBeInTheDocument();
  });
});
