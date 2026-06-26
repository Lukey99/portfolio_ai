import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePortfolio } from './usePortfolio';
import { portfolioService } from '@/services/portfolio.service';
import type { Portfolio } from '@/types/portfolio.types';

vi.mock('@/services/portfolio.service', () => ({
  portfolioService: {
    getPortfolio: vi.fn(),
  },
}));

const MOCK_PORTFOLIO: Portfolio = {
  personalInfo: {
    name: 'Test',
    title: 'Dev',
    description: 'Desc',
    phone: '0600',
    email: 'test@test.com',
    location: 'Paris',
    languages: [],
    interests: [],
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
};

describe('usePortfolio', () => {
  beforeEach(() => vi.clearAllMocks());

  it('démarre avec loading=true et data=null', () => {
    vi.mocked(portfolioService.getPortfolio).mockResolvedValue(MOCK_PORTFOLIO);
    const { result } = renderHook(() => usePortfolio());
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('passe loading à false après chargement réussi', async () => {
    vi.mocked(portfolioService.getPortfolio).mockResolvedValue(MOCK_PORTFOLIO);
    const { result } = renderHook(() => usePortfolio());
    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  it('expose les données après chargement réussi', async () => {
    vi.mocked(portfolioService.getPortfolio).mockResolvedValue(MOCK_PORTFOLIO);
    const { result } = renderHook(() => usePortfolio());
    await waitFor(() => expect(result.current.data).toEqual(MOCK_PORTFOLIO));
    expect(result.current.error).toBeNull();
  });

  it("passe loading à false et expose l'erreur en cas d'échec", async () => {
    vi.mocked(portfolioService.getPortfolio).mockRejectedValue(new Error('Erreur réseau'));
    const { result } = renderHook(() => usePortfolio());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Erreur réseau');
  });
});
