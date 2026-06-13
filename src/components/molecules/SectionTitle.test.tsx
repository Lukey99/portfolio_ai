import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionTitle } from './SectionTitle';

describe('SectionTitle', () => {
  it('affiche le numéro watermark', () => {
    render(<SectionTitle number="03" label="IA" title="Mon titre" />);
    expect(screen.getByText('03')).toBeInTheDocument();
  });

  it('affiche le label avec le numéro', () => {
    render(<SectionTitle number="03" label="IA & Workflow" title="Mon titre" />);
    expect(screen.getByText('03 — IA & Workflow')).toBeInTheDocument();
  });

  it('affiche le titre en h2', () => {
    render(<SectionTitle number="01" label="Expériences" title="Mon Parcours" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Mon Parcours' })).toBeInTheDocument();
  });

  it('affiche le subtitle quand fourni', () => {
    render(<SectionTitle number="01" label="Tests" title="Titre" subtitle="Description de la section" />);
    expect(screen.getByText('Description de la section')).toBeInTheDocument();
  });

  it('n\'affiche pas de subtitle quand non fourni', () => {
    render(<SectionTitle number="01" label="Tests" title="Titre" />);
    expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
  });
});
