'use client';

import { useState, useCallback, useEffect } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { motion, AnimatePresence } from 'motion/react';
import { SectionTitle } from '@/components/molecules';
import { useReveal } from '@/hooks/useReveal';
import { useLocale } from '@/contexts/LocaleContext';

import { VIOLET, CYAN, V_MID, GREEN, AMBER, SLATE } from '@/lib/colors';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const ENDPOINTS_STATIC = [
  { id: 'all',         path: '/api/portfolio/all',         color: SLATE  },
  { id: 'experiences', path: '/api/portfolio/experiences', color: VIOLET },
  { id: 'skills',      path: '/api/portfolio/skills',      color: CYAN   },
  { id: 'education',   path: '/api/portfolio/education',   color: AMBER  },
  { id: 'projects',    path: '/api/portfolio/projects',    color: GREEN  },
] as const;

type EndpointId = typeof ENDPOINTS_STATIC[number]['id'];
type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'done'; data: unknown; ms: number }
  | { status: 'error'; message: string };

// ── JSON syntax highlighter ───────────────────────────────────

const TOKEN_RE = /("(?:[^"\\]|\\.)*"(?=\s*:))|("(?:[^"\\]|\\.)*")|([-\d.]+(?:[eE][+-]?\d+)?)|(\btrue\b|\bfalse\b|\bnull\b)|([{}[\],:])/g;

const TOKEN_COLORS: Record<string, string> = {
  key:     V_MID,
  string:  '#86efac',
  number:  '#fb923c',
  keyword: CYAN,
  punct:   'rgba(var(--fg-rgb), 0.3)',
};

function JsonView({ data }: { data: unknown }) {
  const text = JSON.stringify(data, null, 2);
  const nodes: React.ReactNode[] = [];
  let last = 0;

  for (const m of text.matchAll(TOKEN_RE)) {
    if (m.index! > last) nodes.push(text.slice(last, m.index));
    const [full, key, str, num, kw] = m;
    const type = key ? 'key' : str ? 'string' : num ? 'number' : kw ? 'keyword' : 'punct';
    nodes.push(
      <span key={m.index} style={{ color: TOKEN_COLORS[type] }}>
        {full}
      </span>
    );
    last = m.index! + full.length;
  }
  if (last < text.length) nodes.push(text.slice(last));

  return (
    <pre className="text-mono" style={{ margin: 0, fontSize: 'var(--text-xs)', lineHeight: 1.75, color: 'rgba(var(--fg-rgb), 0.55)' }}>
      {nodes}
    </pre>
  );
}

function LoadingDots() {
  return (
    <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', padding: '2rem' }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
          style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(var(--fg-rgb), 0.3)' }}
        />
      ))}
    </div>
  );
}

