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
        padding: 'var(--space-8)',
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
            lineHeight: 'var(--leading-tight)',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          404
        </div>

        <p
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(var(--fg-rgb), 0.35)',
            marginBottom: 'var(--space-5)',
          }}
        >
          Erreur 404
        </p>

        <h1
          style={{
            fontSize: 'var(--text-section)',
            fontWeight: 900,
            color: 'var(--fg)',
            letterSpacing: '-0.03em',
            lineHeight: 'var(--leading-tight)',
            marginBottom: 'var(--space-5)',
          }}
        >
          Page introuvable
        </h1>

        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'rgba(var(--fg-rgb), 0.45)',
            lineHeight: 1.7,
            marginBottom: 'var(--space-10)',
          }}
        >
          Cette page n&apos;existe pas ou a été déplacée.
        </p>

        <Link
          href="/"
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
