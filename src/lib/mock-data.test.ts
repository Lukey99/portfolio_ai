import { describe, it, expect } from 'vitest';
import { portfolioData } from './mock-data';

describe('portfolioData', () => {
  describe('personalInfo', () => {
    it('a un nom', () => {
      expect(portfolioData.personalInfo.name.length).toBeGreaterThan(0);
    });
    it('a un titre', () => {
      expect(portfolioData.personalInfo.title.length).toBeGreaterThan(0);
    });
    it('a un email valide', () => {
      expect(portfolioData.personalInfo.email).toMatch(/@/);
    });
    it('a au moins une langue', () => {
      expect(portfolioData.personalInfo.languages.length).toBeGreaterThan(0);
    });
    it('a au moins un intérêt', () => {
      expect(portfolioData.personalInfo.interests.length).toBeGreaterThan(0);
    });
  });

  describe('experiences', () => {
    it('contient au moins une expérience', () => {
      expect(portfolioData.experiences.length).toBeGreaterThan(0);
    });
    it('chaque expérience a un id, titre et company', () => {
      portfolioData.experiences.forEach(exp => {
        expect(exp.id).toBeTruthy();
        expect(exp.title).toBeTruthy();
        expect(exp.company).toBeTruthy();
      });
    });
  });

  describe('education', () => {
    it('contient au moins une formation', () => {
      expect(portfolioData.education.length).toBeGreaterThan(0);
    });
    it('chaque formation a un diplôme et une école', () => {
      portfolioData.education.forEach(edu => {
        expect(edu.degree).toBeTruthy();
        expect(edu.school).toBeTruthy();
      });
    });
  });

  describe('skills', () => {
    it('contient au moins une catégorie', () => {
      expect(portfolioData.skills.length).toBeGreaterThan(0);
    });
    it('chaque catégorie a un id et des skills', () => {
      portfolioData.skills.forEach(cat => {
        expect(cat.id).toBeTruthy();
        expect(cat.skills.length).toBeGreaterThan(0);
      });
    });
  });

  describe('projects', () => {
    it('contient au moins un projet', () => {
      expect(portfolioData.projects.length).toBeGreaterThan(0);
    });
    it('chaque projet a un titre et des tags', () => {
      portfolioData.projects.forEach(proj => {
        expect(proj.title).toBeTruthy();
        expect(proj.tags.length).toBeGreaterThan(0);
      });
    });
  });
});
