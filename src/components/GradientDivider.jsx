import React from 'react';

const GradientDivider = ({ height = 2 }) => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        height: Math.max(1, height),
        width: '100%',
        overflow: 'visible',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.95) 20%, rgba(168,85,247,0.95) 52%, rgba(236,72,153,0.95) 80%, transparent 100%)',
          opacity: 0.95,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '50%',
          height: Math.max(6, height * 6),
          transform: 'translateY(-50%)',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.5) 20%, rgba(168,85,247,0.5) 52%, rgba(236,72,153,0.5) 80%, transparent 100%)',
          filter: 'blur(10px)',
          opacity: 0.55,
        }}
      />
    </div>
  );
};

export default GradientDivider;

