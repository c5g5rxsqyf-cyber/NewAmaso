
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageBackground from './PageBackground';

const Hero = () => {
    return (
        <section style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <PageBackground mode="absolute" />

            {/* Content */}
            <div style={{ zIndex: 1, maxWidth: '800px' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 5rem)',
                        fontWeight: '800',
                        marginBottom: '20px',
                        background: 'linear-gradient(to right, #fff, #a5b4fc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-2px'
                    }}
                >
                    Automate the Impossible.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                        color: '#94a3b8',
                        marginBottom: '40px',
                        lineHeight: '1.6'
                    }}
                >
                    Transform time-draining tasks into autonomous workflows.
                    Free your team to focus on high-impact innovation with AMASO.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{
                            padding: '16px 32px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#fff',
                            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                            borderRadius: '50px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: '0 10px 20px rgba(99,102,241,0.3)',
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Get Started <ArrowRight size={20} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
