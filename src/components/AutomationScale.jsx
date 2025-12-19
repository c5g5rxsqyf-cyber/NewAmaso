import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const AutomationScale = () => {
    return (
        <section style={{ padding: '100px 20px', position: 'relative', overflow: 'hidden' }}>
            {/* Background Gradient */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)'
            }} />

            <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '800',
                        marginBottom: '30px',
                        lineHeight: '1.1',
                        background: 'linear-gradient(to bottom, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    Automation that works -<br />regardless of complexity
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        fontSize: '1.2rem',
                        color: '#94a3b8',
                        marginBottom: '50px',
                        maxWidth: '700px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: '1.6'
                    }}
                >
                    Trade burnout for breakthroughs and tackle threats without unnecessary noise with AMASO.
                    No coding expertise required, just the flexibility to tailor workflows to your team’s exact needs.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{
                            padding: '16px 32px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#000',
                            background: '#fff',
                            borderRadius: '50px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: '0 0 20px rgba(255,255,255,0.2)',
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Start Building <ArrowRight size={20} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default AutomationScale;
