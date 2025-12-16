import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate API call
        setTimeout(() => {
            // Reset form or handle success
        }, 2000);
    };

    return (
        <section style={{ padding: '100px 20px', background: '#050505', color: '#fff' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Get in touch</h2>
                    <p style={{ color: '#94a3b8' }}>
                        Ready to automate the impossible? Let's talk.
                    </p>
                </motion.div>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            background: '#111',
                            padding: '60px',
                            borderRadius: '20px',
                            textAlign: 'center',
                            border: '1px solid #333'
                        }}
                    >
                        <CheckCircle size={60} color="#6366f1" style={{ marginBottom: '20px', display: 'inline-block' }} />
                        <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>Thank You!</h3>
                        <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
                            Your request has been received. We'll be in touch shortly.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            style={{
                                marginTop: '30px',
                                background: 'none',
                                border: 'none',
                                color: '#6366f1',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            Send another message
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ display: 'grid', gap: '20px' }}
                        onSubmit={handleSubmit}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <Input placeholder="First name *" required />
                            <Input placeholder="Last name *" required />
                        </div>
                        <Input placeholder="Business email *" type="email" required />
                        <Input placeholder="Company Name *" required />
                        <Input placeholder="Phone *" required />
                        <select style={{
                            width: '100%',
                            padding: '15px',
                            background: '#111',
                            border: '1px solid #333',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '1rem',
                            outline: 'none'
                        }} required>
                            <option value="">Select country *</option>
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>Germany</option>
                            <option>France</option>
                        </select>
                        <textarea
                            placeholder="Tell us more about how we can help you..."
                            style={{
                                width: '100%',
                                padding: '15px',
                                background: '#111',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '1rem',
                                minHeight: '150px',
                                resize: 'vertical',
                                outline: 'none',
                                fontFamily: 'inherit'
                            }}
                        />

                        <button style={{
                            padding: '18px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#fff',
                            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            marginTop: '20px',
                            transition: 'opacity 0.2s'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                        >
                            Submit Request
                        </button>

                        <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', marginTop: '10px' }}>
                            By filling out this form you agree to our privacy policy.
                        </p>
                    </motion.form>
                )}

            </div>
        </section>
    );
};

const Input = ({ placeholder, type = "text", required = false }) => (
    <input
        type={type}
        placeholder={placeholder}
        required={required}
        style={{
            width: '100%',
            padding: '15px',
            background: '#111',
            border: '1px solid #333',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s'
        }}
        onFocus={(e) => e.currentTarget.style.borderColor = '#6366f1'}
        onBlur={(e) => e.currentTarget.style.borderColor = '#333'}
    />
);

export default Contact;
