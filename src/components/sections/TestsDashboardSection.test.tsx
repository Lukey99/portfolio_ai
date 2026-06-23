import { vi } from 'vitest';

vi.mock('@/contexts/LocaleContext', async () => {
  const { fr } = await import('@/lib/i18n/fr');
  return { useLocale: () => ({ locale: 'fr' as const, t: fr, setLocale: () => {} }) };
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TestsDashboardSection } from './TestsDashboardSection';

describe('TestsDashboardSection', () => {
  it('rend sans erreur', () => {
    render(<TestsDashboardSection />);
  });

  it('affiche le titre "Dashboard qualité"', () => {
    render(<TestsDashboardSection />);
    expect(screen.getByText('Dashboard qualité')).toBeInTheDocument();
  });

  it('affiche les 4 onglets de navigation', () => {
    render(<TestsDashboardSection />);
    expect(screen.getByRole('button', { name: /Vue globale/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Score qualité/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Pipeline/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Couverture/i })).toBeInTheDocument();
  });

  it('affiche la Vue globale par défaut avec les stats', () => {
    render(<TestsDashboardSection />);
    expect(screen.getByText('Tests')).toBeInTheDocument();
    expect(screen.getByText('Échecs')).toBeInTheDocument();
  });

  it('passe à la vue Score qualité', async () => {
    render(<TestsDashboardSection />);
    fireEvent.click(screen.getByRole('button', { name: /Score qualité/i }));
    await waitFor(() => {
      expect(screen.getByText("Axes d'amélioration")).toBeInTheDocument();
    });
  });

  it('passe à la vue Pipeline', async () => {
    render(<TestsDashboardSection />);
    fireEvent.click(screen.getByRole('button', { name: /Pipeline/i }));
    await waitFor(() => {
      expect(screen.getByText('Répartition du temps CI')).toBeInTheDocument();
    });
  });

  it('passe à la vue Couverture', async () => {
    render(<TestsDashboardSection />);
    fireEvent.click(screen.getByRole('button', { name: /Couverture/i }));
    await waitFor(() => {
      expect(screen.getByText('Lacunes identifiées')).toBeInTheDocument();
    });
  });

  it('expose un id "tests-dashboard" sur la section', () => {
    const { container } = render(<TestsDashboardSection />);
    expect(container.querySelector('#tests-dashboard')).toBeTruthy();
  });
});
