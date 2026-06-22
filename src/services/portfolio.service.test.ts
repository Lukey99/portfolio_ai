import { describe, it, expect, vi, beforeEach } from 'vitest';
import { portfolioService } from './portfolio.service';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function mockOk(data: unknown) {
  return Promise.resolve({ ok: true, json: () => Promise.resolve(data) } as Response);
}
function mockFail() {
  return Promise.resolve({ ok: false } as Response);
}

beforeEach(() => mockFetch.mockReset());

describe('portfolioService', () => {
  it('getPortfolio appelle /api/portfolio', async () => {
    mockFetch.mockReturnValueOnce(mockOk({}));
    await portfolioService.getPortfolio();
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/portfolio',
      expect.objectContaining({ next: { revalidate: 3600 } }),
    );
  });

  it('getExperiences appelle /api/portfolio/experiences', async () => {
    mockFetch.mockReturnValueOnce(mockOk([]));
    await portfolioService.getExperiences();
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/portfolio/experiences',
      expect.any(Object),
    );
  });

  it('getSkills appelle /api/portfolio/skills', async () => {
    mockFetch.mockReturnValueOnce(mockOk([]));
    await portfolioService.getSkills();
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/portfolio/skills',
      expect.any(Object),
    );
  });

  it('getEducation appelle /api/portfolio/education', async () => {
    mockFetch.mockReturnValueOnce(mockOk([]));
    await portfolioService.getEducation();
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/portfolio/education',
      expect.any(Object),
    );
  });

  it('getProjects appelle /api/portfolio/projects', async () => {
    mockFetch.mockReturnValueOnce(mockOk([]));
    await portfolioService.getProjects();
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3000/api/portfolio/projects',
      expect.any(Object),
    );
  });

  it('lève une erreur si response.ok est false', async () => {
    mockFetch.mockReturnValueOnce(mockFail());
    await expect(portfolioService.getPortfolio()).rejects.toThrow('Failed to fetch');
  });

  it('retourne les données JSON de la réponse', async () => {
    const payload = { personalInfo: { name: 'Test' } };
    mockFetch.mockReturnValueOnce(mockOk(payload));
    const result = await portfolioService.getPortfolio();
    expect(result).toEqual(payload);
  });
});
