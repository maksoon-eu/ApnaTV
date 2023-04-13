import { useState, useEffect } from "react";
import Slider from "react-slick";
import useWatchService from "../../services/WatchService";
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
    const skeletonArr = ['', '', '', '', '', '', '']
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
            <div key={item.id} className="film__height">
                <div className="films__item">
                    <div className="films__item-img">
                        <LazyLoadImage 
                            width='100%' height='100%'
                            placeholderSrc={loadingImg}
                            src={item.posterSmall}
                            alt={item.name}
                        />
                    </div>
                    <div className="films__item-name">{item.name === '' ? item.alternativeName : item.name}</div>
                </div>
            </div>
        )
    })

    const skeletonList = skeletonArr.map((item, i) => {
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

    return (
        <>
        
            <div className="genre__title">{genre}</div>
            <Slider {...settings1} className="main__slider genre__slider">
                {errorMessage}  
                {spinner}  
                {content}  
            </Slider>
        </>
    );
};

export default GenreSlider;