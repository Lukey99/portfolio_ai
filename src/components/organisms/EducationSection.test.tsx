import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EducationSection } from './EducationSection';
import type { Education } from '@/types/portfolio.types';

const EDU: Education[] = [
  { id: '1', degree: 'Ingénieur Informatique', school: 'ESIEA', period: '2019 — 2022' },
  { id: '2', degree: 'BTS SIO',               school: 'Lycée X', period: '2017 — 2019', specialization: 'SLAM' },
];

describe('EducationSection', () => {
  it('rend sans erreur', () => {
    render(<EducationSection education={EDU} />);
  });

  it('affiche le titre de section', () => {
    render(<EducationSection education={EDU} />);
    expect(screen.getByText('Mon Cursus')).toBeInTheDocument();
  });

  it('affiche les formations', () => {
    render(<EducationSection education={EDU} />);
    expect(screen.getByText('Ingénieur Informatique')).toBeInTheDocument();
    expect(screen.getByText('ESIEA')).toBeInTheDocument();
  });

  it('affiche la spécialisation optionnelle', () => {
    render(<EducationSection education={EDU} />);
    expect(screen.getByText('SLAM')).toBeInTheDocument();
  });

  it('expose un id "education" sur la section', () => {
    const { container } = render(<EducationSection education={EDU} />);
    expect(container.querySelector('#education')).toBeTruthy();
  });
});
