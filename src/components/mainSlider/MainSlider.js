import { useState, useEffect } from "react";
import Slider from "react-slick";
import useWatchService from "../../services/WatchService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

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

    useEffect(() => {
        onRequest()
        // eslint-disable-next-line
    }, [])

    const onOpenModal = (bool, trailers) => {
        setOpenModal(bool)

        if (bool) {
            setTimeout(() => {
                document.body.style.position = 'fixed';
                document.body.style.overflowY = 'scroll'
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
                    <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    >
                    <div className="activeSlider__item-left">
                        <div className="activeSlider__item-logo" style={{display: item.logo === null ? 'none' : 'flex'}}>
                            <LazyLoadImage effect="opacity" src={item.logo} alt={item.name}/>
                        </div>
                        <div className="activeSlider__item-title" style={{display: item.logo === null ? 'block' : 'none'}}>{item.name}</div>
                        <div className="activeSlider__item-subtitle">{item.description}</div>
                        <div className="activeSlider__item-rating">
                            <div className="rating-imdb">{addRaiting(item.ratingImdb)}</div>
                        </div>
                        <div className="btn__flex">
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
                    </motion.div>
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
        lazyLoad: true,
        speed: 700,
        pauseOnHover: false
    };

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Skeleton/> : null
    const content =  !(loading || error) ? posterSlider : null
    const modal = url !== '' ? <ModalWindow openModal={openModal} onOpenModal={onOpenModal} url={url}/> : null

    return (
        <>
            {modal}
            <div style={{minHeight: '500px'}}>
            <Slider {...settings} className="poster__slider">
                {errorMessage}  
                {spinner}  
                {content} 
            </Slider>
            </div>
        </>
    );
};

export default MainSlider;