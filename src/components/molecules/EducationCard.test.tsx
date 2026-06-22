import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EducationCard } from './EducationCard';
import type { Education } from '@/types/portfolio.types';

const base: Education = {
  id: 'esiea',
  degree: "Diplôme d'Ingénieur",
  school: 'ESIEA Paris',
  period: '2019 — 2022',
};

describe('EducationCard', () => {
  it('affiche le diplôme et l\'école', () => {
    render(<EducationCard education={base} index={0} />);
    expect(screen.getByText("Diplôme d'Ingénieur")).toBeInTheDocument();
    expect(screen.getByText('ESIEA Paris')).toBeInTheDocument();
  });

  it('affiche la période', () => {
    render(<EducationCard education={base} index={0} />);
    expect(screen.getByText('2019 — 2022')).toBeInTheDocument();
  });

  it('affiche la spécialisation si fournie', () => {
    const withSpec = { ...base, specialization: 'Software Engineering' };
    render(<EducationCard education={withSpec} index={0} />);
    expect(screen.getByText('Software Engineering')).toBeInTheDocument();
  });

  it('n\'affiche pas de spécialisation si absente', () => {
    render(<EducationCard education={base} index={0} />);
    expect(screen.queryByText('Software Engineering')).not.toBeInTheDocument();
  });
});
