import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MainLayout } from './MainLayout';
import type { Portfolio } from '@/types/portfolio.types';

const MOCK_DATA: Portfolio = {
  personalInfo: {
    name: 'Kévin Nguyen',
    title: 'Développeur Front End',
    description: 'Interfaces scalables et performantes.',
    phone: '07 77 69 01 82',
    email: 'kevin@example.com',
    location: 'Paris, 75',
    languages: [{ name: 'Français', level: 'Maternelle' }],
    interests: [{ name: 'Musique', description: 'Piano', icon: '🎵' }],
  },
  experiences: [
    { id: '1', company: 'Acme Corp', title: 'Dev Front', period: '2022 — 2024', type: 'full-time', description: ['Tâche A'] },
  ],
  education: [
    { id: '1', degree: 'Ingénieur Informatique', school: 'ESIEA', period: '2019 — 2022' },
  ],
  skills: [
    { id: 'stack', name: 'Stack',     icon: '⚡', skills: ['React', 'TypeScript'] },
    { id: 'ui',    name: 'UI/Design', icon: '🎨', skills: ['Figma'] },
    { id: 'tools', name: 'Outils',    icon: '🛠',  skills: ['Git'] },
    { id: 'ide',   name: 'IDE',       icon: '💻', skills: ['VSCode'] },
  ],
  projects: [
    { id: '1', title: 'Mon Portfolio', company: 'Perso', period: '2024', description: ['Next.js'], tags: ['React'] },
  ],
};

describe('MainLayout', () => {
  it('rend sans erreur', () => {
    render(<MainLayout data={MOCK_DATA} />);
  });

  it('affiche le titre du développeur dans le Hero', () => {
    render(<MainLayout data={MOCK_DATA} />);
    expect(screen.getByText(MOCK_DATA.personalInfo.title)).toBeInTheDocument();
  });

  it('affiche la section Expériences', () => {
    render(<MainLayout data={MOCK_DATA} />);
    expect(screen.getByText('Mon Parcours')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  it('affiche la section Compétences', () => {
    render(<MainLayout data={MOCK_DATA} />);
    expect(screen.getByText('Ma Stack')).toBeInTheDocument();
  });

  it('affiche la section Projets', () => {
    render(<MainLayout data={MOCK_DATA} />);
    expect(screen.getByText('Projets Entrepreneuriaux')).toBeInTheDocument();
    expect(screen.getByText('Mon Portfolio')).toBeInTheDocument();
  });

  it('affiche la section Formation', () => {
    render(<MainLayout data={MOCK_DATA} />);
    expect(screen.getByText('Mon Cursus')).toBeInTheDocument();
    expect(screen.getByText('Ingénieur Informatique')).toBeInTheDocument();
  });
});
