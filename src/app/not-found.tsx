import Link from 'next/link';

export default function NotFound() {
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
      {/* Orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div
          className="orb orb--violet"
          style={{ width: '600px', height: '600px', top: '5%', right: '-15%', opacity: 0.5 }}
        />
        <div
          className="orb orb--cyan"
          style={{ width: '400px', height: '400px', bottom: '5%', left: '-10%', opacity: 0.35 }}
        />
      </div>

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, maxWidth: '480px' }}>
        {/* Watermark */}
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
            whiteSpace: 'nowrap',
          }}
        >
          404
        </div>

        <p
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(var(--fg-rgb), 0.35)',
            marginBottom: '1.25rem',
          }}
        >
          Erreur 404
        </p>

        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: 'var(--fg)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}
        >
          Page introuvable
        </h1>

        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(var(--fg-rgb), 0.45)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          Cette page n&apos;existe pas ou a été déplacée.
        </p>

        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.875rem 2rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(139,92,246,0.3)',
          }}
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
