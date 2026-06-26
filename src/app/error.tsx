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
        padding: 'var(--space-8)',
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
            lineHeight: 'var(--leading-tight)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          500
        </div>

        <p
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(248, 113, 113, 0.7)',
            marginBottom: 'var(--space-5)',
          }}
        >
          Erreur inattendue
        </p>

        <h2
          style={{
            fontSize: 'var(--text-section)',
            fontWeight: 900,
            color: 'var(--fg)',
            letterSpacing: '-0.03em',
            lineHeight: 'var(--leading-tight)',
            marginBottom: 'var(--space-5)',
          }}
        >
          Quelque chose s&apos;est mal passé
        </h2>

        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'rgba(var(--fg-rgb), 0.45)',
            lineHeight: 1.7,
            marginBottom: 'var(--space-10)',
          }}
        >
          Une erreur inattendue s&apos;est produite. Essaie de recharger la page.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={reset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '0.875rem 2rem',
              borderRadius: '9999px',
              background: 'var(--gradient)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 'var(--text-md)',
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
              fontSize: 'var(--text-md)',
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
