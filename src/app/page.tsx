'use client';

import { portfolioData } from '@/lib/mock-data';
import { MainLayout } from '@/components/templates/MainLayout';
import { Hero } from '@/components/sections';
import { Timeline, BentoGrid, CardList } from '@/components/organisms';
import { TimelineCard, CredentialCard, ShowcaseCard, BentoCell } from '@/components/molecules';
import { toTimelineCardProps, toCredentialCardProps, toShowcaseCardProps, toBentoCellProps } from '@/adapters/portfolio';

const { personalInfo, experiences, skills, projects, education } = portfolioData;

export default function HomePage() {
  return (
    <MainLayout
      hero={<Hero info={personalInfo} />}
      sections={[
        <Timeline
          key="experience"
          sectionId="experience"
          title={{ number: '01', label: 'Expériences', title: 'Mon Parcours', subtitle: "Des expériences variées qui m'ont permis de développer une expertise complète en développement front-end." }}
          items={experiences}
          renderItem={(exp, i) => <TimelineCard {...toTimelineCardProps(exp)} index={i} />}
        />,
        <BentoGrid
          key="skills"
          sectionId="skills"
          title={{ number: '02', label: 'Compétences', title: 'Ma Stack', subtitle: "Les technologies et outils que j'utilise au quotidien pour créer des interfaces de qualité." }}
          items={[
            { data: skills[0], colSpan: 2 },
            { data: skills[1], rowSpan: 2 },
            { data: skills[2] },
            { data: skills[3] },
          ]}
          renderItem={(skill, i) => <BentoCell {...toBentoCellProps(skill)} index={i} />}
        />,
        <CardList
          key="projects"
          sectionId="projects"
          title={{ number: '03', label: 'Projets', title: 'Projets Entrepreneuriaux', subtitle: "Des initiatives personnelles qui reflètent ma passion pour le produit et l'expérience utilisateur." }}
          items={projects}
          renderItem={(proj, i) => <ShowcaseCard {...toShowcaseCardProps(proj)} index={i} />}
        />,
        <Timeline
          key="education"
          sectionId="education"
          title={{ number: '04', label: 'Formation', title: 'Mon Cursus', subtitle: "Un parcours académique solide qui allie théorie et pratique." }}
          items={education}
          renderItem={(edu, i) => <CredentialCard {...toCredentialCardProps(edu)} index={i} />}
        />,
      ]}
    />
  );
}
