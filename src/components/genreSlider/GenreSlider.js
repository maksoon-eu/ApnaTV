import { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import useWatchService from "../../services/WatchService";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { LickedContext } from "../licked/Licked";
import { motion, AnimatePresence } from "framer-motion";

import SkeletonSlider from "../skeleton/SkeletonSlider";
import ErrorMessage from "../errorMessage/ErorrMessage";

import loadingImg from "../../resources/img/loading.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../mainSlider/mainSlider.scss";
import "./genreSlider.scss";
import '../filmListItem/filmListItem.scss';
import "../../style/btn.scss";

const GenreSlider = ({genre, img}) => {
    const [films, setFilms] = useState([]);
    const skeletonArr = ['', '', '', '', '', '']
    const {error, loading, getGanreFilms} = useWatchService();
    const { licked, toggleLicked } = useContext(LickedContext);

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

    const onRequest = () => {
        getGanreFilms(encodeURI(genre), Math.floor(Math.random() * 9) + 1)
            .then(onFilmsLoaded)
    }

    const onFilmsLoaded = (films) => {
        const filmsShuffled = films
        .map(value => ({ value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

        setFilms(filmsShuffled)
    }

    const filmList = films.map(item => {
        return (
            <div key={item.id}>
                <div className="genre__licked">
                    <div className="licked" onClick={() => toggleLicked(item)}>
                        <svg width="42" height="38" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.0081 38C18.9857 38.0034 17.0381 37.2444 15.5616 35.8776C9.75749 30.5234 0.0188819 20.4421 0.0188819 13.1746C-0.0060439 13.0202 -0.0060439 12.8628 0.0188819 12.7083C-0.00629398 12.3067 -0.00629398 11.904 0.0188819 11.5024C0.0175597 9.07982 0.790155 6.71875 2.22634 4.75619C3.66252 2.79364 5.68887 1.3299 8.01621 0.573979C10.3435 -0.181944 12.8529 -0.191439 15.186 0.546844C17.5191 1.28513 19.5568 2.73347 21.0081 4.6851C22.4616 2.74021 24.4982 1.29815 26.8282 0.564116C29.1583 -0.169917 31.6632 -0.158549 33.9863 0.596599C36.3095 1.35175 38.3326 2.81223 39.768 4.77023C41.2033 6.72822 41.9778 9.08399 41.9811 11.5024C42.0063 11.904 42.0063 12.3067 41.9811 12.7083C41.998 12.8633 41.998 13.0196 41.9811 13.1746C41.9811 20.4421 32.2263 30.5234 26.4384 35.8776C24.966 37.2406 23.0249 37.9993 21.0081 38ZM3.30305 13.8017C3.77454 18.2394 9.10719 25.523 17.7728 33.5301C18.667 34.3211 19.8246 34.7584 21.0244 34.7584C22.2241 34.7584 23.3818 34.3211 24.276 33.5301C33.0066 25.4908 38.3555 18.1107 38.7457 13.6891C38.6261 13.4272 38.592 13.135 38.6481 12.853C38.7347 12.4079 38.7783 11.9557 38.7782 11.5024C38.8336 9.52724 38.1715 7.59783 36.9121 6.06391C35.6526 4.52998 33.8792 3.49309 31.9132 3.14117C29.9471 2.78924 27.9187 3.14557 26.1954 4.14559C24.4722 5.14562 23.1683 6.72314 22.5201 8.59219C22.4065 8.90294 22.1989 9.17155 21.9254 9.36143C21.652 9.55131 21.326 9.65324 20.9918 9.65338C20.6596 9.65445 20.3351 9.55485 20.0619 9.368C19.7887 9.18115 19.5798 8.91603 19.4636 8.60828C18.7972 6.76149 17.4899 5.20849 15.7741 4.22572C14.0584 3.24295 12.0457 2.89419 10.0944 3.24156C8.143 3.58893 6.37961 4.60989 5.1181 6.12264C3.85659 7.63539 3.1788 9.54175 3.20546 11.5024C3.19716 11.956 3.24082 12.4091 3.33555 12.853C3.41816 13.1602 3.40687 13.4848 3.30305 13.7856V13.8017Z" fill={licked === null ? '#4B5563' : licked.some(el => el.id === item.id) ? '#FA4776' : '#4B5563'}/>
                        </svg>
                    </div>
                    <Link to={`/films/${item.id}`} key={item.id}>
                        <div className="films__item films__item-after">
                            <div className="films__item-img">
                                <LazyLoadImage 
                                    width='100%' height='100%'
                                    placeholderSrc={loadingImg}
                                    effect="blur"
                                    src={item.posterSmall}
                                    alt={item.name}
                                    style={{transition: '.2s linear'}}
                                />
                                <div className={`adaptive__rating ${item.rating >= 7 ? 'green' : ''} ${item.rating <= 7 && item.rating >= 5 ? 'yellow' : ''} ${item.rating <= 5 ? 'red' : ''}`}>{item.rating.toFixed(1)}</div>
                                <div className="films__hover">
                                    <div className="films__hover-bg"></div>
                                    <div className={`films__hover-rating ${item.rating >= 7 ? 'green' : ''} ${item.rating <= 7 && item.rating >= 5 ? 'yellow' : ''} ${item.rating <= 5 ? 'red' : ''}`}>{item.rating.toFixed(1)}</div>
                                    <div className="films__hover-descr">{item.year}, {item.country[0].name}</div>
                                    <div className="films__hover-length">{item.movieLength} мин</div>
                                    <div className="films__hover-ageRating">{item.ageRating}+</div>
                                </div>
                            </div>
                            <div className="films__item-name">{item.name === '' ? item.alternativeName : item.name}</div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    })

    const skeletonList = skeletonArr.map((item, i) => {
        return (
            <SkeletonSlider key={i}/>
        )
    })

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 6,
        swipeToSlide: true,
        slidesToScroll: 1,
        lazyLoad: isMobile ? true : false,
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
                slidesToScroll: 3,
                slidesToShow: 3
              }
            }
        ]
    };

    const spinner = loading ? skeletonList : null
    const content =  !(loading || error) ? filmList : null

    return (
        <>
            {filmList.length > 0 || error || loading ? 
            <AnimatePresence mode="wait">
                <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{opacity: 0}}
                    key={loading}
                >
                    <div className="genre__title">{genre} <img src={img} alt="" /></div>
                    <Slider {...settings} className="main__slider genre__slider">
                        {loading ? spinner  : error ? <ErrorMessage/> : content}
                    </Slider>
                </motion.div>
            </AnimatePresence> : <div className="genreSpinner"></div>}
        </>
    );
};

export default GenreSlider;