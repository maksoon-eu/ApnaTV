import { useState, useEffect } from "react";
import Slider from "react-slick";
import useWatchService from "../../services/WatchService";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Skeleton from "../skeleton/Skeleton";
import SkeletonSlider from "../skeleton/SkeletonSlider";
import ErrorMessage from "../errorMessage/ErorrMessage";
import Modal from "../modal/Modal";

import loadingImg from "../../resources/img/loading.svg";
import watch from '../../resources/img/play-btn.svg';
import ratingPlus from '../../resources/img/ratingPlus.svg';
import ratingNone from '../../resources/img/ratingNone.svg';

import 'react-lazy-load-image-component/src/effects/opacity.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./mainSlider.scss";
import "../../style/btn.scss";

const MainSlider = () => {
    const [films, setFilms] = useState([]);
    const {error, loading, clearError, getTopFilms} = useWatchService();
    const [activeItem, setActiveItem] = useState({});

    const skeletonArr = ['', '', '', '', '', '', '']

    useEffect(() => {
        onRequest()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (films[0] !== undefined) {
            onSetActiveItem(films[0])
        }
    }, [films])


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

    const onSetActiveItem = (item) => {
        clearError()
        setActiveItem(item)
    }

    const filmList = films.map(item => {
        return (
            <div onClick={() => onSetActiveItem(item)} key={item.id} className="film__height">
                <div className={`films__item ${activeItem.id === item.id ? 'films__item--active' : ''}`}>
                    <div className={`films__item-img ${activeItem.id === item.id ? 'films__item-img--active' : ''}`}>
                        <LazyLoadImage 
                            width='100%' height='100%'
                            placeholderSrc={loadingImg}
                            src={item.posterSmall}
                            alt={item.name}
                        />
                    </div>
                </div>
            </div>
        )
    })

    const skeletonList = skeletonArr.map(i => {
        return (
            <SkeletonSlider key={i}/>
        )
    })

    const settings1 = {
        dots: false,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1
    };

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? skeletonList : null
    const content =  !(loading || error) ? filmList : null

    const mainContetSlider = !Object.keys(activeItem).length ? <Skeleton/> : <View activeItem={activeItem}/>

    return (
        <>
            {mainContetSlider}
            <Slider {...settings1} className="main__slider">
                {errorMessage}  
                {spinner}  
                {content}  
            </Slider>
        </>
    );
};

const View = ({activeItem}) => {
    const [poster, setPoster] = useState();
    const [openModal, setOpenModal] = useState(false);

    const {error, loading, getPoster} = useWatchService();

    const onOpenModal = (bool) => {
        setOpenModal(bool)
    }

    useEffect(() => {
        onRequest()
    }, [activeItem])

    const onRequest = () => {
        getPoster(activeItem.id)
            .then(onPosterLoaded)
    }

    const onPosterLoaded = (poster) => {
        setPoster(poster)
    }

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

    const errorMessage = error ? <img className="alternative-img" src={activeItem.posterBig} alt={activeItem.name}/> : null
    const spinner = loading ? <img className="loading-img" src={loadingImg} alt="loading"/> : null
    const content =  !(loading || error) ? <LazyLoadImage className="poster-img" effect="opacity" width='100%' height='100%' src={poster} alt={activeItem.name}/> : null

    return (
        <>
            {openModal ? <Modal url={activeItem.trailers}/> : null}
            <div className="activeSlider__item">
                <div className="activeSlider__item-left">
                    <div className="activeSlider__item-title">{activeItem.name}</div>
                    <div className="activeSlider__item-subtitle">{activeItem.description}</div>
                    <div className="activeSlider__item-rating">
                        <div className="rating-imdb">{addRaiting(activeItem.ratingImdb)}</div>
                    </div>
                    <div className="btn__flex">
                    <button className="watch__btn">
                        <img src={watch} alt="" />
                        Watch Now
                    </button>
                    <button onClick={() => {onOpenModal(true)}} className="trailer__btn">
                        Trailer
                    </button>
                </div>
                </div>
                <div className="activeSlider__item-img">
                    {errorMessage}
                    {spinner}
                    {content}
                </div>
            </div>
        </>
    )
}

export default MainSlider;