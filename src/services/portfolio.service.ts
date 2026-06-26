import type {
  Portfolio,
  Experience,
  Education,
  SkillCategory,
  Project,
} from '@/types/portfolio.types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/portfolio${path}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  return res.json() as Promise<T>;
}

export const portfolioService = {
  getPortfolio: () => fetchJson<Portfolio>('/all'),
  getExperiences: () => fetchJson<Experience[]>('/experiences'),
  getSkills: () => fetchJson<SkillCategory[]>('/skills'),
  getEducation: () => fetchJson<Education[]>('/education'),
  getProjects: () => fetchJson<Project[]>('/projects'),
};
