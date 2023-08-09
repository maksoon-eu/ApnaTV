import ChoseFilm from "../choseFilm/ChoseFilm";
import { motion } from "framer-motion";

const FilmPage = () => {
    return (
        <motion.div
        className="app__inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
            <ChoseFilm/>
        </motion.div>
    );
};

export default FilmPage;