import React from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
                transformOrigin: '0%',
                scaleX: scrollYProgress,
                zIndex: 1000
            }}
        />
    );
};

export default ScrollProgress;
