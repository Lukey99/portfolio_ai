'use client';

import type { Portfolio } from '@/types/portfolio.types';
import {
  Hero,
  ExperienceSection,
  SkillsSection,
  ProjectsSection,
  EducationSection,
} from '@/components/organisms';

interface MainLayoutProps {
  data: Portfolio;
}

const Divider = () => (
  <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(var(--overlay-rgb), 0.06), transparent)', maxWidth: '900px', margin: '0 auto' }} />
);

export function MainLayout({ data }: MainLayoutProps) {
  const { personalInfo, experiences, skills, projects, education } = data;

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <Hero info={personalInfo} />
      <Divider />
      <ExperienceSection experiences={experiences} />
      <Divider />
      <SkillsSection skills={skills} />
      <Divider />
      <ProjectsSection projects={projects} />
      <Divider />
      <EducationSection education={education} />
    </div>
  );
}
