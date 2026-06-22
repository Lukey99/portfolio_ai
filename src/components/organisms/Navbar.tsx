'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { href: '#experience', label: 'Expériences' },
  { href: '#skills',     label: 'Compétences' },
  { href: '#projects',   label: 'Projets' },
  { href: '#education',  label: 'Formation' },
  { href: '#contact',    label: 'Contact' },
];

export function Navbar() {
  const [visible, setVisible]   = useState(false);
  const [active, setActive]     = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['experience', 'skills', 'projects', 'education', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 200 }}
          style={{ position: 'fixed', top: '1.25rem', left: '50%', transform: 'translateX(-50%)', zIndex: 50, width: 'calc(100% - 2rem)', maxWidth: '48rem' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.7rem 1.5rem',
            borderRadius: '1rem',
            background: 'rgba(6,6,9,0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
          }}>
            <a href="#home" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'rgba(232,232,238,0.9)', textDecoration: 'none' }}>
              KN<span style={{ color: '#a78bfa' }}>.</span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: '0.25rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActive(link.href)}
                  style={{
                    padding: '0.35rem 1rem',
                    borderRadius: '0.6rem',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease, background 0.2s ease',
                    color: active === link.href ? '#c4b5fd' : 'rgba(232,232,238,0.5)',
                    background: active === link.href ? 'rgba(139,92,246,0.15)' : 'transparent',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <a
                href="#contact"
                className="hidden md:inline-flex"
                style={{
                  alignItems: 'center', gap: '0.4rem',
                  padding: '0.45rem 1rem', borderRadius: '0.6rem',
                  fontSize: '0.78rem', fontWeight: 600, color: '#fff', textDecoration: 'none',
                  background: 'linear-gradient(135deg,#8b5cf6,#22d3ee)',
                }}
              >
                Me contacter
              </a>

              {/* Hamburger — mobile */}
              <button
                className="flex md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0.4rem', color: 'rgba(232,232,238,0.9)', alignItems: 'center',
                  borderRadius: '0.5rem',
                  transition: 'background 0.2s ease',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {menuOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="6"  x2="21" y2="6"  />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                style={{
                  marginTop: '0.5rem', borderRadius: '1rem', overflow: 'hidden',
                  background: 'rgba(6,6,9,0.96)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block', padding: '1rem 1.5rem',
                      fontSize: '0.9rem', fontWeight: 500, color: 'rgba(232,232,238,0.7)',
                      textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)',
                      transition: 'color 0.2s ease, background 0.2s ease',
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
