import React from "react";
import { useEffect, useRef } from "react";

import { motion, useAnimation } from 'framer-motion';
import { useOnScreen } from "../../hooks/screen.hook";

import './skeleton.scss';

const SkeletonSlider = () => {
    const controls = useAnimation();
    const rootRef = useRef(null);
    const onScreen = useOnScreen(rootRef);
    useEffect(() => {
        if (onScreen) {
        controls.start({
            y: 0,
            opacity: 1,
            transition: {
            duration: 0.6,
            ease: "easeOut"
            }
        });
        }
    }, [onScreen, controls]);

    return (
        <motion.div
        ref={rootRef}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        >
            <div className="pulse skeleton__block"></div>
        </motion.div>
    );
}

export default SkeletonSlider;