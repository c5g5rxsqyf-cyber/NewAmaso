import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ClickUpArchitects from './ClickUpArchitects';
import MicrosoftEcosystem from './MicrosoftEcosystem';

const slides = [
  { key: 'microsoft', label: 'Microsoft', hash: '#microsoft', component: MicrosoftEcosystem },
  { key: 'clickup', label: 'ClickUp', hash: '#blueprints', component: ClickUpArchitects },
];

const unifiedBackground =
  'radial-gradient(circle at 18% 35%, rgba(34,211,238,0.14), transparent 55%), radial-gradient(circle at 36% 70%, rgba(250,204,21,0.10), transparent 56%), radial-gradient(circle at 52% 30%, rgba(236,72,153,0.10), transparent 58%), radial-gradient(circle at 72% 35%, rgba(99,102,241,0.12), transparent 56%), radial-gradient(circle at 86% 70%, rgba(168,85,247,0.12), transparent 58%), linear-gradient(90deg, rgba(34,211,238,0.04), rgba(236,72,153,0.04), rgba(99,102,241,0.04))';

function indexFromHash(hash) {
  const normalized = (hash || '').toLowerCase();
  const idx = slides.findIndex((s) => s.hash === normalized);
  return idx >= 0 ? idx : 0;
}

const EcosystemSlideshow = () => {
  const [index, setIndex] = useState(() => indexFromHash(window.location.hash));
  const [direction, setDirection] = useState(1);
  const fromIndexRef = useRef(index);
  const [isSliding, setIsSliding] = useState(false);

  const active = slides[index] ?? slides[0];

  useEffect(() => {
    const onHashChange = () => {
      const next = indexFromHash(window.location.hash);
      setDirection(next >= index ? 1 : -1);
      fromIndexRef.current = index;
      setIndex(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [index]);

  const goTo = (nextIndex) => {
    const clamped = Math.max(0, Math.min(slides.length - 1, nextIndex));
    if (clamped === index) return;
    setDirection(clamped > index ? 1 : -1);
    fromIndexRef.current = index;
    setIndex(clamped);
    const nextHash = slides[clamped]?.hash;
    if (nextHash) history.replaceState(null, '', nextHash);
  };

  const edgeFadePx = 180;
  const maskForRole = (role) => {
    if (!isSliding) return undefined;
    if (direction >= 0) {
      // Going to next (incoming from right): outgoing fades on right, incoming fades on left
      if (role === 'outgoing') {
        return `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - ${edgeFadePx}px), rgba(0,0,0,0) 100%)`;
      }
      return `linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) ${edgeFadePx}px, rgba(0,0,0,1) 100%)`;
    }
    // Going to prev (incoming from left): outgoing fades on left, incoming fades on right
    if (role === 'outgoing') {
      return `linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) ${edgeFadePx}px, rgba(0,0,0,1) 100%)`;
    }
    return `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(100% - ${edgeFadePx}px), rgba(0,0,0,0) 100%)`;
  };

  const nav = useMemo(
    () => (
      <div
        role="tablist"
        aria-label="Ecosystem slideshow"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          position: 'relative',
          top: '120px',
          marginBottom: '134px',
          flexWrap: 'wrap',
        }}
      >
        {slides.map((s, i) => {
          const selected = i === index;
          return (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => goTo(i)}
              style={{
                padding: '10px 14px',
                borderRadius: '999px',
                border: `1px solid ${selected ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.12)'}`,
                background: selected ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                color: '#fff',
                fontWeight: 700,
                letterSpacing: '0.2px',
                transition: 'transform 0.15s, background 0.15s, border-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0px)')}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    ),
    [index]
  );

  return (
    <section style={{ position: 'relative' }}>
      {/* Anchors so existing links keep working */}
      <div id="blueprints" style={{ position: 'absolute', top: '-80px' }} />
      <div id="microsoft" style={{ position: 'absolute', top: '-80px' }} />

      {nav}

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* One unified horizontal background for all slides */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: unifiedBackground,
            opacity: 0.95,
            // Fade edges to blend into neighboring sections (no black strip: this is alpha masking).
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, transparent 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, transparent 100%)',
          }}
        />

        <motion.div
          style={{
            display: 'flex',
            gap: '0px',
            willChange: 'transform',
            position: 'relative',
          }}
          animate={{ x: `-${index * 100}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Slides"
          onAnimationStart={() => setIsSliding(true)}
          onAnimationComplete={() => setIsSliding(false)}
        >
          {slides.map((s, i) => {
            const Slide = s.component;
            const outgoing = i === fromIndexRef.current;
            const incoming = i === index;
            const mask = outgoing ? maskForRole('outgoing') : incoming ? maskForRole('incoming') : undefined;
            return (
              <div
                key={s.key}
                data-slide="true"
                style={{
                  flex: '0 0 100%',
                  minWidth: 0,
                  position: 'relative',
                  WebkitMaskImage: mask,
                  maskImage: mask,
                }}
              >
                <Slide embedded />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default EcosystemSlideshow;
