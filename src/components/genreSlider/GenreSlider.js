import { useState, useEffect } from "react";
import Slider from "react-slick";
import useWatchService from "../../services/WatchService";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import SkeletonSlider from "../skeleton/SkeletonSlider"
import ErrorMessage from "../errorMessage/ErorrMessage"

import loadingImg from "../../resources/img/loading.svg"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../mainSlider/mainSlider.scss"
import "./genreSlider.scss"
import "../../style/btn.scss"

const GenreSlider = ({genre}) => {
    const [films, setFilms] = useState([]);
    const skeletonArr = ['', '', '', '', '', '']
    const {error, loading, getGanreFilms} = useWatchService();

    useEffect(() => {
        onRequest()
        // eslint-disable-next-line
    }, [])

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
                        <div className={`adaptive__rating ${item.ratingImdb >= 7 ? 'green' : ''} ${item.ratingImdb <= 7 && item.ratingImdb >= 5 ? 'yellow' : ''} ${item.ratingImdb <= 5 ? 'red' : ''}`}>{item.ratingImdb.toFixed(1)}</div>
                        <div className="films__hover">
                            <div className="films__hover-bg"></div>
                            <div className={`films__hover-rating ${item.ratingImdb >= 7 ? 'green' : ''} ${item.ratingImdb <= 7 && item.ratingImdb >= 5 ? 'yellow' : ''} ${item.ratingImdb <= 5 ? 'red' : ''}`}>{item.ratingImdb.toFixed(1)}</div>
                            <div className="films__hover-descr">{item.year}, {item.country[0].name}</div>
                            <div className="films__hover-length">{item.movieLength} мин</div>
                            <div className="films__hover-ageRating">{item.ageRating}+</div>
                        </div>
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

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 6,
        swipeToSlide: true,
        slidesToScroll: 1,
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

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? skeletonList : null
    const content =  !(loading || error) ? filmList : null

    return (
        <>
            <div className="genre__title">{genre}</div>
            <Slider {...settings} className="main__slider genre__slider">
                {errorMessage}
                {spinner}
                {content}
            </Slider>
        </>
    );
};

export default GenreSlider;