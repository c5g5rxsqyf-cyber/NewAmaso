
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            background: '#050505',
            padding: '0 20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Abstract Background Objects */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                {/* Grid Pattern */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                        opacity: 0.6,
                        mixBlendMode: 'screen'
                    }}
                />

                {/* Moving Color Wash */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [0.88, 1.12, 0.88],
                        opacity: [0.6, 0.95, 0.6]
                    }}
                    transition={{
                        rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
                        opacity: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
                    }}
                    style={{
                        position: 'absolute',
                        inset: '-20%',
                        background: 'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.22), transparent 32%), radial-gradient(circle at 78% 28%, rgba(168,85,247,0.26), transparent 30%), radial-gradient(circle at 55% 70%, rgba(236,72,153,0.24), transparent 34%), radial-gradient(circle at 42% 60%, rgba(16,185,129,0.16), transparent 36%)',
                        filter: 'blur(50px)',
                        mixBlendMode: 'screen',
                        transformOrigin: '50% 50%',
                        opacity: 0.7,
                        willChange: 'transform'
                    }}
                />

                {/* Soft center falloff to keep edges brighter than middle */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at 50% 50%, rgba(5,5,5,0.35), rgba(5,5,5,0.55) 38%, rgba(5,5,5,0.8) 60%, rgba(0,0,0,0.95) 100%)',
                        mixBlendMode: 'multiply',
                        pointerEvents: 'none'
                    }}
                />

                {/* Pulsing center glow */}
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '420px',
                        height: '420px',
                        background: 'radial-gradient(circle, rgba(99,102,241,0.35), rgba(168,85,247,0.15), rgba(0,0,0,0))',
                        filter: 'blur(90px)',
                        opacity: 0.7
                    }}
                />

                {/* Glowing Orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '10%',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)',
                        borderRadius: '50%',
                        filter: 'blur(60px)',
                    }}
                />

                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '10%',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(0,0,0,0) 70%)',
                        borderRadius: '50%',
                        filter: 'blur(80px)',
                    }}
                />

                {/* Floating Geometric Shapes */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0.1
                        }}
                        animate={{
                            y: [0, -60, 0],
                            opacity: [0.1, 0.3, 0.1],
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 18 + Math.random() * 8,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 2
                        }}
                        style={{
                            position: 'absolute',
                            width: '80px',
                            height: '80px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: i % 2 === 0 ? '50%' : '10px',
                        }}
                    />
                ))}
            </div>

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
