import { vi } from 'vitest';

vi.mock('@/components/templates/MainLayout', () => ({
  MainLayout: ({ data }: { data: unknown }) => (
    <main data-testid="main-layout" data-has-data={!!data} />
  ),
}));

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePage from './page';

describe('HomePage', () => {
  it('rend sans erreur', () => {
    render(<HomePage />);
  });

  it('monte le MainLayout', () => {
    render(<HomePage />);
    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
  });

  it('passe des données à MainLayout', () => {
    render(<HomePage />);
    expect(screen.getByTestId('main-layout').getAttribute('data-has-data')).toBe('true');
  });
});
