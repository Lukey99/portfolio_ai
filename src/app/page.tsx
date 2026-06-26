'use client';

import { portfolioData } from '@/lib/mock-data';
import { useLocale } from '@/contexts/LocaleContext';
import { MainLayout } from '@/components/templates/MainLayout';
import { Hero, ProfileSection } from '@/components/sections';
import { Timeline, BentoGrid, CardList } from '@/components/organisms';
import { TimelineCard, CredentialCard, ShowcaseCard, BentoCell } from '@/components/molecules';
import { toTimelineCardProps, toCredentialCardProps, toShowcaseCardProps, toBentoCellProps } from '@/adapters/portfolio';

export default function HomePage() {
  const { t } = useLocale();
  const { skills } = portfolioData;

  const personalInfo = {
    ...portfolioData.personalInfo,
    title: t.data.personalTitle,
    description: t.data.personalDescription,
    languages: t.data.languages,
    interests: t.data.interests,
  };

  return (
    <MainLayout
      hero={<Hero info={personalInfo} />}
      sections={[
        <Timeline
          key="experience"
          sectionId="experience"
          title={t.sections.experience}
          items={t.data.experiences}
          renderItem={(exp, i) => <TimelineCard {...toTimelineCardProps(exp)} index={i} />}
        />,
        <BentoGrid
          key="skills"
          sectionId="skills"
          title={t.sections.skills}
          items={[
            { data: skills[0], colSpan: 4 },
            { data: skills[1], colSpan: 2, rowSpan: 2 },
            { data: skills[2], colSpan: 2 },
            { data: skills[3], colSpan: 2 },
            { data: skills[4], colSpan: 3 },
            { data: skills[5], colSpan: 3 },
            { data: skills[6], colSpan: 6 },
          ]}
          renderItem={(skill, i) => <BentoCell {...toBentoCellProps(skill)} index={i} />}
        />,
        <CardList
          key="projects"
          sectionId="projects"
          title={t.sections.projects}
          items={t.data.projects}
          renderItem={(proj, i) => <ShowcaseCard {...toShowcaseCardProps(proj)} index={i} />}
        />,
        <Timeline
          key="education"
          sectionId="education"
          title={t.sections.education}
          items={t.data.education}
          renderItem={(edu, i) => <CredentialCard {...toCredentialCardProps(edu)} index={i} />}
        />,
        <ProfileSection key="profile" info={personalInfo} />,
      ]}
    />
  );
}
