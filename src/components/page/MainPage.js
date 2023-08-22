import { motion } from "framer-motion";

import GenreSlider from '../genreSlider/GenreSlider';
import MainSlider from '../mainSlider/MainSlider';
import LickedSlider from "../lickedSlider/LickedSlider";

import drama from '../../resources/img/drama.png';
import bomb from '../../resources/img/bomb.png';
import globe from '../../resources/img/globe.png';
import ogre from '../../resources/img/ogre.png';
import unicorn from '../../resources/img/unicorn.png';
import popcorn from '../../resources/img/popcorn.png';

import 'react-lazy-load-image-component/src/effects/blur.css';
import '../filmListItem/filmListItem.scss';

const MainPage = () => {
    

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        >
            <MainSlider/>
            <div className="app__inner">
                <GenreSlider genre={'боевик'} img={bomb}/>
                <GenreSlider genre={'комедия'} img={popcorn}/>
                <GenreSlider genre={'фантастика'} img={unicorn}/>
                <GenreSlider genre={'ужасы'} img={ogre}/>
                <GenreSlider genre={'драма'} img={drama}/>
                <GenreSlider genre={'приключения'} img={globe}/>

               <LickedSlider/>
                
            </div>
        </motion.div>
    );
};

export default MainPage;