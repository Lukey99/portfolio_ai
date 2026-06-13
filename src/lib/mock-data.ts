import type { Portfolio } from '@/types/portfolio.types';

export const portfolioData: Portfolio = {
  personalInfo: {
    name: 'Kévin Nguyen',
    title: 'Développeur Front End',
    description:
      "Développeur front-end spécialisé en création d'interfaces scalables et performantes (React / Vue), avec une forte exigence sur le pixel perfect et l'expérience utilisateur. Expérience dans la mise en place de design systems et l'amélioration des workflows d'équipe.",
    phone: '07 77 69 01 82',
    email: 'kevinngn.2802@gmail.com',
    location: 'Montlhéry, 91',
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
  skills: [
    {
      id: 'stack',
      name: 'Stack',
      icon: '⚡',
      skills: ['Vue', 'React', 'Next.js', 'TypeScript', 'Nuxt', 'Node.js'],
    },
    {
      id: 'ui-design',
      name: 'UI / Design',
      icon: '✦',
      skills: ['Storybook', 'TailwindCSS', 'Chromatic', 'Figma Dev Tools'],
    },
    {
      id: 'tools',
      name: 'Tools',
      icon: '◈',
      skills: ['Git', 'Docker'],
    },
    {
      id: 'ide',
      name: 'IDE',
      icon: '◎',
      skills: ['Cursor', 'VSCode'],
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
};
