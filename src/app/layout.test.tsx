import { vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter', className: 'inter' }),
}));

vi.mock('@/components/organisms/Header', () => ({
  Header: () => <nav data-testid="mock-header" />,
}));

vi.mock('@/components/organisms/CustomCursor', () => ({
  CustomCursor: () => <span data-testid="mock-cursor" />,
}));

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RootLayout, { metadata } from './layout';

describe('RootLayout', () => {
  it('rend sans erreur', () => {
    render(
      <RootLayout>
        <div>contenu</div>
      </RootLayout>
    );
  });

  it('affiche les enfants', () => {
    render(
      <RootLayout>
        <p>page content</p>
      </RootLayout>
    );
    expect(screen.getByText('page content')).toBeInTheDocument();
  });

  it('monte le Header', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>
    );
    expect(document.querySelector('[data-testid="mock-header"]')).toBeTruthy();
  });

  it('monte le CustomCursor', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>
    );
    expect(document.querySelector('[data-testid="mock-cursor"]')).toBeTruthy();
  });
});

describe('metadata', () => {
  it('titre correct', () => {
    expect(metadata.title).toBe('Kévin Nguyen — Développeur Front End');
  });

  it('description renseignée', () => {
    expect(typeof metadata.description).toBe('string');
    expect((metadata.description as string).length).toBeGreaterThan(10);
  });

  it('keywords présents', () => {
    expect(Array.isArray(metadata.keywords)).toBe(true);
    expect((metadata.keywords as string[]).length).toBeGreaterThan(0);
  });

  it('auteur renseigné', () => {
    const authors = metadata.authors as Array<{ name: string }>;
    expect(authors[0].name).toBe('Kévin Nguyen');
  });
});
