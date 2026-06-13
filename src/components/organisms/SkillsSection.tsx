'use client';

import { useReveal } from '@/hooks/useReveal';
import { SectionTitle, SkillBento } from '@/components/molecules';
import type { SkillCategory } from '@/types/portfolio.types';

export function SkillsSection({ skills }: { skills: SkillCategory[] }) {
  const ref = useReveal();
  const [stack, uiDesign, tools, ide] = skills;

  return (
    <section id="skills" ref={ref} style={{ padding: '7rem 1.5rem', backgroundColor: 'var(--bg)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <SectionTitle
          number="02"
          label="Compétences"
          title="Ma Stack"
          subtitle="Les technologies et outils que j'utilise au quotidien pour créer des interfaces de qualité."
        />

        {/* Bento grid */}
        <div className="bento-grid">
          {/* Stack — 2 cols wide */}
          <div style={{ gridColumn: 'span 2' }}>
            {stack && <SkillBento category={stack} index={0} />}
          </div>

          {/* UI/Design — 1 col, 2 rows tall */}
          <div style={{ gridRow: 'span 2' }}>
            {uiDesign && <SkillBento category={uiDesign} index={1} />}
          </div>

          {/* Tools */}
          <div>
            {tools && <SkillBento category={tools} index={2} />}
          </div>

          {/* IDE */}
          <div>
            {ide && <SkillBento category={ide} index={3} />}
          </div>
        </div>
      </div>
    </section>
  );
}
