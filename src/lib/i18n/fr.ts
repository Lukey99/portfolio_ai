import type { Translations } from './types';

export const fr: Translations = {
  // ── Common ──────────────────────────────────────────────────
  common: {
    switchLocale: 'EN',
    contactCta: 'Me contacter',
    seeRepo: 'Voir le repo',
  },

  // ── Header ──────────────────────────────────────────────────
  header: {
    navPortfolio: 'Portfolio',
    navTech: 'Tech',
    navContact: 'Contact',
    themeLight: 'Passer en mode clair',
    themeDark: 'Passer en mode sombre',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
  },

  // ── Tech page intro ─────────────────────────────────────────
  techPage: {
    eyebrow: 'Stack & Méthodologie',
    subtitle: 'IA & Workflow · Tests · Architecture · Storybook',
  },

  // ── Hero ────────────────────────────────────────────────────
  hero: {
    ctaExperience: 'Voir mon parcours',
    ctaContact: 'Me contacter',
    stats: [
      { value: '6+', label: "Années d'expérience" },
      { value: '4',  label: 'Entreprises' },
      { value: '925', label: 'TOEIC anglais' },
    ],
    scrollLabel: 'Scroll',
  },

  // ── Portfolio sections ───────────────────────────────────────
  sections: {
    experience: {
      number: '01',
      label: 'Expériences',
      title: 'Mon Parcours',
      subtitle: "Des expériences variées qui m'ont permis de développer une expertise complète en développement front-end.",
    },
    skills: {
      number: '02',
      label: 'Compétences',
      title: 'Ma Stack',
      subtitle: "Les technologies et outils que j'utilise au quotidien pour créer des interfaces de qualité.",
    },
    projects: {
      number: '03',
      label: 'Projets',
      title: 'Projets Entrepreneuriaux',
      subtitle: "Des initiatives personnelles qui reflètent ma passion pour le produit et l'expérience utilisateur.",
    },
    education: {
      number: '04',
      label: 'Formation',
      title: 'Mon Cursus',
      subtitle: "Un parcours académique solide qui allie théorie et pratique.",
    },
    profile: {
      number: '05',
      label: 'Profil',
      title: 'À propos de moi',
      subtitle: "Langues maîtrisées et centres d'intérêt qui façonnent ma vision du travail.",
    },
  },

  // ── Portfolio data ───────────────────────────────────────────
  data: {
    personalTitle: 'Développeur Front End',
    personalDescription: "Développeur front-end spécialisé en création d'interfaces scalables et performantes (React / Vue), avec une forte exigence sur le pixel perfect et l'expérience utilisateur. Expérience dans la mise en place de design systems et l'amélioration des workflows d'équipe.",
    experiences: [
      {
        id: 'jane-energie',
        title: 'Développeur Front-End',
        company: 'Jane Énergie',
        period: '2025 — 2026',
        type: 'full-time',
        description: [
          "Définition et mise en place de l'architecture front-end",
          "Création d'un design system from scratch",
          "Mise en place d'un workflow Git structuré (CI/CD, gestion des branches)",
          'Standardisation du code améliorant la maintenabilité et la collaboration',
          "Déploiement de bonnes pratiques au sein de l'équipe",
        ],
      },
      {
        id: 'checkmyguest',
        title: 'Développeur Front-End',
        company: 'CheckMyGuest',
        period: '2022 — 2024',
        type: 'full-time',
        description: [
          "Conception et déploiement d'un design system scalable utilisé par plusieurs équipes",
          'Mise en place de tests de non-régression visuelle (Storybook + Chromatic)',
          'Développement de composants en atomic design',
          'Amélioration de la maintenabilité du code et de la collaboration entre équipes',
          "Supervision et accompagnement d'une équipe internationale (4 devs)",
        ],
      },
      {
        id: 'credit-agricole',
        title: 'Apprenti Développeur',
        company: 'Crédit Agricole Assurances',
        period: '2020 — 2022',
        type: 'apprenticeship',
        description: [
          'Développement back-end (C#, .NET)',
          "Déploiement d'applications sur la plateforme Sharepoint",
          "Développement d'un serveur API REST",
          'Gestion de versions de code (GitLab)',
          "Conception et développement de solutions et d'application intranet",
        ],
      },
      {
        id: 'ratp',
        title: 'Apprenti Ingénieur IoT',
        company: 'RATP',
        period: '2019 — 2020',
        type: 'apprenticeship',
        description: [
          'Rédaction de scripts python',
          'Analyse de data en temps réel',
          'Mise en place de capteurs connectés sur le réseau ferroviaire',
        ],
      },
    ],
    education: [
      {
        id: 'esiea',
        degree: "Diplôme d'Ingénieur du Numérique",
        school: 'ESIEA Paris',
        period: '2019 — 2022',
        specialization: 'Majeur Software Engineering',
      },
      {
        id: 'iut',
        degree: 'DUT Génie Électrique et Informatique Industrielle',
        school: 'IUT de Créteil Vitry',
        period: '2017 — 2019',
      },
    ],
    projects: [
      {
        id: 'aerin-studio',
        title: 'Co-Fondateur',
        company: 'Aerin Studio',
        period: '2026 — Présent',
        description: [
          'Développement et personnalisation du site e-commerce Shopify',
          "Intégration front-end et optimisation de l'expérience utilisateur mobile et desktop",
          "Participation à la direction artistique et à l'identité visuelle de la marque",
          'Retouche et montage des visuels produits et contenus marketing',
          "Collaboration sur le branding, l'univers visuel et la cohérence des interfaces",
        ],
        tags: ['Shopify', 'Front-End', 'Direction Artistique', 'Branding', 'UI/UX'],
      },
    ],
    languages: [
      { name: 'Français', level: 'Langue maternelle' },
      { name: 'Anglais', level: 'TOEIC 925' },
      { name: 'Vietnamien', level: 'Notions' },
    ],
    interests: [
      { name: 'Musique', description: 'Compositeur, interprète', icon: '🎵' },
      { name: 'Audiovisuel', description: 'Montage vidéo et photographie', icon: '📷' },
    ],
  },

  // ── Contact page ─────────────────────────────────────────────
  contact: {
    title: 'Travaillons ensemble',
    emailLabel: 'Mon adresse email',
    emailCta: 'Envoyer un email',
    emailCopied: 'Email copié !',
    emailItemLabel: 'Email',
    phoneItemLabel: 'Téléphone',
    locationItemLabel: 'Localisation',
    copyright: `© ${new Date().getFullYear()} Kévin Nguyen — Tous droits réservés`,
    builtWith: 'Next.js · TypeScript · Framer Motion',
  },

  // ── Profile section ──────────────────────────────────────────
  profile: {
    languagesHeading: 'Langues',
    interestsHeading: "Centres d'intérêt",
  },

  // ── Tech: AI Workflow ────────────────────────────────────────
  aiWorkflow: {
    section: {
      number: '01',
      label: 'IA & Workflow',
      title: 'Productivité augmentée',
      subtitle: "J'intègre Cursor et Claude Code dans mon workflow quotidien pour automatiser les tâches répétitives et me concentrer sur ce qui crée de la valeur.",
    },
    productivityLabel: 'Gain de productivité estimé',
    productivityDesc: 'plus productif sur les tâches récurrentes de développement',
    workflow: [
      {
        title: 'Audits de code',
        desc: 'Détection automatique des bugs, anti-patterns et dérives qualité avant chaque merge.',
        metricLabel: 'de temps sur les revues',
      },
      {
        title: 'Rédaction de tests',
        desc: "Génération de tests unitaires et e2e couvrant les cas limites identifiés à l'audit.",
        metricLabel: 'plus de couverture de code',
      },
      {
        title: 'Optimisations',
        desc: 'Analyse du bundle, des perfs de rendu et des requêtes réseau pour livrer plus vite.',
        metricLabel: 'de gains de performance',
      },
      {
        title: 'Pull Requests',
        desc: 'Descriptions générées, review assistée et suggestions de refactor dans le cycle PR.',
        metricLabel: 'sur le cycle de merge',
      },
    ],
  },

  // ── Tech: API ────────────────────────────────────────────────
  api: {
    section: {
      number: '04',
      label: 'API REST',
      title: 'Démo API',
      subtitle: 'Route handlers Next.js qui exposent les données du portfolio. Cliquez sur un endpoint pour exécuter un fetch en direct.',
    },
    idleText: 'Sélectionnez un endpoint',
    errorLabel: 'Erreur',
    endpoints: [
      { label: 'Portfolio',    desc: 'Intégralité des données du portfolio.' },
      { label: 'Expériences',  desc: 'Liste des expériences professionnelles.' },
      { label: 'Compétences',  desc: 'Catégories de compétences techniques.' },
      { label: 'Formation',    desc: 'Parcours académique et diplômes.' },
      { label: 'Projets',      desc: 'Side projects et réalisations.' },
    ],
  },

  // ── Tech: Architecture ───────────────────────────────────────
  architecture: {
    section: {
      number: '05',
      label: 'Architecture',
      title: 'Design atomique',
      subtitle: "L'UI suit le pattern Atomic Design — chaque niveau est indépendant, testable, et réutilisable dans plusieurs contextes.",
    },
    layers: [
      { label: 'Atomes',    description: 'Briques élémentaires — aucune logique applicative' },
      { label: 'Molécules', description: "Combinaisons d'atomes avec une responsabilité unique" },
      { label: 'Organismes', description: 'Sections autonomes composées de molécules' },
      { label: 'Templates', description: 'Mise en page structurelle — pas de données en dur' },
      { label: 'Pages',     description: "Routes Next.js — assemblage final avec données réelles" },
    ],
    stats: [
      { label: 'Atomes' },
      { label: 'Molécules' },
      { label: 'Organismes' },
      { label: 'Pages' },
    ],
    demoLabel: 'Démo interactive',
    demoSteps: [
      { label: 'Assemblé',  desc: "L'UI telle que l'utilisateur la voit — aucune couture visible entre les niveaux." },
      { label: 'Organisme', desc: "Orchestre une liste d'items génériques et délègue le rendu de chacun via une render prop." },
      { label: 'Molécule',  desc: 'Assemble Badge + GradientText + textes à partir de props visuelles — sans couplage au domaine.' },
      { label: 'Atomes',    desc: 'Briques indivisibles — chacune vit dans sa propre logique, réutilisée partout.' },
    ],
  },

  // ── Tech: Storybook ──────────────────────────────────────────
  storybook: {
    section: {
      number: '06',
      label: 'Storybook',
      title: 'Bibliothèque de composants',
      subtitle: "Chaque composant est documenté et isolé — variants, props, états interactifs et données d'exemple réalistes.",
    },
    atomsLabel: 'Atomes',
    moleculesLabel: 'Molécules',
    exploreTitle: 'Explorer le Storybook complet',
    exploreLaunch: 'Lancer en local :',
    exploreRepoBtn: 'Voir le repo',
    showcaseDescriptions: [
      'Bouton primaire (gradient) ou secondaire (outline) ; accepte href ou onClick.',
      'Étiquette inline pour typer un contenu : accent violet, cyan ou neutre.',
      'Chip technologie utilisé dans les cartes de projets et compétences.',
      'Span avec dégradé violet → cyan, utilisé pour les titres et noms clés.',
      'Carte avec badge, période, titre, sous-titre et liste de points. Utilisé dans les Timelines.',
      'Carte avec tilt 3D au survol, liste de réalisations et tags technologiques.',
      'Carte de formation avec icône diplôme, institution, titre et détail optionnel.',
      'Ligne de contact avec icône, label et valeur — cliquable si un href est fourni.',
      'Bento card avec icône emoji, nom de catégorie et liste de tags technologiques.',
    ],
  },

  // ── Tech: Tests ──────────────────────────────────────────────
  tests: {
    section: {
      number: '02',
      label: 'Tests & Qualité',
      title: 'Couverture de tests',
      subtitle: 'Tests unitaires sur les atomes, molécules et hooks — tests E2E sur les flux utilisateur critiques. Exécutés en CI à chaque push.',
    },
    totalLabel: 'tests au total',
    filesLabel: 'fichiers de tests',
    passingLabel: '% passing',
    vitestLabel: 'Vitest + React Testing Library',
    playwrightLabel: 'Playwright E2E',
    ghActionsBtn: 'Voir les actions GitHub',
    unitSuiteTests: [
      [
        "démarre en mode sombre par défaut",
        "détecte le mode clair depuis la classe html (anti-flash)",
        "toggle → mode clair + classe + localStorage",
        "toggle → mode sombre, supprime la classe",
        "deux toggles consécutifs reviennent à l'état initial",
      ],
      [
        "rend un <a> quand href est fourni",
        "rend un <button> quand href est absent",
        "classe btn--primary par défaut",
        "classe btn--secondary avec variant secondary",
        'rel="noopener noreferrer" sur target _blank',
        "pas de rel quand target n'est pas _blank",
      ],
      [
        "affiche son contenu",
        "variante dim par défaut",
        "badge--accent avec variant accent",
        "badge--cyan avec variant cyan",
      ],
      [
        "affiche son contenu",
        "applique la classe chip",
      ],
      [
        "affiche le numéro watermark",
        "affiche le label avec le numéro",
        "affiche le titre en h2",
        "affiche le subtitle quand fourni",
        "n'affiche pas de subtitle quand absent",
      ],
      [
        "affiche badge, titre, sous-titre et période",
        "affiche tous les points de la liste",
        "affiche le badge passé en prop",
      ],
      [
        "affiche le label et la valeur",
        "rend un lien cliquable quand href fourni",
        "ne rend pas de lien quand href absent",
        "affiche l'icône",
      ],
      [
        'GET /api/portfolio — retourne 200',
        'retourne les 5 clés principales',
        'personalInfo contient name et email',
        'GET /api/portfolio/experiences — retourne 200',
        'retourne un tableau de 4 expériences',
        'chaque expérience a un id, company et type valide',
        'GET /api/portfolio/skills — retourne 200',
        'retourne 4 catégories avec id, name et skills[]',
        'GET /api/portfolio/education — retourne 200',
        'retourne 2 formations avec id et degree',
        'GET /api/portfolio/projects — retourne 200',
        'retourne 1 projet avec tags[]',
      ],
    ],
    e2eSuiteLabels: ['Thème dark/light', 'Navigation'],
    e2eSuiteTests: [
      [
        "charge en mode sombre par défaut",
        "toggle passe en mode clair",
        "toggle repasse en mode sombre",
        "thème persiste après rechargement de page",
        "localStorage contient le bon thème",
      ],
      [
        "header visible dès le chargement",
        "logo pointe vers #home",
        "lien Expériences → #experience",
        "clic scroll vers la section",
        "bouton email visible et cliquable sur la page contact",
        "CTA Me contacter → #contact",
      ],
    ],
  },

  // ── Tech: TestsDashboard ─────────────────────────────────────
  testsDashboard: {
    section: {
      number: '03',
      label: 'Quality Report',
      title: 'Dashboard qualité',
      subtitle: 'Score global, pipeline CI/CD et couverture par composant — vue complète de la fiabilité du code.',
    },
    tabs: [
      { label: 'Vue globale' },
      { label: 'Score qualité' },
      { label: 'Pipeline' },
      { label: 'Couverture' },
      { label: 'Pourquoi ?' },
    ],
    qualityItems: [
      {
        label: 'Couverture', desc: 'Tous les fichiers source testés',
        popover: {
          title: 'Couverture de code',
          body: 'Tous les fichiers source publics ont au minimum un test unitaire, mesurée via @vitest/coverage-v8.',
          items: ['46 suites · 252 tests au total', 'App · Atoms · Molecules · Organisms · Hooks · Service · Lib', 'E2E et benchmarks Organisms restent à compléter'],
        },
      },
      {
        label: 'Accessibilité', desc: 'Score WCAG 2A/2AA via axe-core',
        popover: {
          title: 'Score accessibilité',
          body: '0 violation critique détectée sur les 3 pages testées, conforme au standard WCAG 2.1 Niveau AA.',
          items: ['9 tests unitaires via axe-core', '5 tests E2E dark + 5 tests E2E light', 'Alt texts + rôles ARIA vérifiés'],
        },
      },
      {
        label: 'Performance', desc: 'LCP, CLS, TTFB dans les cibles',
        popover: {
          title: 'Web Vitals',
          body: "Core Web Vitals mesurés via PerformanceObserver dans Playwright sur la page d'accueil en local.",
          items: ['LCP < 2.5s ✓ · CLS < 0.1 ✓', 'TTFB < 500ms ✓ · API < 200ms ✓', 'FCP non mesuré → 12pts manquants'],
        },
      },
      {
        label: 'Densité', desc: 'Tests par composant exposé',
        popover: {
          title: 'Densité de tests',
          body: "Ratio entre le nombre total de tests et les composants publics exposés dans l'application.",
          items: ['~10 tests / composant en moyenne', '6 types de tests différents', 'E2E Organisms + benchmarks à compléter'],
        },
      },
    ],
    globalStats: [
      { label: 'Tests',         sub: '6 types · 0 skip' },
      { label: 'Échecs',        sub: 'Pipeline vert' },
      { label: 'Score qualité', sub: 'Moyenne 4 axes' },
      { label: 'Cov. min',      sub: 'Tous fichiers couverts' },
    ],
    qualityAxesLabel: 'Axes qualité',
    globalGradeLabel: 'Mention globale · moyenne des 4 axes',
    pipelineCiLabel: 'Pipeline CI/CD',
    pipelineGreenBadge: '6/6 vert',
    pipelineSummaryTemplate: '{tests} tests · {total} total',
    pipelineTimestamp: "main · il y a 2h",
    coverageAtomicLabel: 'Couverture par couche atomique',
    coverageWeakPrefix: 'Point faible :',
    coverageWeakHighlight: 'Organisms 12%',
    pipelineStatsLabels: ['Durée totale', 'Tests exécutés', 'Statut'],
    pipelineGanttLabel: 'Répartition du temps CI',
    pipelineSlowestTemplate: "est l'étape la plus longue",
    pipelineDetails: [
      'TypeScript strict + ESLint — 0 erreur',
      '46 fichiers · 252 tests · App · Atoms · Molecules · Organisms · Hooks · Service · Lib',
      '5 routes REST · données mockées',
      'axe-core + Playwright · dark & light mode · WCAG 2A + 2AA',
      'Playwright · 3 pages · navigation + contenu',
      'LCP < 2.5s · CLS < 0.1 · TTFB < 500ms',
    ],
    coverageLayerLabel: 'Par couche atomique',
    coverageGapsLabel: 'Lacunes identifiées',
    coverageComponentLabel: 'Par composant',
    coveredLabel: 'couvert',
    notCoveredLabel: 'non couvert',
    componentColLabel: 'Composant',
    covColLabel: 'Cov.',
    missingLabel: 'manquant',
    coverageGapNotes: [
      'Tests unitaires couverts (252 tests). E2E et benchmarks à compléter pour une couverture totale.',
      'Uniquement couvert en accessibilité. 2-3 tests unitaires seraient suffisants.',
      'E2E et benchmark manquants. Composant fréquemment utilisé.',
      'Hook sans rendu direct — A11y non applicable, Bench optionnel.',
    ],
    priorityMeta: { high: 'Critique', medium: 'Modéré', low: 'Faible' },
    improvementsLabel: "Axes d'amélioration",
    improvementItems: [
      { action: 'Tests E2E & Bench Organisms',  detail: '15 Organisms couverts en unitaire. E2E et benchmarks manquants pour compléter la densité.' },
      { action: 'Mesurer FCP & TTI',            detail: 'First Contentful Paint et Time to Interactive non encore mesurés.' },
      { action: 'Tests de navigation clavier',  detail: 'Focus trap, ordre de tabulation et raccourcis clavier à valider.' },
    ],
    priorityLabels: { high: 'Priorité haute', medium: 'Priorité moyenne', low: 'Faible impact' },
    scoreCalcNote: "Score calculé comme la moyenne des 4 axes. Chaque point gagné sur la couverture ou la densité a le plus fort impact sur le score global.",
    whyAnglesLabel: '6 angles de tir',
    whyReasonItems: [
      {
        title: 'Déployer sans peur',
        statSuffix: 'régression',
        statLabel: 'non détectée en production',
        body: 'Un pipeline vert = un code déployable. Fini les vérifications manuelles avant chaque release : si les 252 tests passent, on ship.',
      },
      {
        title: 'Corriger au plus tôt',
        statSuffix: '',
        statLabel: "moins cher à corriger en dev qu'en prod",
        body: "Un bug attrapé par un test se corrige en minutes. Détecté en production, il coûte un hotfix, un rollback, et parfois une nuit blanche.",
      },
      {
        title: 'Documentation vivante',
        statSuffix: 'cas',
        statLabel: 'de comportement spécifiés',
        body: "Chaque test décrit ce qu'un composant doit faire. Contrairement aux commentaires, les tests ne mentent pas : si le code change, le test échoue.",
      },
      {
        title: 'Refactoriser librement',
        statSuffix: '',
        statLabel: 'des couches refactorisables en confiance',
        body: "Changer l'implémentation sans toucher les tests valide que le comportement est préservé. Les tests testent le quoi, pas le comment.",
      },
    ],
    whyTestItems: [
      {
        tool: 'Vitest + Testing Library',
        points: [
          'Rendu de chaque composant selon ses props et son état',
          'Interactions : clics, saisie, toggle, navigation',
          'Hooks et service — logique métier isolée du DOM',
        ],
      },
      {
        tool: 'axe-core + Playwright',
        points: [
          'Conformité WCAG 2A et 2AA — 0 violation critique',
          'Rôles ARIA, alt texts, hiérarchie des titres',
          'Dark mode et light mode vérifiés indépendamment',
        ],
      },
      {
        tool: 'Vitest + fetch mock',
        points: [
          '5 routes REST : codes HTTP et structure JSON',
          'Erreurs réseau et cas limites gérés',
          'Cohérence des données retournées par chaque endpoint',
        ],
      },
      {
        tool: 'Playwright',
        points: [
          'Navigation complète sur les 3 pages en conditions réelles',
          'Rendu des sections clés dans un vrai navigateur Chromium',
          'Ancres, liens actifs et scroll behavior vérifiés',
        ],
      },
      {
        tool: 'PerformanceObserver + Playwright',
        points: [
          'LCP < 2.5s · CLS < 0.1 · TTFB < 500ms',
          'Temps de réponse API < 200ms mesuré en local',
          "Core Web Vitals sur la page d'accueil et tech",
        ],
      },
      {
        tool: 'Vitest bench',
        points: [
          'Temps de rendu des atoms et molecules (cible < 1ms)',
          'Benchmarks comparatifs entre variantes de composants',
          'Détection de régressions de performance à la compilation',
        ],
      },
    ],
  },
};
