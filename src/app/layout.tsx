import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/styles/animations.scss';
import { Header } from '@/components/organisms/Header';
import { CustomCursor } from '@/components/organisms/CustomCursor';
import { LocaleProvider } from '@/contexts/LocaleContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Kévin Nguyen — Développeur Front End',
  description:
    "Développeur front-end spécialisé en création d'interfaces scalables et performantes (React / Vue). Expérience dans la mise en place de design systems et l'amélioration des workflows d'équipe.",
  keywords: ['développeur front-end', 'React', 'Vue', 'TypeScript', 'Next.js', 'design system'],
  authors: [{ name: 'Kévin Nguyen' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Anti-flash: apply stored theme before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light');}catch(e){}` }} />
      </head>
      <body suppressHydrationWarning>
        <LocaleProvider>
          <CustomCursor />
          <Header />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
