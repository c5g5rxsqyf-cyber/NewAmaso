import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Cpu, Layers } from 'lucide-react';

// Import images
import feature1 from '../assets/feature-1.png';
import feature2 from '../assets/feature-2.png';
import feature3 from '../assets/feature-3.png';
import feature4 from '../assets/feature-4.png';

const features = [
    {
        category: "Smart and accessible automation",
        title: "Build without technical blockers",
        description: "Stack and combine actions on the storyboard to build and run your workflows. Each action is purpose-built to handle any level of complexity without writing code.",
        icon: <Zap size={32} color="#6366f1" />,
        image: feature1
    },
    {
        category: "Secure and private by design",
        title: "Enable autonomous workflow activity",
        description: "Build agents within workflows to securely interact with your systems and data. Unmatched simplicity means your whole team can securely leverage the power of AI.",
        icon: <Cpu size={32} color="#a855f7" />,
        image: feature2
    },
    {
        category: "System connection at scale",
        title: "Power interoperability across your stack",
        description: "If it offers an API, AMASO connects with it. From mainstream solutions to niche and internal tools, AMASO is an integrator across your entire stack.",
        icon: <Layers size={32} color="#3b82f6" />,
        image: feature3
    },
    {
        category: "Streamlined collaboration",
        title: "Foster a culture of cybersecurity",
        description: "Determine when to bring people in the loop with safeguards, like change control, to experiment freely, introduce consistency, and enable transparent, controlled collaboration.",
        icon: <Shield size={32} color="#ec4899" />,
        image: feature4
    }
];

const Features = () => {
    return (
        <section style={{ padding: '100px 20px', background: '#050505' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '100px' }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontWeight: '700',
                        marginBottom: '20px',
                        color: '#fff'
                    }}>
                        Powering the Future of Work
                    </h2>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{
                                display: 'flex',
                                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                                alignItems: 'center',
                                gap: '60px',
                                flexWrap: 'wrap'
                            }}
                        >
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    marginBottom: '20px',
                                    padding: '8px 16px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '20px',
                                    color: '#94a3b8',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    {feature.icon}
                                    {feature.category}
                                </div>
                                <h3 style={{
                                    fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                                    fontWeight: '700',
                                    marginBottom: '20px',
                                    color: '#fff',
                                    lineHeight: '1.2'
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    color: '#94a3b8',
                                    fontSize: '1.1rem',
                                    lineHeight: '1.7'
                                }}>
                                    {feature.description}
                                </p>
                            </div>

                            <div style={{
                                flex: 1,
                                minWidth: '300px',
                                height: '400px',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
