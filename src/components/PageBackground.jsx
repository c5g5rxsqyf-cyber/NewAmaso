import React from 'react';
import { motion } from 'framer-motion';

const PageBackground = ({ mode = 'fixed' }) => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: mode,
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#050505',
      }}
    >
      {/* Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.55,
          mixBlendMode: 'screen',
        }}
      />

      {/* Moving Color Wash */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [0.9, 1.12, 0.9],
          opacity: [0.55, 0.95, 0.55],
        }}
        transition={{
          rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
          scale: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          position: 'absolute',
          inset: '-30%',
          background:
            'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.22), transparent 32%), radial-gradient(circle at 78% 28%, rgba(168,85,247,0.26), transparent 30%), radial-gradient(circle at 55% 70%, rgba(236,72,153,0.24), transparent 34%), radial-gradient(circle at 42% 60%, rgba(16,185,129,0.16), transparent 36%)',
          filter: 'blur(55px)',
          mixBlendMode: 'screen',
          transformOrigin: '50% 50%',
          opacity: 0.75,
          willChange: 'transform',
        }}
      />

      {/* Soft falloff */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 40%, rgba(5,5,5,0.35), rgba(5,5,5,0.55) 38%, rgba(5,5,5,0.82) 62%, rgba(0,0,0,0.96) 100%)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Gentle top/bottom fades to avoid hard edges at section boundaries */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 18%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.65) 100%)',
          opacity: 0.55,
        }}
      />

      {/* Subtle center glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '28%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '520px',
          height: '520px',
          background:
            'radial-gradient(circle, rgba(99,102,241,0.22), rgba(168,85,247,0.12), rgba(0,0,0,0))',
          filter: 'blur(110px)',
        }}
      />
    </div>
  );
};

export default PageBackground;
