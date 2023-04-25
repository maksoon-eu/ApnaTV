import React from "react";
import { motion } from 'framer-motion';

import './skeleton.scss';

const SkeletonSearch = () => {
    return (
        <motion.div
        initial={{ opacity: 0, y: 10 }}
        exit={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}>
            <div className="pulse skeleton__search-block"></div>
        </motion.div>
    );
}

export default SkeletonSearch;