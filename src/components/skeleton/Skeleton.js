import React from "react";
import { motion } from 'framer-motion';

import './skeleton.scss';

const Skeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}>
            <div className="skeleton skeleton--main">
                <div className="pulse skeleton__header">
                    <div className="pulse skeleton__title"></div>
                    <div className="pulse skeleton__text"></div>
                    <div className="skeleton__btns">
                        <div className="pulse skeleton__btn"></div>
                        <div className="pulse skeleton__btn2"></div>
                    </div>
                </div>
                <div className="pulse skeleton__img"></div>
            </div>
        </motion.div>
    )
}

export default Skeleton;