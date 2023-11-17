import { useState, useEffect, useRef, useContext, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import useWatchService from "../../services/WatchService";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { LickedContext } from "../licked/Licked";

import ModalWindow from "../modal/Modal";
import SkeletonSlider from "../skeleton/SkeletonSlider";
import ErrorMessage from "../errorMessage/ErorrMessage";
import SkeletonChoose from "../skeleton/SkeletonChoose";

import loadingImg from "../../resources/img/loading.svg";
import watch from '../../resources/img/play-btn.svg';
import image from '../../resources/img/image.jpg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import './choseFilm.scss';
import '../genreSlider/genreSlider.scss';

const Film = ({filmId, componentRef, image}) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://kinobox.tv/kinobox.min.js';
        script.defer = true;
    
        script.onload = () => {
          if (window.Kinobox) {
            new window.Kinobox('.kinobox_player', { search: { kinopoisk: filmId }, params: { all: { poster: image } } }).init();
          }
        };
    
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, [filmId]);

    return (
        <div ref={componentRef} className="kinobox_player"></div>
    )
}

const ChoseFilm = () => {
    const [film, setFilm] = useState([]);

    const [similarMovies, setSimilarMovies] = useState([]);
    const [persons, setPersons] = useState([]);
    const [sequelsAndPrequels, setSequelsAndPrequels] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [url, setUrl] = useState('');
    const [genres, setGenres] = useState();
    const [country, setCountry] = useState();
    const [premiere, setPremiere] = useState();
    const [rating, setRating] = useState();

    const { licked, toggleLicked } = useContext(LickedContext);

    const skeletonArr = ['', '', '', '', '', ''];

    const {filmId} = useParams();
    const {error, loading, getFilmForId} = useWatchService();

    const ref = useRef();
    
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

        setUrl(film[0].trailers)
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

    const onScrollToFilm = () => {
        ref.current.scrollIntoView({
            behavior: 'smooth'
        });
    };

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
            <Link to={`/actors/${item.id}`} key={item.id}>
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
            </Link>
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

    const skeletonList = skeletonArr.map((item, i) => {
        return (
            <SkeletonSlider key={i}/>
        )
    })

    const mainContent = film.map(item => {
        return (
                <div className="choseFilm__content" key={filmId}>
                    <div className="choseFilm__backdrop" key={`1_${item.backdrop}`} style={{display: item.backdrop == null ? 'none' : 'block'}}>
                        <LazyLoadImage
                            width='100%' height='100%'
                            effect="blur"
                            placeholderSrc={loadingImg}
                            src={item.backdrop}
                            alt={item.name}
                        />
                    </div>
                    <div className="choseFilm__backdrop choseFilm__backdrop-none" key={item.backdrop} style={{display: item.backdrop === null ? 'block' : 'none'}}>
                    <LazyLoadImage
                            width='100%' height='100%'
                            effect="blur"
                            placeholderSrc={loadingImg}
                            src={item.posterBig === '' ? image : item.posterBig}
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
                                    src={item.posterBig === '' ? image : item.posterBig}
                                    alt={item.name}
                                />
                            </div>
                        </div>
                        <div className="choseFilm__right">
                            <div className="choseFilm__logo" style={{display: item.logo === null ? 'none' : 'block'}} key={item.logo}>
                                <LazyLoadImage placeholderSrc={loadingImg} width='100%' height='100%' effect="blur" src={item.logo} alt={item.name}/>
                            </div>
                            <div className="choseFilm__name" style={{display: item.logo === null ? 'block' : 'none'}}>{item.name}</div>
                            <div className="choseFilm__names">
                                <div className="choseFilm__alternativeName">{item.alternativeName === null ? '...' : item.alternativeName}</div>
                                <div className="choseFilm__ageRating">{item.ageRating === null ? '...' : item.ageRating}+</div>
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

                                <div className="choseFilm__licked" onClick={() => toggleLicked(item)}>
                            <svg width="42" height="38" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.0081 38C18.9857 38.0034 17.0381 37.2444 15.5616 35.8776C9.75749 30.5234 0.0188819 20.4421 0.0188819 13.1746C-0.0060439 13.0202 -0.0060439 12.8628 0.0188819 12.7083C-0.00629398 12.3067 -0.00629398 11.904 0.0188819 11.5024C0.0175597 9.07982 0.790155 6.71875 2.22634 4.75619C3.66252 2.79364 5.68887 1.3299 8.01621 0.573979C10.3435 -0.181944 12.8529 -0.191439 15.186 0.546844C17.5191 1.28513 19.5568 2.73347 21.0081 4.6851C22.4616 2.74021 24.4982 1.29815 26.8282 0.564116C29.1583 -0.169917 31.6632 -0.158549 33.9863 0.596599C36.3095 1.35175 38.3326 2.81223 39.768 4.77023C41.2033 6.72822 41.9778 9.08399 41.9811 11.5024C42.0063 11.904 42.0063 12.3067 41.9811 12.7083C41.998 12.8633 41.998 13.0196 41.9811 13.1746C41.9811 20.4421 32.2263 30.5234 26.4384 35.8776C24.966 37.2406 23.0249 37.9993 21.0081 38ZM3.30305 13.8017C3.77454 18.2394 9.10719 25.523 17.7728 33.5301C18.667 34.3211 19.8246 34.7584 21.0244 34.7584C22.2241 34.7584 23.3818 34.3211 24.276 33.5301C33.0066 25.4908 38.3555 18.1107 38.7457 13.6891C38.6261 13.4272 38.592 13.135 38.6481 12.853C38.7347 12.4079 38.7783 11.9557 38.7782 11.5024C38.8336 9.52724 38.1715 7.59783 36.9121 6.06391C35.6526 4.52998 33.8792 3.49309 31.9132 3.14117C29.9471 2.78924 27.9187 3.14557 26.1954 4.14559C24.4722 5.14562 23.1683 6.72314 22.5201 8.59219C22.4065 8.90294 22.1989 9.17155 21.9254 9.36143C21.652 9.55131 21.326 9.65324 20.9918 9.65338C20.6596 9.65445 20.3351 9.55485 20.0619 9.368C19.7887 9.18115 19.5798 8.91603 19.4636 8.60828C18.7972 6.76149 17.4899 5.20849 15.7741 4.22572C14.0584 3.24295 12.0457 2.89419 10.0944 3.24156C8.143 3.58893 6.37961 4.60989 5.1181 6.12264C3.85659 7.63539 3.1788 9.54175 3.20546 11.5024C3.19716 11.956 3.24082 12.4091 3.33555 12.853C3.41816 13.1602 3.40687 13.4848 3.30305 13.7856V13.8017Z" fill={licked === null ? '#4B5563' : licked.some(el => el.id === item.id) ? '#FA4776' : '#4B5563'}/>
                            </svg>
                        </div>
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
                                    <td className="choseFilm__text">{item.year === null ? '...' : item.year}</td>
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

                    <Film componentRef={ref} filmId={filmId} image={item.backdrop ? item.backdrop : item.posterBig === '' ? image : item.posterBig} key={filmId}/>
                </div>
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
    const spinnerSlider = loading ? skeletonList : null
    const contentSliderActor =  !(loading || error) ? personsList : null
    const contentSliderSimilar =  !(loading || error) ? similarMovieList : null
    const contentSliderSequel =  !(loading || error) ? sequelAndPrequelList : null

    const modal = url !== '' ? <ModalWindow openModal={openModal} onOpenModal={onOpenModal} url={url}/> : null

    return (
        <>
            {modal}
            <div style={{minHeight: '100vh'}}>
                {film.length > 0 || error || loading ? 
                <div className="choseFilm">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{opacity: 0}}
                            key={loading}
                        >
                            {loading ? <SkeletonChoose/> : error ? <ErrorMessage/> : mainContent}
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            exit={{opacity: 0}}
                            key={loading}
                        >
                            {!(loading || error) ? 
                            <>
                                <div className="choseFilm__slider" style={{display: personsList.length === 0 && !loading ? 'none' : 'block'}}>
                                <div className="genre__title">Актеры и съемочная группа</div>
                                {personsList.length > 0 || error || loading ? 
                                    <Slider {...settings} className="main__slider genre__slider"> 
                                        {errorMessage}  
                                        {spinnerSlider}  
                                        {contentSliderActor}    
                                    </Slider> : <div className="genreSpinner"></div>}
                                </div>
                                
                                <div className="choseFilm__slider" style={{display: similarMovieList.length === 0 && !loading ? 'none' : 'block'}}>
                                    <div className="genre__title">Похожее</div>
                                    {similarMovieList.length > 0 || error || loading ? 
                                        <Slider {...settings} className="main__slider genre__slider"> 
                                            {errorMessage}  
                                            {spinnerSlider}  
                                            {contentSliderSimilar}  
                                        </Slider> : <div className="genreSpinner"></div>}
                                </div>
                                
                                <div className="choseFilm__slider" style={{display: sequelAndPrequelList.length === 0 && !loading ? 'none' : 'block'}}>
                                    <div className="genre__title">Сиквелы и приквелы</div>
                                    {sequelAndPrequelList.length > 0 || error || loading ? 
                                        <Slider {...settings} className="main__slider genre__slider"> 
                                            {errorMessage}  
                                            {spinnerSlider}  
                                            {contentSliderSequel}  
                                        </Slider>  : <div className="genreSpinner"></div>}
                                </div> 
                            </> : ''}
                        </motion.div>
                    </AnimatePresence>
                </div> : ''}
            </div>
        </>
    );
};

export default ChoseFilm;