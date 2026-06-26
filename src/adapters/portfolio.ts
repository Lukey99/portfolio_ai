import type { Experience, Education, Project, SkillCategory } from '@/types/portfolio.types';

const TYPE_LABELS: Record<Experience['type'], string> = {
  'full-time': 'CDI',
  apprenticeship: 'Alternance',
  entrepreneur: 'Projet',
};

export function toTimelineCardProps(exp: Experience) {
  return {
    badge: TYPE_LABELS[exp.type],
    period: exp.period,
    title: exp.company,
    subtitle: exp.title,
    items: exp.description,
  };
}

export function toCredentialCardProps(edu: Education) {
  return {
    period: edu.period,
    institution: edu.school,
    title: edu.degree,
    detail: edu.specialization,
  };
}

export function toShowcaseCardProps(proj: Project) {
  return {
    period: proj.period,
    title: proj.company,
    subtitle: proj.title,
    description: proj.description,
    tags: proj.tags,
  };
}

export function toBentoCellProps(cat: SkillCategory) {
  return {
    icon: cat.icon,
    name: cat.name,
    skills: cat.skills,
  };
}
