import React from 'react';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            background: '#020202',
            padding: '80px 20px 40px',
            borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '40px',
                    marginBottom: '60px'
                }}>
                    {/* Brand */}
                    <div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '800',
                            marginBottom: '20px',
                            background: 'linear-gradient(to right, #fff, #a5b4fc)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            AMASO
                        </h3>
                        <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                            Automating the future of work. <br />
                            Secure. Scalable. Autonomous.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '20px', fontWeight: '600' }}>Platform</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><a href="#features" style={{ color: '#94a3b8', textDecoration: 'none' }}>Features</a></li>
                            <li><a href="#testimonials" style={{ color: '#94a3b8', textDecoration: 'none' }}>Testimonials</a></li>
                            <li><a href="#contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '20px', fontWeight: '600' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a></li>
                            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</a></li>
                            <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Security</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 style={{ color: '#fff', marginBottom: '20px', fontWeight: '600' }}>Connect</h4>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <SocialIcon icon={<Twitter size={20} />} />
                            <SocialIcon icon={<Linkedin size={20} />} />
                            <SocialIcon icon={<Github size={20} />} />
                            <SocialIcon icon={<Mail size={20} />} />
                        </div>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '40px',
                    textAlign: 'center',
                    color: '#475569',
                    fontSize: '0.9rem'
                }}>
                    <p>&copy; {new Date().getFullYear()} AMASO. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }) => (
    <a href="#" style={{
        color: '#94a3b8',
        transition: 'color 0.2s',
        cursor: 'pointer'
    }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
    >
        {icon}
    </a>
);

export default Footer;
