'use client';

import { useReveal } from '@/hooks/useReveal';
import { SectionTitle, EducationCard } from '@/components/molecules';
import type { Education } from '@/types/portfolio.types';

export function EducationSection({ education }: { education: Education[] }) {
  const ref = useReveal();

  return (
    <section id="education" ref={ref} style={{ padding: '7rem 1.5rem', backgroundColor: 'var(--bg)' }}>
      <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
        <SectionTitle
          number="05"
          label="Formation"
          title="Mon Cursus"
          subtitle="Un parcours académique solide qui allie théorie et pratique."
        />

        <div className="timeline" style={{ paddingLeft: '2.5rem' }}>
          <div className="timeline__track">
            <div className="timeline__fill" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {education.map((edu, i) => (
              <EducationCard key={edu.id} education={edu} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
