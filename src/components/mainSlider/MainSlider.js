import { useState, useEffect } from "react";
import Slider from "react-slick";
import useWatchService from "../../services/WatchService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErorrMessage";
import ModalWindow from "../modal/Modal";

import loadingImg from "../../resources/img/loading.svg";
import watch from '../../resources/img/play-btn.svg';
import ratingPlus from '../../resources/img/ratingPlus.svg';
import ratingNone from '../../resources/img/ratingNone.svg';

import 'react-lazy-load-image-component/src/effects/blur.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./mainSlider.scss";
import "../../style/btn.scss";

const MainSlider = () => {
    const [films, setFilms] = useState([]);
    const [url, setUrl] = useState('');
    const {error, loading, getTopFilms} = useWatchService();

    const [openModal, setOpenModal] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    const isMobile = width <= 768;

    useEffect(() => {
        onRequest()
        // eslint-disable-next-line

        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, [])

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }

    const onOpenModal = (bool, trailers) => {
        setOpenModal(bool)

        if (bool) {
            setTimeout(() => {
                document.body.style.position = 'fixed';
                document.body.style.overflowY = 'scroll';
                document.body.style.width = '100%';
            }, 300)
            document.body.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            setUrl(trailers)
        } else {
            setTimeout(() => {
                document.body.style.position = 'relative';
            }, 250)
            document.body.style.top = '';
        }
    }

    const onRequest = () => {
        getTopFilms(Math.floor(Math.random() * 9) + 1)
            .then(onFilmsLoaded)
    }

    const onFilmsLoaded = (films) => {
        const filmsShuffled = films
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

        setFilms(filmsShuffled)
    }

    const posterSlider = films.map(item => {
        const addRaiting = (count) => {
            const allRaiting = []
            for (let i = 0; i < count; i++) {
                allRaiting.push(<img key={i} src={ratingPlus} alt="" />)
            }
            for (let i = 10; i < 19 - count; i++) {
                allRaiting.push(<img key={i} src={ratingNone} alt="" />)
            }
            return allRaiting
        }

        return (
            <div key={item.id} style={{position: 'relative'}}>
                <div className="activeSlider__item">
                    <div className="activeSlider__item-left">
                        <div className="activeSlider__item-logo" style={{display: item.logo === null ? 'none' : 'flex'}}>
                            <LazyLoadImage effect="blur" placeholderSrc={loadingImg} src={item.logo} alt={item.name}/>
                        </div>
                        <div className="activeSlider__item-title" style={{display: item.logo === null ? 'block' : 'none'}}>{item.name}</div>
                        <div className="activeSlider__item-subtitle">{item.description}</div>
                        <div className="activeSlider__item-rating">
                            <div className="rating-imdb">{addRaiting(item.ratingImdb)}</div>
                        </div>
                        <div className="btn__flex btn__flex--main">
                            <Link to={`/films/${item.id}`}>
                                <button className="watch__btn">
                                    <img src={watch} alt="" />
                                    Смотреть
                                </button>
                            </Link>
                            <button onClick={() => {onOpenModal(true, item.trailers)}} className="trailer__btn">
                                Трейлер
                            </button>
                        </div>
                    </div>
                    <div className="activeSlider__item-img">
                        <LazyLoadImage className="poster-img" placeholderSrc={loadingImg} effect="blur" width='100%' height='100%' src={item.backdrop} alt={item.name}/>
                    </div>
                </div>
            </div>
        )
    })

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        lazyLoad: isMobile ? true : false,
        speed: 700,
        pauseOnHover: false
    };

    const modal = url !== '' ? <ModalWindow openModal={openModal} onOpenModal={onOpenModal} url={url}/> : null

    return (
        <>
            {modal}
            {films.length > 0 || error || loading ? 
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                        exit={{opacity: 0}}
                        key={loading}
                    >
                        <Slider {...settings} className="poster__slider">
                            {loading ? <Skeleton/> : error ? <ErrorMessage/> : posterSlider}
                        </Slider>
                    </motion.div>
                </AnimatePresence> : <div className="genreSpinner"></div>}
        </>
    );
};

export default MainSlider;
