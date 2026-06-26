'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/hooks/useTheme';
import { useLocale } from '@/contexts/LocaleContext';

const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

// Shared style for icon buttons in the header bar
// Hover states are handled by the .header-icon-btn CSS class in globals.css
const iconBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: '0.6rem',
  border: '1px solid rgba(var(--overlay-rgb), 0.1)',
  cursor: 'pointer',
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [clickedHref, setClickedHref] = useState<string | null>(null);
  const { theme, toggle } = useTheme();
  const { t, locale, setLocale } = useLocale();
  const pathname = usePathname();
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  const NAV_LINKS = [
    { href: '/', label: t.header.navPortfolio },
    { href: '/tech', label: t.header.navTech },
    { href: '/contact', label: t.header.navContact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setClickedHref(null);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      firstMenuLinkRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (clickedHref !== null) return clickedHref === href;
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '64px',
          background: scrolled ? 'var(--header-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(var(--overlay-rgb), 0.07)' : 'transparent'}`,
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <div
          style={{
            maxWidth: '90rem',
            margin: '0 auto',
            padding: '0 1.5rem',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: 'var(--text-base)',
              fontWeight: 700,
              color: 'var(--fg)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              flexShrink: 0,
            }}
          >
            KN<span style={{ color: 'var(--violet-mid)' }}>.</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: '0.15rem' }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setClickedHref(link.href)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '0.6rem',
                  fontSize: 'var(--text-md)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s ease, background 0.2s ease',
                  color: isActive(link.href) ? 'var(--violet-soft)' : 'rgba(var(--fg-rgb), 0.5)',
                  background: isActive(link.href) ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            {/* GitHub */}
            <a
              href="https://github.com/Lukey99"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="header-icon-btn"
              style={iconBtnStyle}
            >
              <GitHubIcon />
            </a>

            {/* Locale switcher */}
            <button
              onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
              aria-label={`Switch to ${locale === 'fr' ? 'English' : 'French'}`}
              className="header-icon-btn"
              style={{
                ...iconBtnStyle,
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                fontFamily: 'monospace',
              }}
            >
              {t.common.switchLocale}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? t.header.themeLight : t.header.themeDark}
              className="header-icon-btn"
              style={iconBtnStyle}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* CTA — desktop */}
            <Link
              href="/contact"
              className="hidden md:inline-flex"
              style={{
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.5rem 1.2rem',
                borderRadius: '9999px',
                fontSize: 'var(--text-md)',
                fontWeight: 600,
                color: '#fff',
                textDecoration: 'none',
                background: 'var(--gradient)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              {t.common.contactCta}
            </Link>

            {/* Hamburger — mobile */}
            <button
              className="flex md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? t.header.menuClose : t.header.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.4rem',
                color: 'var(--fg)',
                alignItems: 'center',
                borderRadius: '0.5rem',
                transition: 'background 0.2s ease',
              }}
            >
              <svg
                aria-hidden="true"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.header.menuOpen}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              zIndex: 49,
              background: 'var(--menu-bg)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(var(--overlay-rgb), 0.07)',
              padding: '1rem 1.5rem 1.5rem',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.18 }}
              >
                <Link
                  href={link.href}
                  ref={i === 0 ? firstMenuLinkRef : undefined}
                  style={{
                    display: 'block',
                    padding: '0.9rem 1rem',
                    marginBottom: '0.15rem',
                    fontSize: 'var(--text-base)',
                    fontWeight: 500,
                    textDecoration: 'none',
                    borderRadius: '0.75rem',
                    color: isActive(link.href) ? 'var(--violet-soft)' : 'rgba(var(--fg-rgb), 0.7)',
                    background: isActive(link.href) ? 'rgba(139, 92, 246, 0.12)' : 'transparent',
                    transition: 'color 0.2s ease, background 0.2s ease',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div
              style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(var(--overlay-rgb), 0.07)',
              }}
            >
              <Link
                href="/contact"
                style={{
                  display: 'block',
                  padding: '0.9rem 1rem',
                  textAlign: 'center',
                  fontSize: 'var(--text-md)',
                  fontWeight: 600,
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '0.75rem',
                  background: 'var(--gradient)',
                }}
              >
                {t.common.contactCta}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
