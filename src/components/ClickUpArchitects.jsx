import React from 'react';
import { motion } from 'framer-motion';
import { Boxes, Brain, GitBranch, Rocket } from 'lucide-react';

const cards = [
  {
    title: 'System Blueprinting',
    description:
      'We audit your chaos and draft the master plan. We structure your hierarchy, spaces, and views to match reality.',
    icon: <Boxes size={22} color="#fff" />,
    accent: 'rgba(99,102,241,0.35)',
  },
  {
    title: 'AI Neural Network',
    description:
      'We configure ClickUp Brain as your central intelligence, training Agents to handle knowledge retrieval and tasks.',
    icon: <Brain size={22} color="#fff" />,
    accent: 'rgba(168,85,247,0.35)',
  },
  {
    title: 'Workflow Engineering',
    description:
      'We replace manual management with autonomous logic. If a task can be automated, we build the protocol for it.',
    icon: <GitBranch size={22} color="#fff" />,
    accent: 'rgba(236,72,153,0.30)',
  },
  {
    title: 'Migration & Deployment',
    description:
      'We execute the heavy lifting. Moving your data from legacy tools (Jira, Asana) into your new architecture.',
    icon: <Rocket size={22} color="#fff" />,
    accent: 'rgba(16,185,129,0.28)',
  },
];

const ClickUpArchitects = ({ embedded = false }) => {
  return (
    <section style={{ padding: '110px 20px', position: 'relative', overflow: 'hidden' }}>
      {!embedded ? (
        /* Section background (soft fade top/bottom so it blends into surrounding sections) */
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.95,
            // Fade the section background at the edges so adjacent sections blend smoothly.
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, transparent 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 82%, transparent 100%)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.10), transparent 45%), radial-gradient(circle at 80% 10%, rgba(168,85,247,0.10), transparent 45%), radial-gradient(circle at 50% 85%, rgba(236,72,153,0.08), transparent 50%)',
            }}
          />

          {/* ClickUp logo watermark (right side) */}
          <div
            className="clickup-watermark"
            style={{
              position: 'absolute',
              right: '-120px',
              top: '52%',
              transform: 'translateY(-50%) rotate(10deg)',
              width: 'min(520px, 55vw)',
              opacity: 0.10,
              filter: 'saturate(1.1) drop-shadow(0 0 40px rgba(99,102,241,0.18))',
              mixBlendMode: 'screen',
            }}
          >
            <img
              src="/clickup-symbol-seeklogo.png"
              alt=""
              style={{ width: '100%', height: 'auto', display: 'block' }}
              draggable="false"
            />
          </div>
        </div>
      ) : (
        // Embedded mode (slideshow): let the slideshow provide the main background, keep only a subtle watermark.
        <div
          aria-hidden="true"
          className="clickup-watermark"
          style={{
            position: 'absolute',
            right: '-140px',
            top: '54%',
            transform: 'translateY(-50%) rotate(10deg)',
            width: 'min(560px, 60vw)',
            opacity: 0.08,
            filter: 'saturate(1.1) drop-shadow(0 0 46px rgba(99,102,241,0.16))',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        >
          <img
            src="/clickup-symbol-seeklogo.png"
            alt=""
            style={{ width: '100%', height: 'auto', display: 'block' }}
            draggable="false"
          />
        </div>
      )}

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <h2 style={{ marginBottom: '16px' }}>
            <span className="bg-gradient-to-r from-sky-400 via-fuchsia-500 to-pink-500 bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-6xl">
              Your ClickUp Architects
            </span>
          </h2>
          <p
            style={{
              color: '#94a3b8',
              fontSize: '1.15rem',
              maxWidth: '880px',
              margin: '0 auto',
              lineHeight: '1.7',
            }}
          >
            We don&apos;t just implement software. We engineer your entire Operating System. From structural design to AI
            logic, we build the machine that runs your business.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '22px',
          }}
          className="blueprint-grid"
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              style={{
                position: 'relative',
                padding: '26px',
                borderRadius: '18px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.10)',
                backdropFilter: 'blur(10px)',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: '-40%',
                  background: `radial-gradient(circle at 30% 20%, ${card.accent}, transparent 45%)`,
                  filter: 'blur(30px)',
                  opacity: 0.8,
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      display: 'grid',
                      placeItems: 'center',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.10)',
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3 style={{ margin: 0, color: '#fff', fontSize: '1.25rem', fontWeight: 800 }}>{card.title}</h3>
                </div>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.7' }}>
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA removed */}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .blueprint-grid {
            grid-template-columns: 1fr !important;
          }
          .clickup-watermark {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ClickUpArchitects;
