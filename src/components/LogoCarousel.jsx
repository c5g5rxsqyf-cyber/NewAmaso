import React from 'react';
import { motion } from 'framer-motion';

import shopifyLogo from '../assets/logo-shopify.svg';
import stripeLogo from '../assets/logo-stripe.svg';
import slackLogo from '../assets/logo-slack.svg';
import salesforceLogo from '../assets/logo-salesforce.svg';
import hubspotLogo from '../assets/logo-hubspot.svg';
import zendeskLogo from '../assets/logo-zendesk.svg';
import notionLogo from '../assets/logo-notion.svg';
import airtableLogo from '../assets/logo-airtable.svg';
import asanaLogo from '../assets/logo-asana.svg';
import googleDriveLogo from '../assets/logo-google-drive.svg';

const logos = [
    { name: 'Shopify', src: shopifyLogo },
    { name: 'HubSpot', src: hubspotLogo },
    { name: 'Stripe', src: stripeLogo },
    { name: 'Slack', src: slackLogo },
    { name: 'Zendesk', src: zendeskLogo },
    { name: 'Notion', src: notionLogo },
    { name: 'Salesforce', src: salesforceLogo },
    { name: 'Airtable', src: airtableLogo },
    { name: 'Asana', src: asanaLogo },
    { name: 'Google Drive', src: googleDriveLogo },
];

const LogoCarousel = () => {
    const scrollingLogos = [...logos, ...logos];

    return (
        <section style={{
            padding: '60px 0',
            background: '#050505',
            overflow: 'hidden',
            borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <p style={{ color: '#64748b', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    Trusted by industry leaders
                </p>
            </div>

            <div style={{ display: 'flex', position: 'relative', width: '100%' }}>
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '100px',
                    background: 'linear-gradient(to right, #050505, transparent)',
                    zIndex: 2
                }} />
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '100px',
                    background: 'linear-gradient(to left, #050505, transparent)',
                    zIndex: 2
                }} />

                <motion.div
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity
                    }}
                    style={{ display: 'flex', gap: '80px', paddingLeft: '40px' }}
                >
                    {scrollingLogos.map((logo, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '150px'
                        }}>
                            <img
                                src={logo.src}
                                alt={`${logo.name} logo`}
                                style={{
                                    maxHeight: '40px',
                                    maxWidth: '120px',
                                    objectFit: 'contain',
                                    display: 'block'
                                }}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default LogoCarousel;
