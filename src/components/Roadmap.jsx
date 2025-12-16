import React from 'react';
import { motion } from 'framer-motion';
import { Search, Map, Code, ShieldCheck, Rocket } from 'lucide-react';

const steps = [
    {
        weeks: 'Weeks 1-2',
        title: 'Discovery & Audit',
        description: 'Sit with teams to map how work really moves, spot bottlenecks, and agree what “better” looks like.',
        icon: <Search size={24} color="#fff" />,
        color: '#6366f1'
    },
    {
        weeks: 'Weeks 3-4',
        title: 'Strategy & Architecture',
        description: 'Draft a blueprint that fits your stack and controls, with clear owners, dependencies, and milestones.',
        icon: <Map size={24} color="#fff" />,
        color: '#8b5cf6'
    },
    {
        weeks: 'Weeks 5-7',
        title: 'Development & Integration',
        description: 'Build and wire flows end-to-end, connect the systems, and harden every handoff between tools.',
        icon: <Code size={24} color="#fff" />,
        color: '#ec4899'
    },
    {
        weeks: 'Weeks 8-9',
        title: 'Testing & Refinement',
        description: 'Run it in a sandbox with failure drills, alerts, and runbooks tuned for how your team actually works.',
        icon: <ShieldCheck size={24} color="#fff" />,
        color: '#f59e0b'
    },
    {
        weeks: 'Week 10',
        title: 'Deployment & Handover',
        description: 'Ship, train, document, and hand off ownership so your team can run and evolve it confidently.',
        icon: <Rocket size={24} color="#fff" />,
        color: '#10b981'
    }
];

const Roadmap = () => {
    return (
        <section style={{ padding: '120px 20px', background: '#050505', position: 'relative', overflow: 'hidden' }}>
            {/* Background Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(99,102,241,0.05) 0%, transparent 70%)',
                zIndex: 0
            }} />

            <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '100px' }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        marginBottom: '20px',
                        color: '#fff',
                        fontWeight: '800',
                        letterSpacing: '-1px'
                    }}>
                        From Chaos to <span style={{
                            background: 'linear-gradient(to right, #6366f1, #ec4899)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>Autonomy</span>
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        A 10-week playbook to steady operations and free your team from the repetitive work.
                    </p>
                </motion.div>

                <div style={{ position: 'relative' }}>
                    {/* Glowing Central Line */}
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        background: 'linear-gradient(to bottom, #6366f1 0%, #8b5cf6 25%, #ec4899 50%, #f59e0b 75%, #10b981 100%)',
                        transform: 'translateX(-50%)',
                        borderRadius: '4px',
                        boxShadow: '0 0 20px rgba(99,102,241,0.3)',
                        display: 'none',
                        pointerEvents: 'none'
                    }} className="timeline-line" />

                    <style>{`
            @media (min-width: 900px) {
              .timeline-line { display: block !important; }
              .timeline-row {
                display: grid !important;
                grid-template-columns: 1fr 1fr;
                width: 100%;
                align-items: center;
                column-gap: 48px;
                margin-bottom: 110px;
                position: relative;
              }
              .timeline-row.left .timeline-card { grid-column: 1 / 2; justify-self: end; }
              .timeline-row.right .timeline-card { grid-column: 2 / 3; justify-self: start; }
              .timeline-marker {
                position: absolute !important;
                left: 50%;
                top: 50%;
                transform: translate(-0%, -50%);
                margin: 0 !important;
              }
              .timeline-spacer { display: none !important; }
            }
          `}</style>

                    {steps.map((step, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                className={`timeline-row ${isLeft ? 'left' : 'right'}`}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '24px',
                                    marginBottom: '100px',
                                    position: 'relative',
                                    width: '100%'
                                }}
                            >
                                {/* Content Card */}
                                <div className="timeline-card" style={{
                                    width: '100%',
                                    maxWidth: '540px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    position: 'relative',
                                    zIndex: 2,
                                    justifySelf: isLeft ? 'end' : 'start'
                                }}>
                                    <div style={{
                                        background: 'rgba(20, 20, 25, 0.6)',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        padding: '30px',
                                        borderRadius: '24px',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                        transition: 'transform 0.3s, border-color 0.3s',
                                        cursor: 'default',
                                        width: '100%'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-5px)';
                                            e.currentTarget.style.borderColor = step.color;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '6px 14px',
                                                borderRadius: '20px',
                                                background: `linear-gradient(90deg, ${step.color}20, transparent)`,
                                                border: `1px solid ${step.color}40`,
                                                color: step.color,
                                                fontSize: '0.85rem',
                                                fontWeight: '700',
                                                letterSpacing: '0.5px',
                                                textTransform: 'uppercase'
                                            }}>
                                                {step.weeks}
                                            </span>
                                        </div>

                                        <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '12px', fontWeight: '700' }}>{step.title}</h3>
                                        <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '1rem', margin: 0 }}>{step.description}</p>
                                    </div>
                                </div>

                                {/* Central Marker */}
                                <div className="timeline-marker" style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: '#050505',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: `2px solid ${step.color}`,
                                    boxShadow: `0 0 30px ${step.color}40, inset 0 0 20px ${step.color}20`,
                                    zIndex: 10,
                                    margin: '10px 0',
                                    position: 'relative',
                                    left: 'auto',
                                    justifySelf: 'center'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        inset: '5px',
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${step.color}, transparent)`,
                                        opacity: 0.2
                                    }} />
                                    {step.icon}
                                </div>

                                {/* Spacer for desktop layout balance */}
                                <div className="timeline-spacer" style={{ display: 'none' }} />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
