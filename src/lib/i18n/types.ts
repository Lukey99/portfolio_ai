export type Locale = 'fr' | 'en';

export interface SectionTitleData {
  number: string;
  label: string;
  title: string;
  subtitle: string;
}

export interface Translations {
  // ── Common ──────────────────────────────────────────────────
  common: {
    switchLocale: string;
    contactCta: string;
    seeRepo: string;
  };

  // ── Header ──────────────────────────────────────────────────
  header: {
    navPortfolio: string;
    navTech: string;
    navContact: string;
    themeLight: string;
    themeDark: string;
    menuOpen: string;
    menuClose: string;
  };

  // ── Tech page intro ─────────────────────────────────────────
  techPage: {
    eyebrow: string;
    subtitle: string;
  };

  // ── Hero ────────────────────────────────────────────────────
  hero: {
    ctaExperience: string;
    ctaContact: string;
    stats: { value: string; label: string }[];
    scrollLabel: string;
  };

  // ── Portfolio section titles ─────────────────────────────────
  sections: {
    experience: SectionTitleData;
    skills: SectionTitleData;
    projects: SectionTitleData;
    education: SectionTitleData;
    profile: SectionTitleData;
  };

  // ── Portfolio content ────────────────────────────────────────
  data: {
    personalTitle: string;
    personalDescription: string;
    experiences: {
      id: string;
      company: string;
      title: string;
      period: string;
      type: 'full-time' | 'apprenticeship' | 'entrepreneur';
      description: string[];
    }[];
    education: {
      id: string;
      degree: string;
      school: string;
      period: string;
      specialization?: string;
    }[];
    projects: {
      id: string;
      title: string;
      company: string;
      period: string;
      description: string[];
      tags: string[];
    }[];
    languages: { name: string; level: string }[];
    interests: { name: string; description: string; icon: string }[];
  };

  // ── Contact page ─────────────────────────────────────────────
  contact: {
    title: string;
    emailLabel: string;
    emailCta: string;
    emailCopied: string;
    emailItemLabel: string;
    phoneItemLabel: string;
    locationItemLabel: string;
    copyright: string;
    builtWith: string;
  };

  // ── Profile section ──────────────────────────────────────────
  profile: {
    languagesHeading: string;
    interestsHeading: string;
  };

  // ── Tech: AI Workflow ────────────────────────────────────────
  aiWorkflow: {
    section: SectionTitleData;
    productivityLabel: string;
    productivityDesc: string;
    workflow: { title: string; desc: string; metricLabel: string }[];
  };

  // ── Tech: API ────────────────────────────────────────────────
  api: {
    section: SectionTitleData;
    idleText: string;
    errorLabel: string;
    endpoints: { label: string; desc: string }[];
  };

  // ── Tech: Architecture ───────────────────────────────────────
  architecture: {
    section: SectionTitleData;
    layers: { label: string; description: string }[];
    stats: { label: string }[];
    demoLabel: string;
    demoSteps: { label: string; desc: string }[];
  };

  // ── Tech: Storybook ──────────────────────────────────────────
  storybook: {
    section: SectionTitleData;
    atomsLabel: string;
    moleculesLabel: string;
    exploreTitle: string;
    exploreLaunch: string;
    exploreRepoBtn: string;
    showcaseDescriptions: string[];
  };

  // ── Tech: Tests ──────────────────────────────────────────────
  tests: {
    section: SectionTitleData;
    totalLabel: string;
    filesLabel: string;
    passingLabel: string;
    vitestLabel: string;
    playwrightLabel: string;
    ghActionsBtn: string;
    unitSuiteTests: readonly (readonly string[])[];
    e2eSuiteLabels: readonly string[];
    e2eSuiteTests: readonly (readonly string[])[];
  };

  // ── Tech: TestsDashboard ─────────────────────────────────────
  testsDashboard: {
    section: SectionTitleData;
    tabs: { label: string }[];

    // QUALITY items (parallel to QUALITY constant)
    qualityItems: {
      label: string;
      desc: string;
      popover: { title: string; body: string; items: string[] };
    }[];

    // Global view
    globalStats: { label: string; sub: string }[];
    qualityAxesLabel: string;
    globalGradeLabel: string;
    pipelineCiLabel: string;
    pipelineGreenBadge: string;
    pipelineSummaryTemplate: string;
    pipelineTimestamp: string;
    coverageAtomicLabel: string;
    coverageWeakPrefix: string;
    coverageWeakHighlight: string;

    // Pipeline view
    pipelineStatsLabels: [string, string, string];
    pipelineGanttLabel: string;
    pipelineSlowestTemplate: string;
    pipelineDetails: string[];

    // Coverage view
    coverageLayerLabel: string;
    coverageGapsLabel: string;
    coverageComponentLabel: string;
    coveredLabel: string;
    notCoveredLabel: string;
    componentColLabel: string;
    covColLabel: string;
    missingLabel: string;
    coverageGapNotes: string[];
    priorityMeta: { high: string; medium: string; low: string };

    // Score view
    improvementsLabel: string;
    improvementItems: { action: string; detail: string }[];
    priorityLabels: { high: string; medium: string; low: string };
    scoreCalcNote: string;

    // Why view
    whyAnglesLabel: string;
    whyReasonItems: {
      title: string;
      statSuffix: string;
      statLabel: string;
      body: string;
    }[];
    whyTestItems: { tool: string; points: string[] }[];
  };
}
