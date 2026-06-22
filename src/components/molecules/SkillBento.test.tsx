import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SkillBento } from './SkillBento';
import type { SkillCategory } from '@/types/portfolio.types';

const base: SkillCategory = {
  id: 'stack',
  name: 'Stack',
  icon: '⚡',
  skills: ['React', 'TypeScript', 'Next.js'],
};

describe('SkillBento', () => {
  it('affiche le nom de la catégorie', () => {
    render(<SkillBento category={base} index={0} />);
    expect(screen.getByText('Stack')).toBeInTheDocument();
  });

  it('affiche tous les skills comme tags', () => {
    render(<SkillBento category={base} index={0} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('affiche l\'icône', () => {
    render(<SkillBento category={base} index={0} />);
    expect(screen.getByText('⚡')).toBeInTheDocument();
  });
});
