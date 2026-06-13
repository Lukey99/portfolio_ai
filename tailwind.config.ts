import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#060609',
        'bg-card': 'rgba(255, 255, 255, 0.035)',
        'border-dim': 'rgba(255, 255, 255, 0.08)',
        'accent-violet': '#8b5cf6',
        'accent-cyan': '#22d3ee',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'orb-float-1': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.05)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.95)' },
        },
        'orb-float-2': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-50px, 40px) scale(0.9)' },
          '66%': { transform: 'translate(30px, -20px) scale(1.1)' },
        },
        'cursor-pulse': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.8' },
          '50%': { transform: 'translate(-50%, -50%) scale(1.2)', opacity: '0.4' },
        },
      },
      animation: {
        'orb-1': 'orb-float-1 20s ease-in-out infinite',
        'orb-2': 'orb-float-2 17s ease-in-out infinite',
        'cursor-pulse': 'cursor-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
