import type { Translations } from './types';

export const en: Translations = {
  // ── Common ──────────────────────────────────────────────────
  common: {
    switchLocale: 'FR',
    contactCta: 'Contact me',
    seeRepo: 'See repo',
  },

  // ── Header ──────────────────────────────────────────────────
  header: {
    navPortfolio: 'Portfolio',
    navTech: 'Tech',
    navContact: 'Contact',
    themeLight: 'Switch to light mode',
    themeDark: 'Switch to dark mode',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },

  // ── Tech page intro ─────────────────────────────────────────
  techPage: {
    eyebrow: 'Stack & Methodology',
    subtitle: 'AI & Workflow · Tests · Architecture · Storybook',
  },

  // ── Hero ────────────────────────────────────────────────────
  hero: {
    ctaExperience: 'View my career',
    ctaContact: 'Contact me',
    stats: [
      { value: '6+', label: 'Years of experience' },
      { value: '4',  label: 'Companies' },
      { value: '925', label: 'TOEIC English' },
    ],
    scrollLabel: 'Scroll',
  },

  // ── Portfolio sections ───────────────────────────────────────
  sections: {
    experience: {
      number: '01',
      label: 'Experience',
      title: 'My Career',
      subtitle: 'Varied experiences that have allowed me to develop a comprehensive expertise in front-end development.',
    },
    skills: {
      number: '02',
      label: 'Skills',
      title: 'My Stack',
      subtitle: 'The technologies and tools I use daily to build high-quality interfaces.',
    },
    projects: {
      number: '03',
      label: 'Projects',
      title: 'Entrepreneurial Projects',
      subtitle: 'Personal initiatives that reflect my passion for product and user experience.',
    },
    education: {
      number: '04',
      label: 'Education',
      title: 'My Studies',
      subtitle: 'A solid academic background that combines theory and practice.',
    },
    profile: {
      number: '05',
      label: 'Profile',
      title: 'About me',
      subtitle: 'Languages I speak and interests that shape my approach to work.',
    },
  },

  // ── Portfolio data ───────────────────────────────────────────
  data: {
    personalTitle: 'Front-End Developer',
    personalDescription: 'Front-end developer specialised in building scalable, high-performance interfaces (React / Vue), with a strong focus on pixel-perfect design and user experience. Experience in setting up design systems and improving team workflows.',
    experiences: [
      {
        id: 'jane-energie',
        title: 'Front-End Developer',
        company: 'Jane Énergie',
        period: '2025 — 2026',
        type: 'full-time',
        description: [
          'Defining and implementing the front-end architecture',
          'Building a design system from scratch',
          'Setting up a structured Git workflow (CI/CD, branch management)',
          'Code standardisation improving maintainability and collaboration',
          'Rolling out best practices across the team',
        ],
      },
      {
        id: 'checkmyguest',
        title: 'Front-End Developer',
        company: 'CheckMyGuest',
        period: '2022 — 2024',
        type: 'full-time',
        description: [
          'Designing and deploying a scalable design system used by multiple teams',
          'Setting up visual regression testing (Storybook + Chromatic)',
          'Developing components following atomic design principles',
          'Improving code maintainability and cross-team collaboration',
          'Supervising and mentoring an international team (4 devs)',
        ],
      },
      {
        id: 'credit-agricole',
        title: 'Apprentice Developer',
        company: 'Crédit Agricole Assurances',
        period: '2020 — 2022',
        type: 'apprenticeship',
        description: [
          'Back-end development (C#, .NET)',
          'Deploying applications on the SharePoint platform',
          'Developing a REST API server',
          'Code version management (GitLab)',
          'Designing and developing intranet solutions and applications',
        ],
      },
      {
        id: 'ratp',
        title: 'Apprentice IoT Engineer',
        company: 'RATP',
        period: '2019 — 2020',
        type: 'apprenticeship',
        description: [
          'Writing Python scripts',
          'Analysing real-time data',
          'Setting up connected sensors on the rail network',
        ],
      },
    ],
    education: [
      {
        id: 'esiea',
        degree: 'Digital Engineering Degree',
        school: 'ESIEA Paris',
        period: '2019 — 2022',
        specialization: 'Software Engineering Major',
      },
      {
        id: 'iut',
        degree: 'DUT Electrical Engineering and Industrial Computing',
        school: 'IUT de Créteil Vitry',
        period: '2017 — 2019',
      },
    ],
    projects: [
      {
        id: 'aerin-studio',
        title: 'Co-Founder',
        company: 'Aerin Studio',
        period: '2026 — Present',
        description: [
          'Developing and customising the Shopify e-commerce website',
          'Front-end integration and optimisation of mobile and desktop user experience',
          'Contributing to art direction and brand visual identity',
          'Retouching and editing product visuals and marketing content',
          'Collaborating on branding, visual universe and interface consistency',
        ],
        tags: ['Shopify', 'Front-End', 'Art Direction', 'Branding', 'UI/UX'],
      },
    ],
    languages: [
      { name: 'French', level: 'Native language' },
      { name: 'English', level: 'TOEIC 925' },
      { name: 'Vietnamese', level: 'Basic knowledge' },
    ],
    interests: [
      { name: 'Music', description: 'Composer, performer', icon: '🎵' },
      { name: 'Audiovisual', description: 'Video editing and photography', icon: '📷' },
    ],
  },

  // ── Contact page ─────────────────────────────────────────────
  contact: {
    title: "Let's work together",
    emailLabel: 'My email address',
    emailCta: 'Send an email',
    emailCopied: 'Email copied!',
    emailItemLabel: 'Email',
    phoneItemLabel: 'Phone',
    locationItemLabel: 'Location',
    githubItemLabel: 'GitHub',
    copyright: `© ${new Date().getFullYear()} Kévin Nguyen — All rights reserved`,
    builtWith: 'Next.js · TypeScript · Framer Motion',
  },

  // ── Profile section ──────────────────────────────────────────
  profile: {
    languagesHeading: 'Languages',
    interestsHeading: 'Interests',
  },

  // ── Tech: AI Workflow ────────────────────────────────────────
  aiWorkflow: {
    section: {
      number: '01',
      label: 'AI & Workflow',
      title: 'Augmented productivity',
      subtitle: 'I integrate Cursor and Claude Code into my daily workflow to automate repetitive tasks and focus on what creates real value.',
    },
    workflow: [
      {
        title: 'Code audits',
        desc: 'Automatic detection of bugs, anti-patterns and quality drift before every merge.',
        benefit: 'Consistent quality at every merge, without manual supervision',
      },
      {
        title: 'Writing tests',
        desc: 'Generating unit and e2e tests covering edge cases identified during the audit.',
        benefit: 'Extended coverage to edge cases, generated in seconds',
      },
      {
        title: 'Optimisations',
        desc: 'Bundle analysis, render performance and network request profiling to ship faster.',
        benefit: 'Bundle, render and network profiled at every release',
      },
      {
        title: 'Pull Requests',
        desc: 'Generated descriptions, assisted review and refactor suggestions within the PR cycle.',
        benefit: 'Auto-generated descriptions and documented merge cycle',
      },
    ],
  },

  // ── Tech: API ────────────────────────────────────────────────
  api: {
    section: {
      number: '04',
      label: 'REST API',
      title: 'API Demo',
      subtitle: 'Next.js route handlers exposing portfolio data. Click an endpoint to run a live fetch.',
    },
    idleText: 'Select an endpoint',
    errorLabel: 'Error',
    endpoints: [
      { label: 'Portfolio',   desc: 'Full portfolio data.' },
      { label: 'Experiences', desc: 'List of professional experiences.' },
      { label: 'Skills',      desc: 'Technical skill categories.' },
      { label: 'Education',   desc: 'Academic background and degrees.' },
      { label: 'Projects',    desc: 'Side projects and achievements.' },
    ],
  },

  // ── Tech: Architecture ───────────────────────────────────────
  architecture: {
    section: {
      number: '05',
      label: 'Architecture',
      title: 'Atomic Design',
      subtitle: 'The UI follows the Atomic Design pattern — each level is independent, testable, and reusable across multiple contexts.',
    },
    layers: [
      { label: 'Atoms',     description: 'Elementary building blocks — no application logic' },
      { label: 'Molecules', description: 'Combinations of atoms with a single responsibility' },
      { label: 'Organisms', description: 'Standalone sections composed of molecules' },
      { label: 'Templates', description: 'Structural layout — no hardcoded data' },
      { label: 'Pages',     description: 'Next.js routes — final assembly with real data' },
    ],
    stats: [
      { label: 'Atoms' },
      { label: 'Molecules' },
      { label: 'Organisms' },
      { label: 'Pages' },
    ],
    demoLabel: 'Interactive demo',
    demoSteps: [
      { label: 'Assembled', desc: 'The UI as the user sees it — no visible seam between levels.' },
      { label: 'Organism',  desc: 'Orchestrates a list of generic items and delegates the rendering of each via a render prop.' },
      { label: 'Molecule',  desc: 'Assembles Badge + GradientText + text from visual props — no domain coupling.' },
      { label: 'Atoms',     desc: 'Indivisible building blocks — each lives in its own logic, reused everywhere.' },
    ],
  },

  // ── Tech: Storybook ──────────────────────────────────────────
  storybook: {
    section: {
      number: '06',
      label: 'Storybook',
      title: 'Component library',
      subtitle: 'Every component is documented and isolated — variants, props, interactive states and realistic sample data.',
    },
    atomsLabel: 'Atoms',
    moleculesLabel: 'Molecules',
    exploreTitle: 'Explore the full Storybook',
    exploreLaunch: 'Run locally:',
    exploreRepoBtn: 'See repo',
    showcaseDescriptions: [
      'Primary (gradient) or secondary (outline) button; accepts href or onClick.',
      'Inline label to type content: violet accent, cyan or neutral.',
      'Technology chip used in project cards and skill grids.',
      'Span with violet → cyan gradient, used for headings and key names.',
      'Card with badge, period, title, subtitle and bullet list. Used in Timelines.',
      'Card with 3D tilt on hover, achievement list and tech tags.',
      'Education card with diploma icon, institution, title and optional detail.',
      'Contact row with icon, label and value — clickable when an href is provided.',
      'Bento card with emoji icon, category name and list of tech tags.',
    ],
  },

  // ── Tech: Tests ──────────────────────────────────────────────
  tests: {
    section: {
      number: '02',
      label: 'Tests & Quality',
      title: 'Test coverage',
      subtitle: 'Unit tests on atoms, molecules and hooks — E2E tests on critical user flows. Run in CI on every push.',
    },
    totalLabel: 'tests total',
    filesLabel: 'test files',
    passingLabel: '% passing',
    vitestLabel: 'Vitest + React Testing Library',
    playwrightLabel: 'Playwright E2E',
    ghActionsBtn: 'View GitHub Actions',
    unitSuiteTests: [
      [
        'starts in dark mode by default',
        'detects light mode from html class (anti-flash)',
        'toggle → light mode + class + localStorage',
        'toggle → dark mode, removes class',
        'two consecutive toggles return to initial state',
      ],
      [
        'renders an <a> when href is provided',
        'renders a <button> when href is absent',
        'btn--primary class by default',
        'btn--secondary class with secondary variant',
        'rel="noopener noreferrer" on target _blank',
        'no rel when target is not _blank',
      ],
      [
        'displays its content',
        'dim variant by default',
        'badge--accent with accent variant',
        'badge--cyan with cyan variant',
      ],
      [
        'displays its content',
        'applies the chip class',
      ],
      [
        'displays the watermark number',
        'displays the label with the number',
        'displays the title in h2',
        'displays the subtitle when provided',
        'does not display subtitle when absent',
      ],
      [
        'displays badge, title, subtitle and period',
        'displays all bullet points',
        'displays the badge passed as prop',
      ],
      [
        'displays the label and value',
        'renders a clickable link when href provided',
        'does not render a link when href is absent',
        'displays the icon',
      ],
      [
        'GET /api/portfolio — returns 200',
        'returns the 5 main keys',
        'personalInfo contains name and email',
        'GET /api/portfolio/experiences — returns 200',
        'returns an array of 4 experiences',
        'each experience has a valid id, company and type',
        'GET /api/portfolio/skills — returns 200',
        'returns 4 categories with id, name and skills[]',
        'GET /api/portfolio/education — returns 200',
        'returns 2 education entries with id and degree',
        'GET /api/portfolio/projects — returns 200',
        'returns 1 project with tags[]',
      ],
    ],
    e2eSuiteLabels: ['Dark/light theme', 'Navigation'],
    e2eSuiteTests: [
      [
        'loads in dark mode by default',
        'toggle switches to light mode',
        'toggle switches back to dark mode',
        'theme persists after page reload',
        'localStorage contains the correct theme',
      ],
      [
        'header visible on load',
        'logo points to #home',
        'Experiences link → #experience',
        'click scrolls to the section',
        'email button visible and clickable on contact page',
        'Contact me CTA → #contact',
      ],
    ],
  },

  // ── Tech: TestsDashboard ─────────────────────────────────────
  testsDashboard: {
    section: {
      number: '03',
      label: 'Quality Report',
      title: 'Quality dashboard',
      subtitle: 'Overall score, CI/CD pipeline and per-component coverage — a complete view of code reliability.',
    },
    tabs: [
      { label: 'Overview' },
      { label: 'Quality score' },
      { label: 'Pipeline' },
      { label: 'Coverage' },
      { label: 'Why?' },
    ],
    qualityItems: [
      {
        label: 'Coverage', desc: 'All source files tested',
        popover: {
          title: 'Code coverage',
          body: 'All public source files have at least one unit test, measured via @vitest/coverage-v8.',
          items: ['46 suites · 245 unit tests', 'App · Atoms · Molecules · Organisms · Hooks · Service · Lib', 'E2E and Organism benchmarks still to complete'],
        },
      },
      {
        label: 'Accessibility', desc: 'WCAG 2A/2AA score via axe-core',
        popover: {
          title: 'Accessibility score',
          body: '0 critical violations detected on the 3 tested pages, compliant with WCAG 2.1 Level AA.',
          items: ['9 unit tests via axe-core', '5 E2E tests dark + 5 E2E tests light', 'Alt texts + ARIA roles verified'],
        },
      },
      {
        label: 'Performance', desc: 'LCP, CLS, TTFB within targets',
        popover: {
          title: 'Web Vitals',
          body: 'Core Web Vitals measured via PerformanceObserver in Playwright on the home page locally.',
          items: ['LCP < 2.5s ✓ · CLS < 0.1 ✓', 'TTFB < 500ms ✓ · API < 200ms ✓', 'FCP not measured → 12pts missing'],
        },
      },
      {
        label: 'Density', desc: 'Tests per exposed component',
        popover: {
          title: 'Test density',
          body: 'Ratio between the total number of tests and the public components exposed in the application.',
          items: ['~10 tests / component on average', '6 different test types', 'E2E Organisms + benchmarks to complete'],
        },
      },
    ],
    globalStats: [
      { label: 'Tests',          sub: '6 types · 0 skip' },
      { label: 'Failures',       sub: 'Green pipeline' },
      { label: 'Quality score',  sub: '4-axis average' },
      { label: 'Min. cov.',      sub: 'All files covered' },
    ],
    qualityAxesLabel: 'Quality axes',
    globalGradeLabel: 'Overall grade · average of 4 axes',
    pipelineCiLabel: 'CI/CD Pipeline',
    pipelineGreenBadge: '6/6 green',
    pipelineSummaryTemplate: '{tests} tests · {total} total',
    pipelineTimestamp: 'main · 2h ago',
    coverageAtomicLabel: 'Coverage by atomic layer',
    coverageWeakPrefix: 'Weak point:',
    pipelineStatsLabels: ['Total duration', 'Tests run', 'Status'],
    pipelineGanttLabel: 'CI time breakdown',
    pipelineSlowestTemplate: 'is the slowest step',
    pipelineDetails: [
      'TypeScript strict + ESLint — 0 errors',
      '46 files · 245 tests · App · Atoms · Molecules · Organisms · Hooks · Service · Lib',
      '5 REST routes · mocked data',
      'axe-core + Playwright · dark & light mode · WCAG 2A + 2AA',
      'Playwright · 3 pages · navigation + content',
      'LCP < 2.5s · CLS < 0.1 · TTFB < 500ms',
    ],
    coverageLayerLabel: 'By atomic layer',
    coverageGapsLabel: 'Identified gaps',
    coverageComponentLabel: 'By component',
    coveredLabel: 'covered',
    notCoveredLabel: 'not covered',
    componentColLabel: 'Component',
    covColLabel: 'Cov.',
    missingLabel: 'missing',
    coverageGapNotes: [
      'Unit tests covered (245 tests). E2E and benchmarks to complete for full coverage.',
      'Only covered by accessibility tests. 2-3 unit tests would be sufficient.',
      'E2E and benchmark missing. Frequently used component.',
      'Hook with no direct rendering — A11y not applicable, Bench optional.',
    ],
    priorityMeta: { high: 'Critical', medium: 'Moderate', low: 'Low' },
    improvementsLabel: 'Improvement areas',
    improvementItems: [
      { action: 'E2E & Bench tests for Organisms',  detail: '15 Organisms covered with unit tests. E2E and benchmarks missing to complete density.' },
      { action: 'Measure FCP & TTI',                detail: 'First Contentful Paint and Time to Interactive not yet measured.' },
      { action: 'Keyboard navigation tests',         detail: 'Focus trap, tab order and keyboard shortcuts to validate.' },
    ],
    priorityLabels: { high: 'High priority', medium: 'Medium priority', low: 'Low impact' },
    scoreCalcNote: 'Score calculated as the average of 4 axes. Each point gained on coverage or density has the strongest impact on the overall score.',
    whyAnglesLabel: '6 test angles',
    whyReasonItems: [
      {
        title: 'Deploy without fear',
        statSuffix: 'regression',
        statLabel: 'undetected in production',
        body: 'A green pipeline = deployable code. No more manual checks before every release: if the 245 unit tests pass, we ship.',
      },
      {
        title: 'Fix early',
        statSuffix: '',
        statLabel: 'cheaper to fix in dev than in prod',
        body: 'A bug caught by a test is fixed in minutes. Detected in production, it costs a hotfix, a rollback, and sometimes an all-nighter.',
      },
      {
        title: 'Living documentation',
        statSuffix: 'cases',
        statLabel: 'of specified behaviour',
        body: "Each test describes what a component should do. Unlike comments, tests don't lie: if the code changes, the test fails.",
      },
      {
        title: 'Refactor freely',
        statSuffix: '',
        statLabel: 'of layers refactorable with confidence',
        body: 'Changing the implementation without touching the tests validates that behaviour is preserved. Tests test the what, not the how.',
      },
    ],
    whyTestItems: [
      {
        tool: 'Vitest + Testing Library',
        points: [
          'Rendering each component according to its props and state',
          'Interactions: clicks, input, toggle, navigation',
          'Hooks and service — business logic isolated from the DOM',
        ],
      },
      {
        tool: 'axe-core + Playwright',
        points: [
          'WCAG 2A and 2AA compliance — 0 critical violations',
          'ARIA roles, alt texts, heading hierarchy',
          'Dark mode and light mode verified independently',
        ],
      },
      {
        tool: 'Vitest + fetch mock',
        points: [
          '5 REST routes: HTTP codes and JSON structure',
          'Network errors and edge cases handled',
          'Consistency of data returned by each endpoint',
        ],
      },
      {
        tool: 'Playwright',
        points: [
          'Full navigation across 3 pages in real conditions',
          'Rendering of key sections in a real Chromium browser',
          'Anchors, active links and scroll behaviour verified',
        ],
      },
      {
        tool: 'PerformanceObserver + Playwright',
        points: [
          'LCP < 2.5s · CLS < 0.1 · TTFB < 500ms',
          'API response time < 200ms measured locally',
          'Core Web Vitals on the home and tech pages',
        ],
      },
      {
        tool: 'Vitest bench',
        points: [
          'Render time of atoms and molecules (target < 1ms)',
          'Comparative benchmarks between component variants',
          'Detection of performance regressions at build time',
        ],
      },
    ],
  },
};
