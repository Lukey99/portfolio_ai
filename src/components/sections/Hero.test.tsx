import { vi } from 'vitest';

vi.mock('@/contexts/LocaleContext', async () => {
  const { fr } = await import('@/lib/i18n/fr');
  return { useLocale: () => ({ locale: 'fr' as const, t: fr, setLocale: () => {} }) };
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from './Hero';
import type { PersonalInfo } from '@/types/portfolio.types';

const INFO: PersonalInfo = {
  name: 'Kévin Nguyen',
  title: 'Développeur Front End',
  description: 'Interfaces scalables et performantes.',
  phone: '07 77 69 01 82',
  email: 'kevin@example.com',
  location: 'Paris, 75',
  languages: [{ name: 'Français', level: 'Maternelle' }],
  interests: [{ name: 'Musique', description: 'Piano', icon: '🎵' }],
};

describe('Hero', () => {
  it('rend sans erreur', () => {
    render(<Hero info={INFO} />);
  });

  it('affiche le titre du développeur', () => {
    render(<Hero info={INFO} />);
    expect(screen.getByText(INFO.title)).toBeInTheDocument();
  });

  it('affiche la description', () => {
    render(<Hero info={INFO} />);
    expect(screen.getByText(INFO.description)).toBeInTheDocument();
  });

  it('affiche le CTA "Voir mon parcours"', () => {
    render(<Hero info={INFO} />);
    expect(screen.getByText('Voir mon parcours')).toBeInTheDocument();
  });

  it('affiche le CTA "Me contacter"', () => {
    render(<Hero info={INFO} />);
    expect(screen.getAllByText('Me contacter')[0]).toBeInTheDocument();
  });

  it('affiche les statistiques clés', () => {
    render(<Hero info={INFO} />);
    expect(screen.getByText('3+')).toBeInTheDocument();
    expect(screen.getByText('925')).toBeInTheDocument();
  });

  it('expose un id "home" sur la section', () => {
    const { container } = render(<Hero info={INFO} />);
    expect(container.querySelector('#home')).toBeTruthy();
  });
});
