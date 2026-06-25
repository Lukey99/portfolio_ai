'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div
          className="orb orb--violet"
          style={{ width: '500px', height: '500px', top: '0%', right: '-10%', opacity: 0.3 }}
        />
      </div>

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '480px' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(8rem, 28vw, 18rem)',
            fontWeight: 900,
            color: 'rgba(var(--overlay-rgb), 0.03)',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          500
        </div>

        <p
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(248, 113, 113, 0.7)',
            marginBottom: '1.25rem',
          }}
        >
          Erreur inattendue
        </p>

        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: 'var(--fg)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}
        >
          Quelque chose s&apos;est mal passé
        </h2>

        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(var(--fg-rgb), 0.45)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          Une erreur inattendue s&apos;est produite. Essaie de recharger la page.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 2rem',
              borderRadius: '9999px',
              background: 'var(--gradient)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(139,92,246,0.3)',
            }}
          >
            Réessayer
          </button>
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.875rem 2rem',
              borderRadius: '9999px',
              color: 'rgba(var(--fg-rgb), 0.6)',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              border: '1px solid rgba(var(--overlay-rgb), 0.12)',
            }}
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}
