'use client';

import { useReveal } from '@/hooks/useReveal';
import { SectionTitle, ExperienceCard } from '@/components/molecules';
import type { Experience } from '@/types/portfolio.types';

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const ref = useReveal();

  return (
    <section id="experience" ref={ref} style={{ padding: '7rem 1.5rem', backgroundColor: 'var(--bg)' }}>
      <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
        <SectionTitle
          number="01"
          label="Expériences"
          title="Mon Parcours"
          subtitle="Des expériences variées qui m'ont permis de développer une expertise complète en développement front-end."
        />

        <div className="timeline" style={{ paddingLeft: '2.5rem' }}>
          {/* Animated fill line */}
          <div className="timeline__track">
            <div className="timeline__fill" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
