import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContactSection } from './ContactSection';
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

describe('ContactSection', () => {
  it('rend sans erreur', () => {
    render(<ContactSection info={INFO} />);
  });

  it('affiche le titre "Travaillons ensemble"', () => {
    render(<ContactSection info={INFO} />);
    expect(screen.getByText('Travaillons ensemble')).toBeInTheDocument();
  });

  it('affiche l\'email', () => {
    render(<ContactSection info={INFO} />);
    expect(screen.getAllByText(INFO.email)[0]).toBeInTheDocument();
  });

  it('le lien mailto pointe vers le bon email', () => {
    render(<ContactSection info={INFO} />);
    const mailto = document.querySelector(`a[href="mailto:${INFO.email}"]`);
    expect(mailto).toBeTruthy();
  });

  it('expose un id "contact" sur la section', () => {
    const { container } = render(<ContactSection info={INFO} />);
    expect(container.querySelector('#contact')).toBeTruthy();
  });
});
