import { describe, it, expect } from 'vitest';
import {
  SectionTitle,
  ExperienceCard,
  SkillBento,
  ProjectCard,
  EducationCard,
  ContactItem,
} from './index';

describe('molecules/index barrel', () => {
  it('re-exporte SectionTitle',   () => { expect(SectionTitle).toBeDefined(); });
  it('re-exporte ExperienceCard', () => { expect(ExperienceCard).toBeDefined(); });
  it('re-exporte SkillBento',     () => { expect(SkillBento).toBeDefined(); });
  it('re-exporte ProjectCard',    () => { expect(ProjectCard).toBeDefined(); });
  it('re-exporte EducationCard',  () => { expect(EducationCard).toBeDefined(); });
  it('re-exporte ContactItem',    () => { expect(ContactItem).toBeDefined(); });
});
