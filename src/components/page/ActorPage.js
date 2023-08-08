import Actor from "../actors/Actor";
import { motion } from "framer-motion";

const ActorPage = () => {
    return (
            <motion.div
            className="app__inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            >
                <Actor/>
            </motion.div>
    );
};

export default ActorPage;