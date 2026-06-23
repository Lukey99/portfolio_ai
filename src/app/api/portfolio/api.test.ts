import { describe, it, expect, vi } from 'vitest';
import { portfolioData } from '@/lib/mock-data';

vi.mock('next/server', () => ({
  NextResponse: {
    json: (data: unknown) =>
      new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
  },
}));

import { GET as getAll }         from './all/route';
import { GET as getExperiences } from './experiences/route';
import { GET as getSkills }      from './skills/route';
import { GET as getEducation }   from './education/route';
import { GET as getProjects }    from './projects/route';

// ── GET /api/portfolio ────────────────────────────────────────

describe('GET /api/portfolio', () => {
  it('retourne 200', async () => {
    const res = await getAll();
    expect(res.status).toBe(200);
  });

  it('retourne les 5 clés principales', async () => {
    const data = await (await getAll()).json();
    expect(data).toHaveProperty('personalInfo');
    expect(data).toHaveProperty('experiences');
    expect(data).toHaveProperty('skills');
    expect(data).toHaveProperty('education');
    expect(data).toHaveProperty('projects');
  });

  it('personalInfo contient name et email', async () => {
    const { personalInfo } = await (await getAll()).json();
    expect(personalInfo.name).toBe(portfolioData.personalInfo.name);
    expect(personalInfo.email).toBe(portfolioData.personalInfo.email);
  });
});

// ── GET /api/portfolio/experiences ───────────────────────────

describe('GET /api/portfolio/experiences', () => {
  it('retourne 200', async () => {
    const res = await getExperiences();
    expect(res.status).toBe(200);
  });

  it('retourne un tableau de 4 expériences', async () => {
    const data = await (await getExperiences()).json();
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(portfolioData.experiences.length);
  });

  it('chaque expérience a un id, company et type valide', async () => {
    const data = await (await getExperiences()).json();
    const validTypes = new Set(['full-time', 'apprenticeship', 'entrepreneur']);
    for (const exp of data) {
      expect(exp).toHaveProperty('id');
      expect(exp).toHaveProperty('company');
      expect(validTypes.has(exp.type)).toBe(true);
    }
  });
});

// ── GET /api/portfolio/skills ─────────────────────────────────

describe('GET /api/portfolio/skills', () => {
  it('retourne 200', async () => {
    const res = await getSkills();
    expect(res.status).toBe(200);
  });

  it('retourne 4 catégories avec id, name et skills[]', async () => {
    const data = await (await getSkills()).json();
    expect(data).toHaveLength(portfolioData.skills.length);
    for (const cat of data) {
      expect(cat).toHaveProperty('id');
      expect(cat).toHaveProperty('name');
      expect(Array.isArray(cat.skills)).toBe(true);
    }
  });
});

// ── GET /api/portfolio/education ─────────────────────────────

describe('GET /api/portfolio/education', () => {
  it('retourne 200', async () => {
    const res = await getEducation();
    expect(res.status).toBe(200);
  });

  it('retourne 2 formations avec id et degree', async () => {
    const data = await (await getEducation()).json();
    expect(data).toHaveLength(portfolioData.education.length);
    for (const entry of data) {
      expect(entry).toHaveProperty('id');
      expect(entry).toHaveProperty('degree');
    }
  });
});

// ── GET /api/portfolio/projects ───────────────────────────────

describe('GET /api/portfolio/projects', () => {
  it('retourne 200', async () => {
    const res = await getProjects();
    expect(res.status).toBe(200);
  });

  it('retourne 1 projet avec tags[]', async () => {
    const data = await (await getProjects()).json();
    expect(data).toHaveLength(portfolioData.projects.length);
    for (const proj of data) {
      expect(proj).toHaveProperty('id');
      expect(Array.isArray(proj.tags)).toBe(true);
    }
  });
});
