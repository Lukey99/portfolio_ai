import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kévin Nguyen — Développeur Front End',
    short_name: 'KN',
    description:
      "Portfolio de Kévin Nguyen, développeur front-end spécialisé en React / Vue et design systems.",
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#060609',
    theme_color: '#8b5cf6',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
