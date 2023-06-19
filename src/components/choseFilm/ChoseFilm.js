import React from "react";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useWatchService from "../../services/WatchService";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

import ModalWindow from "../modal/Modal";
import SkeletonSlider from "../skeleton/SkeletonSlider"
import ErrorMessage from "../errorMessage/ErorrMessage"

import loadingImg from "../../resources/img/loading.svg";
import watch from '../../resources/img/play-btn.svg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import './choseFilm.scss'
import '../genreSlider/genreSlider.scss'

const Film = ({filmId, componentRef}) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://yohoho.cc/yo.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [])

    return (
        <div ref={componentRef} className="videoPlayer">
            <div id="yohoho" data-resize="1" data-bazon="ba2b3ea3fa479d54e31b203ced60f366" style={{width: '100%'}} data-language="ru" data-country="RU" data-bg="#000" data-kinopoisk={filmId} data-loading={loadingImg}></div>
        </div>
    )
}

const ChoseFilm = () => {
    const [film, setFilm] = useState([]);

    const [similarMovies, setSimilarMovies] = useState([]);
    const [persons, setPersons] = useState([]);
    const [sequelsAndPrequels, setSequelsAndPrequels] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [genres, setGenres] = useState();
    const [country, setCountry] = useState();
    const [premiere, setPremiere] = useState();
    const [rating, setRating] = useState();

    const skeletonArr = ['', '', '', '', '', '']

    const {filmId} = useParams()
    const {error, loading, getFilmForId} = useWatchService();

    const ref = useRef()
    
    useEffect(() => {
        onRequest()
        // eslint-disable-next-line
    }, [filmId])

    const onRequest = () => {
        getFilmForId(filmId)
            .then(onFilmLoaded)
    }

    const onFilmLoaded = (film) => {
        setFilm(film)

        setSimilarMovies(film[0].similarMovies)
        setSequelsAndPrequels(film[0].sequelsAndPrequels)
        setPersons(film[0].persons)
        setRating(film[0].ratingKp.toFixed(1))
        setGenres(film[0].genres.map((item, i) => {
            return i === film[0].genres.length - 1 ? item.name : `${item.name}, `
        }))
        setCountry(film[0].country.map((item, i) => {
            return i === film[0].country.length - 1 ? item.name : `${item.name}, `
        }))
        const premiere = film[0].premiere === undefined ? '...' : film[0].premiere.slice(0, 10).split('-')
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
                setPremiere('...')
                break;
        }
    }

    const onOpenModal = (bool) => {
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
        } else {
            setTimeout(() => {
                document.body.style.position = 'relative';
            }, 250)
            document.body.style.top = '';
        }
    }

    const personsList = persons.map(item => {
        return (
            <div key={item.id}>
                <div className="films__item films__item-after">
                    <div className="films__item-img">
                        <LazyLoadImage 
                            key={item.id}
                            width='100%' height='100%'
                            placeholderSrc={loadingImg}
                            effect="blur"
                            src={item.photo}
                            alt={item.name}
                            style={{transition: '.2s linear'}}
                        />
                    </div>
                    <div className="films__item-name">{item.name === '' ? item.enName : item.name}</div>
                </div>
            </div>
        )
    })

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

    const onScrollToFilm = () => {
        ref.current.scrollIntoView({
            behavior: 'smooth'
        });
    };

    const skeletonList = skeletonArr.map((item, i) => {
        return (
            <SkeletonSlider key={i}/>
        )
    })

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
              breakpoint: 1230,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 870,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 550,
              settings: {
                slidesToShow: 3
              }
            }
        ]
    };
    
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? skeletonList : null
    const content =  !(loading || error) ? personsList : null
    const content2 =  !(loading || error) ? similarMovieList : null
    const content3 =  !(loading || error) ? sequelAndPrequelList : null

    const mainContent = film.map(item => {
        return (
            <div className="choseFilm__content" key={filmId}>
                <motion.div
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}>
                    <div className="choseFilm__backdrop" key={`1_${item.backdrop}`} style={{display: item.backdrop == null ? 'none' : 'block'}}>
                        <LazyLoadImage
                            width='100%' height='100%'
                            effect="blur"
                            placeholderSrc={loadingImg}
                            src={item.backdrop}
                            alt={item.name}
                        />
                    </div>
                    <div className="choseFilm__backdrop choseFilm__backdrop-none" key={item.backdrop} style={{display: item.backdrop == null ? 'block' : 'none'}}>
                    <LazyLoadImage
                            width='100%' height='100%'
                            effect="blur"
                            placeholderSrc={loadingImg}
                            src={item.posterBig}
                            alt={item.name}
                        />
                    </div>
                    <div className="choseFilm__flex">
                        <div className="choseFilm__left">
                            <div className="choseFilm__img" key={item.posterBig}>
                                <LazyLoadImage 
                                    width='100%' height='100%'
                                    effect="blur"
                                    placeholderSrc={loadingImg}
                                    src={item.posterBig}
                                    alt={item.name}
                                />
                            </div>
                        </div>
                        <div className="choseFilm__right">
                            <div className="choseFilm__logo" style={{display: item.logo === null ? 'none' : 'block'}} key={item.logo}>
                                <LazyLoadImage width='100%' height='100%' effect="opacity" src={item.logo} alt={item.name}/>
                            </div>
                            <div className="choseFilm__name" style={{display: item.logo === null ? 'block' : 'none'}}>{item.name}</div>
                            <div className="choseFilm__names">
                                <div className="choseFilm__alternativeName">{item.alternativeName === null ? '...' : item.alternativeName}</div>
                                <div className="choseFilm__ageRating">{item.ageRating}+</div>
                            </div>
                            <div className="choseFilm__descr">{item.description}</div>
                            <div className="btn__flex">
                                <button onClick={onScrollToFilm} className="watch__btn">
                                    <img src={watch} alt="" />
                                    Смотреть
                                </button>
                                <button className="trailer__btn" onClick={() => {onOpenModal(true)}} >
                                    Трейлер
                                </button>
                            </div>
                        </div>
                        <div className={`choseFilm__rating ${item.ratingKp >= 7 ? 'greenText' : ''} ${item.ratingKp <= 7 && item.ratingKp >= 5 ? 'yellowText' : ''} ${item.ratingKp <= 5 ? 'redText' : ''}`}>
                            {rating}
                        </div>
                    </div>

                    <div className="choseFilm__tables">
                        <table className="choseFilm__table">
                            <caption className="choseFilm__about">О фильме</caption>
                            <tbody> 
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Год</th>
                                    <td className="choseFilm__text">{item.year}</td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Страна</th>
                                    <td className="choseFilm__text">{country}</td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Жанр</th>
                                    <td className="choseFilm__text">{genres}</td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Длительность</th>
                                    <td className="choseFilm__text">{item.movieLength === null ? '...' : item.movieLength + ' мин / ' + Math.floor(item.movieLength / 60) + ' ч ' + item.movieLength % 60 + ' мин'}</td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Бюджет</th>
                                    <td className="choseFilm__text">{item.budget === 'undefined undefined' ? '...' : item.budget}</td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Сборы в мире</th>
                                    <td className="choseFilm__text">{item.fees === 'undefined undefined' ? '...' : item.fees}</td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Премьера в мире</th>
                                    <td className="choseFilm__text">{premiere}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="choseFilm__table choseFilm__table--top">
                            <tbody> 
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Режиссер</th>
                                    <td className="choseFilm__text">
                                        <div className="choseFilm__text-fle">
                                            {persons.filter(item => item.profession === 'режиссеры').length !== 0 ? persons.filter(item => item.profession === 'режиссеры').map(item => <div className="actors__text" key={item.id}>{item.name}</div>) : '...'}
                                        </div>
                                    </td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Редактор</th>
                                    <td className="choseFilm__text">
                                        <div className="choseFilm__text-fle">
                                            {persons.filter(item => item.profession === 'редакторы').length !== 0 ? persons.filter(item => item.profession === 'редакторы').map(item => <div className="actors__text" key={item.id}>{item.name}</div>) : '...'}
                                        </div>
                                    </td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Продюсер</th>
                                    <td className="choseFilm__text">
                                        <div className="choseFilm__text-fle">
                                            {persons.filter(item => item.profession === 'продюсеры').length !== 0 ? persons.filter(item => item.profession === 'продюсеры').map(item => <div className="actors__text" key={item.id}>{item.name}</div>) : '...'}
                                        </div>
                                    </td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Оператор</th>
                                    <td className="choseFilm__text">
                                        <div className="choseFilm__text-fle">
                                            {persons.filter(item => item.profession === 'операторы').length !== 0 ? persons.filter(item => item.profession === 'операторы').map(item => <div className="actors__text" key={item.id}>{item.name}</div>) : '...'}
                                        </div>
                                    </td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Композитор</th>
                                    <td className="choseFilm__text">
                                        <div className="choseFilm__text-flex">
                                            {persons.filter(item => item.profession === 'композиторы').length !== 0 ? persons.filter(item => item.profession === 'композиторы').map(item => <div className="actors__text" key={item.id}>{item.name}</div>) : '...'}
                                        </div>
                                    </td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Художник</th>
                                    <td className="choseFilm__text">
                                        <div className="choseFilm__text-flex">
                                            {persons.filter(item => item.profession === 'художники').length !== 0 ? persons.filter(item => item.profession === 'художники').map(item => <div className="actors__text" key={item.id}>{item.name}</div>) : '...'}
                                        </div>
                                    </td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Монтажер</th>
                                    <td className="choseFilm__text">
                                        <div className="choseFilm__text-flex">
                                            {persons.filter(item => item.profession === 'монтажеры').length !== 0 ? persons.filter(item => item.profession === 'монтажеры').map(item => <div className="actors__text" key={item.id}>{item.name}</div>) : '...'}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Film componentRef={ref} filmId={filmId} key={filmId}/>
                </motion.div>
            </div>
        )
    })

    const contentMain =  !(loading || error) ? mainContent : null

    return (
        <>
            {film.trailers !== undefined ? <ModalWindow openModal={openModal} onOpenModal={onOpenModal} url={film.trailers}/> : null}
            <div className="choseFilm">
                <div style={{display: loading ? 'block' : 'none'}}>
                    <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}>
                        <div className="skeleton skeleton--main skeleton--choose">
                            <div className="pulse skeleton__choseFilm"></div>
                            <div className="pulse skeleton__header skeleton__header--choose">
                                <div className="pulse skeleton__title"></div>
                                <div className="pulse skeleton__text skeleton__text--choose"></div>
                                <div className="skeleton__btns">
                                    <div className="pulse skeleton__btn"></div>
                                    <div className="pulse skeleton__btn2"></div>
                                </div>
                            </div>
                            <div className="pulse skeleton__rating"></div>
                        </div>
                        <div className="skeleton__title skeleton__title--choose"></div>
                        <div className="skeleton__table">
                            <div className="skeleton__table-left">
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
                                <div className="skeleton__table-row">
                                    <div className="skeleton__table-item"></div>
                                    <div className="skeleton__table-item"></div>
                                </div>
                            </div>
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
                                <div className="skeleton__table-row">
                                    <div className="skeleton__table-item"></div>
                                    <div className="skeleton__table-item"></div>
                                </div>
                            </div>
                        </div>
                        <div className="skeleton__video"></div>
                    </motion.div>
                </div>
                {contentMain}
                <div className="choseFilm__slider" style={{display: personsList.length !== 0 ? 'block' : 'none'}}>
                    <div className="genre__title">Актеры и съемочная группа</div>
                    {personsList.length > 0 || error || loading ? <Slider {...settings} className="main__slider genre__slider"> 
                        {errorMessage}  
                        {spinner}  
                        {content}    
                    </Slider> : <div className="genreSpinner"></div>}
                </div>
                    
                <div className="choseFilm__slider" style={{display: similarMovieList.length !== 0 ? 'block' : 'none'}}>
                    <div className="genre__title">Похожее</div>
                    {similarMovieList.length > 0 || error || loading ? <Slider {...settings} className="main__slider genre__slider"> 
                        {errorMessage}  
                        {spinner}  
                        {content2}  
                    </Slider> : <div className="genreSpinner"></div>}
                </div>
                
                <div className="choseFilm__slider" style={{display: sequelAndPrequelList.length !== 0 ? 'block' : 'none'}}>
                    <div className="genre__title">Сиквелы и приквелы</div>
                    {sequelAndPrequelList.length > 0 || error || loading ? <Slider {...settings} className="main__slider genre__slider"> 
                        {errorMessage}  
                        {spinner}  
                        {content3}  
                    </Slider> : <div className="genreSpinner"></div>}
                </div>
            </div>
        </>
    );
};

export default ChoseFilm;