import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProfileSection } from './ProfileSection';
import type { PersonalInfo } from '@/types/portfolio.types';

const INFO: PersonalInfo = {
  name: 'Kévin Nguyen',
  title: 'Développeur Front End',
  description: 'Dev React / Vue spécialisé UI.',
  phone: '07 77 69 01 82',
  email: 'kevin@example.com',
  location: 'Paris, 75',
  languages: [
    { name: 'Français', level: 'Maternelle' },
    { name: 'Anglais', level: 'TOEIC 925' },
  ],
  interests: [
    { name: 'Musique', description: 'Piano', icon: '🎵' },
  ],
};

describe('ProfileSection', () => {
  it('rend sans erreur', () => {
    render(<ProfileSection info={INFO} />);
  });

  it('affiche les langues', () => {
    render(<ProfileSection info={INFO} />);
    expect(screen.getByText('Français')).toBeInTheDocument();
    expect(screen.getByText('Anglais')).toBeInTheDocument();
  });

  it('affiche les centres d\'intérêt', () => {
    render(<ProfileSection info={INFO} />);
    expect(screen.getByText('Musique')).toBeInTheDocument();
  });

  it('expose un id "profile" sur la section', () => {
    const { container } = render(<ProfileSection info={INFO} />);
    expect(container.querySelector('#profile')).toBeTruthy();
  });
});
