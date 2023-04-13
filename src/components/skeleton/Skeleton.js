import { motion } from 'framer-motion';

import './skeleton.scss';

const Skeleton = () => {
    return (
        <div className="skeleton">
            <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}>
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