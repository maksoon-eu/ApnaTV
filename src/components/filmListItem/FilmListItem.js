import React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion, useAnimation } from 'framer-motion';
import { useOnScreen } from "../../hooks/screen.hook";

import loadingImg from "../../resources/img/loading.svg";

import 'react-lazy-load-image-component/src/effects/blur.css';
import './filmListItem.scss'

const FilmListItem = ({item}) => {
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
        exit={{ opacity: 0, y: 20 }}
        animate={controls}
        >
            <Link to={`/films/${item.id}`} className="filmList__item">
                <div className="filmList__item-img">
                    <LazyLoadImage 
                        width='100%' height='100%'
                        effect="blur"
                        placeholderSrc={loadingImg}
                        src={item.posterSmall}
                        alt={item.name}
                        style={{transition: '.2s linear'}}
                    />
                    <div className={`adaptive__rating ${item.ratingImdb >= 7 ? 'green' : ''} ${item.ratingImdb <= 7 && item.ratingImdb >= 5 ? 'yellow' : ''} ${item.ratingImdb <= 5 ? 'red' : ''}`}>{item.ratingImdb.toFixed(1)}</div>
                    <div className="films__hover">
                        <div className="films__hover-bg"></div>
                        <div className={`films__hover-rating ${item.ratingImdb >= 7 ? 'green' : ''} ${item.ratingImdb <= 7 && item.ratingImdb >= 5 ? 'yellow' : ''} ${item.ratingImdb <= 5 ? 'red' : ''}`}>{item.ratingImdb.toFixed(1)}</div>
                        <div className="films__hover-descr">{item.year}, {item.country[0].name}, {item.genre[0].name}</div>
                        <div className="films__hover-length">{item.movieLength} мин</div>
                        <div className="films__hover-ageRating">{item.ageRating}+</div>
                    </div>
                </div>
                <div className="filmList__item-name">{item.name}</div>
            </Link>
        </motion.div>
    );
};

export default FilmListItem;