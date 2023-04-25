import React from "react";
import { motion } from 'framer-motion';

import './skeleton.scss';

const Skeleton = () => {
    return (
        <div className="skeleton skeleton--main">
            <motion.div
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}>
                <div className="pulse skeleton__header">
                    <div className="pulse skeleton__title"></div>
                    <div className="pulse skeleton__text"></div>
                    <div className="skeleton__btns">
                        <div className="pulse skeleton__btn"></div>
                        <div className="pulse skeleton__btn2"></div>
                    </div>
                </div>
            </motion.div>
            <div className="pulse skeleton__img"></div>
        </div>
    )
}

export default Skeleton;