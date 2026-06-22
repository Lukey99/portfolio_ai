'use client';

import { useReveal } from '@/hooks/useReveal';
import { SectionTitle, ProjectCard } from '@/components/molecules';
import type { Project } from '@/types/portfolio.types';

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const ref = useReveal();

  return (
    <section id="projects" ref={ref} style={{ padding: '7rem 1.5rem', backgroundColor: 'var(--bg)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <SectionTitle
          number="03"
          label="Projets"
          title="Projets Entrepreneuriaux"
          subtitle="Des initiatives personnelles qui reflètent ma passion pour le produit et l'expérience utilisateur."
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
