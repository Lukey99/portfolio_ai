import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Timeline } from './Timeline';
import { TimelineCard, CredentialCard } from '@/components/molecules';
import { toTimelineCardProps, toCredentialCardProps } from '@/adapters/portfolio';
import type { Experience, Education } from '@/types/portfolio.types';

const EXPS: Experience[] = [
  { id: '1', company: 'Acme Corp', title: 'Dev Front', period: '2022 — 2024', type: 'full-time', description: ['Tâche A', 'Tâche B'] },
  { id: '2', company: 'Beta Inc',  title: 'Apprenti',  period: '2020 — 2022', type: 'apprenticeship', description: ['Tâche C'] },
];

const EDU: Education[] = [
  { id: '1', degree: 'Ingénieur Informatique', school: 'ESIEA', period: '2019 — 2022' },
  { id: '2', degree: 'BTS SIO', school: 'Lycée X', period: '2017 — 2019', specialization: 'SLAM' },
];

const EXP_TITLE = { number: '01', label: 'Expériences', title: 'Mon Parcours', subtitle: 'Sous-titre' };
const EDU_TITLE = { number: '04', label: 'Formation', title: 'Mon Cursus', subtitle: 'Sous-titre' };

describe('Timeline (experiences)', () => {
  it('rend sans erreur', () => {
    render(<Timeline title={EXP_TITLE} items={EXPS} renderItem={(exp, i) => <TimelineCard {...toTimelineCardProps(exp)} index={i} />} />);
  });

  it('affiche le titre de section', () => {
    render(<Timeline title={EXP_TITLE} items={EXPS} renderItem={(exp, i) => <TimelineCard {...toTimelineCardProps(exp)} index={i} />} />);
    expect(screen.getByText('Mon Parcours')).toBeInTheDocument();
  });

  it('affiche toutes les entreprises', () => {
    render(<Timeline title={EXP_TITLE} items={EXPS} renderItem={(exp, i) => <TimelineCard {...toTimelineCardProps(exp)} index={i} />} />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Beta Inc')).toBeInTheDocument();
  });

  it('expose un sectionId sur la section', () => {
    const { container } = render(<Timeline sectionId="experience" title={EXP_TITLE} items={EXPS} renderItem={(exp, i) => <TimelineCard {...toTimelineCardProps(exp)} index={i} />} />);
    expect(container.querySelector('#experience')).toBeTruthy();
  });

  it('fonctionne avec une liste vide', () => {
    render(<Timeline title={EXP_TITLE} items={[]} renderItem={() => null} />);
    expect(screen.getByText('Mon Parcours')).toBeInTheDocument();
  });
});

describe('Timeline (education)', () => {
  it('affiche le titre de section', () => {
    render(<Timeline title={EDU_TITLE} items={EDU} renderItem={(edu, i) => <CredentialCard {...toCredentialCardProps(edu)} index={i} />} />);
    expect(screen.getByText('Mon Cursus')).toBeInTheDocument();
  });

  it('affiche les formations', () => {
    render(<Timeline title={EDU_TITLE} items={EDU} renderItem={(edu, i) => <CredentialCard {...toCredentialCardProps(edu)} index={i} />} />);
    expect(screen.getByText('Ingénieur Informatique')).toBeInTheDocument();
    expect(screen.getByText('ESIEA')).toBeInTheDocument();
  });

  it('affiche la spécialisation optionnelle', () => {
    render(<Timeline title={EDU_TITLE} items={EDU} renderItem={(edu, i) => <CredentialCard {...toCredentialCardProps(edu)} index={i} />} />);
    expect(screen.getByText('SLAM')).toBeInTheDocument();
  });
});
