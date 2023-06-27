import { motion } from 'framer-motion';

const SkeletonActor = () => {
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}>
            <div className="skeleton skeleton--main skeleton--actor">
                <div className="pulse skeleton__img-actor"></div>
                <div className="pulse skeleton__header skeleton__header--actor">
                    <div className="pulse skeleton__title skeleton__title--actor"></div>
                    <div className="pulse skeleton__subtitle"></div>
                    <div className="skeleton__table">
                        <div className="skeleton__table-right">
                            <div className="skeleton__table-row">
                                <div className="skeleton__table-item"></div>
                                <div className="skeleton__table-item"></div>
                            </div>
                            <div className="skeleton__table-row">
                                <div className="skeleton__table-item"></div>
                                <div className="skeleton__table-item"></div>
                            </div>
                            <div className="skeleton__table-row">
                                <div className="skeleton__table-item"></div>
                                <div className="skeleton__table-item"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SkeletonActor;