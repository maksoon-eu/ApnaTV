import React from "react";
import FilmList from "../filmList/FilmList";
import { motion } from "framer-motion";

const FilmListPage = () => {
    return (
        <motion.div
        className="app__inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
            <FilmList/>
        </motion.div>
    );
};

export default FilmListPage;