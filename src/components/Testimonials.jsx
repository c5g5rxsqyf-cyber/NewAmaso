import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        quote: "AMASO gives us an opportunity to bring automation into areas of the organization that just don’t have developers to implement automation in the more traditional way.",
        author: "Gregory Poniatowski",
        role: "Director of Cyber Threat and Vulnerability",
        company: "TechCorp"
    },
    {
        quote: "A much smoother user experience than iterating via code, reviewing logs, etc, and allows our team to go from an automation idea to a production story in literally minutes.",
        author: "Paul M.",
        role: "Lead Engineer",
        company: "Innovate Inc."
    },
    {
        quote: "No matter how many tools you change, you can keep AMASO in place. It's the glue that holds our entire stack together.",
        author: "Sarah J.",
        role: "CTO",
        company: "FutureScale"
    }
];

const stats = [
    { value: "50%", label: "Reduction in ticket time" },
    { value: "750+", label: "Days of work saved" },
    { value: "10h", label: "Saved daily per team" }
];

const Testimonials = () => {
    return (
        <section style={{ padding: '100px 20px', background: '#0a0a0a', position: 'relative' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Stats Section */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    marginBottom: '100px',
                    gap: '40px'
                }}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{
                                fontSize: 'clamp(3rem, 5vw, 4rem)',
                                fontWeight: '800',
                                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '10px'
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Intro Section */}
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: '800',
                            marginBottom: '20px',
                            color: '#fff'
                        }}
                    >
                        Sounds…<br />
                        <span style={{ color: '#94a3b8' }}>hard to believe?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            fontSize: '1.2rem',
                            color: '#94a3b8',
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}
                    >
                        We get it. A lot of products make bold claims. There’s no way one product could do all this. Right?
                        <br /><br />
                        <span style={{ color: '#fff', fontWeight: '600' }}>Don’t take our word for it.</span>
                    </motion.p>
                </div>

                {/* Testimonials Grid */}
                <h2 style={{
                    textAlign: 'center',
                    fontSize: '2.5rem',
                    marginBottom: '60px',
                    color: '#fff'
                }}>
                    Trusted by Industry Leaders
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px'
                }}>
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            style={{
                                background: '#111',
                                padding: '40px',
                                borderRadius: '20px',
                                border: '1px solid #222'
                            }}
                        >
                            <p style={{
                                fontSize: '1.1rem',
                                color: '#e2e8f0',
                                marginBottom: '30px',
                                fontStyle: 'italic',
                                lineHeight: '1.6'
                            }}>
                                "{t.quote}"
                            </p>
                            <div>
                                <div style={{ fontWeight: '600', color: '#fff' }}>{t.author}</div>
                                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{t.role}</div>
                                <div style={{ color: '#6366f1', fontSize: '0.9rem', marginTop: '5px' }}>{t.company}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