export function ApiSection() {
  const ref       = useReveal();
  const { t }     = useLocale();
  const isMobile  = useIsMobile();
  const [activeId, setActiveId]     = useState<EndpointId>('all');
  const [fetchState, setFetchState] = useState<FetchState>({ status: 'idle' });

  const ENDPOINTS = ENDPOINTS_STATIC.map((ep, i) => ({
    ...ep,
    label: t.api.endpoints[i].label,
    desc:  t.api.endpoints[i].desc,
  }));

  const active = ENDPOINTS.find(ep => ep.id === activeId)!;

  const fetchEndpoint = useCallback(async (path: string) => {
    setFetchState({ status: 'loading' });
    const t0 = performance.now();
    try {
      const res  = await fetch(BASE_PATH + path);
      const data = await res.json();
      setFetchState({ status: 'done', data, ms: Math.round(performance.now() - t0) });
    } catch (e) {
      setFetchState({ status: 'error', message: String(e) });
    }
  }, []);

  const handleSelect = useCallback((ep: typeof ENDPOINTS[number]) => {
    setActiveId(ep.id);
    fetchEndpoint(ep.path);
  }, [fetchEndpoint]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchEndpoint(ENDPOINTS_STATIC[0].path);
  }, [fetchEndpoint]);

  return (
    <section id="api" ref={ref} className="section">
      <div className="container--wide">
        <SectionTitle
          number={t.api.section.number}
          label={t.api.section.label}
          title={t.api.section.title}
          subtitle={t.api.section.subtitle}
        />

        {/* Dark terminal panel — CSS variable overrides must stay inline to scope dark theme */}
        <div style={{
          borderRadius: '1.25rem',
          border: '1px solid rgba(255,255,255,0.08)',
          background: '#0d0d12',
          overflow: 'hidden',
          '--overlay-rgb': '255,255,255',
          '--fg-rgb': '232,232,238',
          '--fg': '#e8e8ee',
          '--card-bg': '#111118',
          '--card-bg-hover': '#1a1a24',
        } as React.CSSProperties}>

          {/* Top bar — URL */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.9rem 1.5rem',
            borderBottom: '1px solid rgba(var(--overlay-rgb), 0.07)',
            background: 'rgba(var(--overlay-rgb), 0.025)',
            minWidth: 0,
          }}>
            <span style={{
              fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em',
              padding: '0.2rem 0.55rem', borderRadius: '4px',
              background: 'rgba(34,211,238,0.12)', color: '#22d3ee',
              border: '1px solid rgba(34,211,238,0.22)', fontFamily: 'monospace',
              flexShrink: 0,
            }}>
              GET
            </span>
            <span style={{ fontSize: 'var(--text-sm)', fontFamily: 'monospace', color: 'rgba(var(--fg-rgb), 0.55)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0 }}>
              {!isMobile && <span style={{ color: 'rgba(var(--fg-rgb), 0.5)' }}>localhost:3000</span>}
              <span style={{ color: active.color, fontWeight: 600 }}>{active.path}</span>
            </span>

            <div style={{ flexShrink: 0 }} />

            <AnimatePresence mode="wait">
              {fetchState.status === 'done' && (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <div className="status-dot status-dot--green" />
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: '#4ade80', fontFamily: 'monospace' }}>
                    200 OK
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'rgba(var(--fg-rgb), 0.55)', fontFamily: 'monospace' }}>
                    {fetchState.ms}ms
                  </span>
                </motion.div>
              )}
              {fetchState.status === 'error' && (
                <motion.div
                  key="err"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f87171' }} />
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: '#f87171', fontFamily: 'monospace' }}>
                    {t.api.errorLabel}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', minHeight: isMobile ? 'auto' : '420px' }}>

            {/* LEFT — endpoint list */}
            <div style={{
              borderRight: isMobile ? 'none' : '1px solid rgba(var(--overlay-rgb), 0.07)',
              borderBottom: isMobile ? '1px solid rgba(var(--overlay-rgb), 0.07)' : 'none',
              padding: isMobile ? '0.75rem 0' : '1rem 0',
            }}>
              <p style={{ padding: '0 1rem 0.65rem', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(var(--fg-rgb), 0.5)' }}>
                Endpoints
              </p>
              {ENDPOINTS.map(ep => {
                const isActive = activeId === ep.id;
                return (
                  <motion.button
                    key={ep.id}
                    onClick={() => handleSelect(ep)}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '0.65rem 1rem', border: 'none', cursor: 'pointer',
                      background: isActive ? `${ep.color}12` : 'transparent',
                      borderLeft: `2px solid ${isActive ? ep.color : 'transparent'}`,
                      transition: 'background 0.15s, border-color 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
                      <span style={{ fontSize: '0.56rem', fontWeight: 700, color: isActive ? ep.color : 'rgba(var(--fg-rgb),0.55)', fontFamily: 'monospace' }}>GET</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: isActive ? 600 : 400, color: isActive ? 'var(--fg)' : 'rgba(var(--fg-rgb), 0.55)' }}>
                        {ep.label}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.64rem', color: 'rgba(var(--fg-rgb), 0.55)', lineHeight: 1.4 }}>{ep.desc}</p>
                  </motion.button>
                );
              })}
            </div>

            {/* RIGHT — response panel */}
            <div style={{ overflow: 'hidden', position: 'relative', minHeight: isMobile ? '220px' : '320px', maxHeight: isMobile ? '320px' : '480px' }}>
              <AnimatePresence mode="wait">
                {fetchState.status === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      height: '100%', minHeight: '320px', display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                      color: 'rgba(var(--fg-rgb), 0.25)',
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                    <p style={{ fontSize: 'var(--text-sm)' }}>{t.api.idleText}</p>
                  </motion.div>
                )}

                {fetchState.status === 'loading' && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '320px' }}
                  >
                    <LoadingDots />
                  </motion.div>
                )}

                {fetchState.status === 'done' && (
                  <motion.div
                    key={`done-${activeId}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ minHeight: '320px', maxHeight: '480px', overflowY: 'auto', padding: '1.25rem 1.5rem' }}
                  >
                    <JsonView data={fetchState.data} />
                  </motion.div>
                )}

                {fetchState.status === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ padding: '1.25rem 1.5rem', color: '#f87171', fontSize: 'var(--text-sm)', fontFamily: 'monospace' }}
                  >
                    {fetchState.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
