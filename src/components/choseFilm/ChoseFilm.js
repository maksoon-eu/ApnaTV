import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useWatchService from "../../services/WatchService";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

import ModalWindow from "../modal/Modal";

import loadingImg from "../../resources/img/loading.svg";
import watch from '../../resources/img/play-btn.svg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-lazy-load-image-component/src/effects/blur.css';
import './choseFilm.scss'

const Film = ({filmId}) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "http://yohoho.cc/yo.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [])

    return (
        <div className="videoPlayer">
                <div id="yohoho" data-resize="1" data-language="ru" data-country="RU" data-loading={loadingImg} data-bg="#000" data-kinopoisk={filmId}></div>
        </div>
    )
}

const ChoseFilm = () => {
    const [film, setFilm] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [sequelsAndPrequels, setSequelsAndPrequels] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [genres, setGenres] = useState();
    const [country, setCountry] = useState();
    const [premiere, setPremiere] = useState();
    const {filmId} = useParams()
    const {error, loading, getFilmForId} = useWatchService();

    useEffect(() => {
        document.body.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        onRequest()
        // eslint-disable-next-line
    }, [filmId])

    const onRequest = () => {
        getFilmForId(filmId)
            .then(onFilmLoaded)
    }

    const onFilmLoaded = (film) => {
        setFilm(film[0])
        setSimilarMovies(film[0].similarMovies)
        setSequelsAndPrequels(film[0].sequelsAndPrequels)
        setGenres(film[0].genres.map((item, i) => {
            return i === film[0].genres.length - 1 ? item.name : `${item.name}, `
        }))
        setCountry(film[0].country.map((item, i) => {
            return i === film[0].country.length - 1 ? item.name : `${item.name}, `
        }))
        const premiere = film[0].premiere.slice(0, 10).split('-')
        switch (premiere[1]) {
            case '01':
                setPremiere([premiere[2], ' января ', premiere[0]])
                break;
            case '02':
                setPremiere([premiere[2], ' февраля ', premiere[0]])
                break;
            case '03':
                setPremiere([premiere[2], ' марта ', premiere[0]])
                break;
            case '04':
                setPremiere([premiere[2], ' апреля ', premiere[0]])
                break;
            case '05':
                setPremiere([premiere[2], ' мая ', premiere[0]])
                break;
            case '06':
                setPremiere([premiere[2], ' июня ', premiere[0]])
                break;
            case '07':
                setPremiere([premiere[2], ' июля ', premiere[0]])
                break;
            case '08':
                setPremiere([premiere[2], ' августа ', premiere[0]])
                break;
            case '09':
                setPremiere([premiere[2], ' сентября ', premiere[0]])
                break;
            case '10':
                setPremiere([premiere[2], ' октября ', premiere[0]])
                break;
            case '11':
                setPremiere([premiere[2], ' ноября ', premiere[0]])
                break;
            case '12':
                setPremiere([premiere[2], ' декабря ', premiere[0]])
                break;
        
            default:
                break;
        }
    }

    const onOpenModal = (bool) => {
        setOpenModal(bool)

        if (bool) {
            setTimeout(() => {
                document.body.style.position = 'fixed';
                document.body.style.paddingRight = '6.5px';
            }, 300)
            document.body.style.width = '100%';
            document.body.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            setTimeout(() => {
                document.body.style.position = 'relative';
                document.body.style.paddingRight = '';
            }, 250)
            document.body.style.top = '';
        }
    }

    const similarMovieList = similarMovies.map(item => {
        return (
            <Link to={`/films/${item.id}`} key={item.id}>
                <div className="films__item films__item-after">
                    <div className="films__item-img">
                        <LazyLoadImage 
                            width='100%' height='100%'
                            placeholderSrc={loadingImg}
                            effect="blur"
                            src={item.poster.url}
                            alt={item.name}
                            style={{transition: '.2s linear'}}
                        />
                    </div>
                    <div className="films__item-name">{item.name === '' ? item.alternativeName : item.name}</div>
                </div>
            </Link>
        )
    })

    const sequelAndPrequelList = sequelsAndPrequels.map(item => {
        return (
            <Link to={`/films/${item.id}`} key={item.id}>
                <div className="films__item films__item-after">
                    <div className="films__item-img">
                        <LazyLoadImage 
                            width='100%' height='100%'
                            placeholderSrc={loadingImg}
                            effect="blur"
                            src={item.poster.url}
                            alt={item.name}
                            style={{transition: '.2s linear'}}
                        />
                    </div>
                    <div className="films__item-name">{item.name === '' ? item.alternativeName : item.name}</div>
                </div>
            </Link>
        )
    })

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1
    };
    
    return (
        <>
            {film.trailers !== undefined ? <ModalWindow key={filmId} openModal={openModal} onOpenModal={onOpenModal} url={film.trailers}/> : null}
            <div className="choseFilm">
                <div style={{display: loading ? 'block' : 'none'}}>
                    <motion.div
                    initial={{ opacity: 0, y: -200 }}
                    animate={{ opacity: 1, y: 0 }}>
                        <div className="skeleton skeleton--main">
                            <div className="pulse skeleton__choseFilm"></div>
                            <div className="pulse skeleton__header">
                                <div className="pulse skeleton__title"></div>
                                <div className="pulse skeleton__text"></div>
                                <div className="skeleton__btns">
                                    <div className="pulse skeleton__btn"></div>
                                    <div className="pulse skeleton__btn2"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <div className="choseFilm__content" style={{opacity: !(loading || error) ? '1' : '0'}}>
                    <div className="choseFilm__backdrop">
                        <LazyLoadImage 
                            width='99%' height='99%'
                            effect="blur"
                            placeholderSrc={loadingImg}
                            src={film.backdrop}
                            alt={film.name}
                        />
                    </div>
                    <div className="choseFilm__flex">
                        <div className="choseFilm__left">
                            <div className="choseFilm__img">
                                <LazyLoadImage 
                                    width='100%' height='100%'
                                    effect="blur"
                                    placeholderSrc={loadingImg}
                                    src={film.posterBig}
                                    alt={film.name}
                                />
                            </div>
                        </div>
                        <div className="choseFilm__right">
                            <div className="choseFilm__logo" style={{display: film.logo === null ? 'none' : 'block'}}>
                                <LazyLoadImage effect="opacity" src={film.logo} alt={film.name}/>
                            </div>
                            <div className="choseFilm__name" style={{display: film.logo === null ? 'block' : 'none'}}>{film.name}</div>
                            <div className="choseFilm__names">
                                <div className="choseFilm__alternativeName">{film.alternativeName === null ? '...' : film.alternativeName}</div>
                                <div className="choseFilm__ageRating">{film.ageRating}+</div>
                            </div>
                            <div className="choseFilm__descr">{film.description}</div>
                            <div className="btn__flex">
                                <button className="watch__btn">
                                    <img src={watch} alt="" />
                                    Смотреть
                                </button>
                                <button className="trailer__btn" onClick={() => {onOpenModal(true)}} >
                                    Трейлер
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="choseFilm__about">О фильме</div>
                    <div className="choseFilm__row">
                        <div className="choseFilm__title">Год</div>
                        <div className="choseFilm__text">{film.year}</div>
                    </div>
                    <div className="choseFilm__row">
                        <div className="choseFilm__title">Страна</div>
                        <div className="choseFilm__text">{country}</div>
                    </div>
                    <div className="choseFilm__row">
                        <div className="choseFilm__title">Жанр</div>
                        <div className="choseFilm__text">{genres}</div>
                    </div>
                    <div className="choseFilm__row">
                        <div className="choseFilm__title">Длительность</div>
                        <div className="choseFilm__text">{film.movieLength} мин / {Math.floor(film.movieLength / 60)} ч {film.movieLength % 60} мин</div>
                    </div>
                    <div className="choseFilm__row">
                        <div className="choseFilm__title">Бюджет</div>
                        <div className="choseFilm__text">{film.budget === 'undefined undefined' ? '...' : film.budget}</div>
                    </div>
                    <div className="choseFilm__row">
                        <div className="choseFilm__title">Сборы в мире</div>
                        <div className="choseFilm__text">{film.fees === 'undefined undefined' ? '...' : film.fees}</div>
                    </div>
                    <div className="choseFilm__row">
                        <div className="choseFilm__title">Премьера в мире</div>
                        <div className="choseFilm__text">{premiere}</div>
                    </div>

                    <Film filmId={filmId} key={filmId}/>
                    
                    <div className="choseFilm__slider" style={{display: similarMovieList.length !== 0 ? 'block' : 'none'}}>
                        <div className="genre__title">Похожие фильмы</div>
                        <Slider {...settings} className="main__slider genre__slider"> 
                            {similarMovieList}  
                        </Slider>
                    </div>
                    
                    <div className="choseFilm__slider" style={{display: sequelAndPrequelList.length !== 0 ? 'block' : 'none'}}>
                        <div className="genre__title">Продолжение фильма</div>
                        <Slider {...settings} className="main__slider genre__slider"> 
                            {sequelAndPrequelList}  
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChoseFilm;