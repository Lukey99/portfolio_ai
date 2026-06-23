import { vi } from 'vitest';

vi.mock('@/components/sections', () => ({
  ContactSection: ({ info }: { info: unknown }) => (
    <section data-testid="contact-section" data-has-info={!!info} />
  ),
}));

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContactPage, { metadata } from './page';

describe('ContactPage', () => {
  it('rend sans erreur', () => {
    render(<ContactPage />);
  });

  it('monte ContactSection', () => {
    render(<ContactPage />);
    expect(screen.getByTestId('contact-section')).toBeInTheDocument();
  });

  it('passe les données personnelles à ContactSection', () => {
    render(<ContactPage />);
    expect(screen.getByTestId('contact-section').getAttribute('data-has-info')).toBe('true');
  });

  it('a un titre contenant "Contact"', () => {
    expect((metadata as { title: string }).title).toContain('Contact');
  });

  it('a une description', () => {
    expect((metadata as { description: string }).description.length).toBeGreaterThan(0);
  });
});
