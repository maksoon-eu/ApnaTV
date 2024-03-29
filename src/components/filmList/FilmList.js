import React from "react";
import { useState, useEffect } from "react";
import useWatchService from "../../services/WatchService";
import { motion, AnimatePresence } from 'framer-motion';

import Filter from "../filter/Filter";
import SkeletonSliderFilms from "../skeleton/SkeletonSliderFilms";
import ErrorMessage from "../errorMessage/ErorrMessage";
import FilmListItem from "../filmListItem/FilmListItem";

import loadingImg from "../../resources/img/loading.svg";

import './filmList.scss';

const FilmList = () => {
    const [films, setFilms] = useState([]);
    const [offset, setOffset] = useState(localStorage.getItem('offset') === null ? 2 : +localStorage.getItem('offset'));
    const {error, loading, getAllFilms} = useWatchService();
    const [fetching, setFetching] = useState(false);
    const [totalCount, setTotalCount] = useState(1);

    const skeletonArr = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

    const [genre, setGenre] = useState(localStorage.getItem('genre') === null ? '%21null' : localStorage.getItem('genre'));
    const [type, setType] = useState(localStorage.getItem('type') === null ? '%21null' : localStorage.getItem('type'));
    const [year, setYear] = useState(localStorage.getItem('year') === null ? '%21null' : localStorage.getItem('year'));
    const [rating, setRating] = useState(localStorage.getItem('rating') === null ? '%21null' : localStorage.getItem('rating'));
    const [country, setCountry] = useState(localStorage.getItem('country') === null ? '%21null' : localStorage.getItem('country'));

    useEffect(() => {
        onRequest(offset);
        localStorage.setItem('genre', genre);
        localStorage.setItem('year', year);
        localStorage.setItem('country', country);
        localStorage.setItem('rating', rating);
        localStorage.setItem('type', type);
        // eslint-disable-next-line
    }, [type, year, rating, genre, country])

    useEffect(() => {
        if (fetching) {
            onUpdateRequest(offset);
        }
    }, [fetching])

    useEffect(() => {
        if (films.length !== 0) {
            localStorage.setItem('films', JSON.stringify(films))
        }

        if (films.length) {
            const scrollPosition = sessionStorage.getItem('scrollPosition');
            if (scrollPosition) {
                window.scrollTo(0, parseInt(scrollPosition, 10));
                sessionStorage.removeItem('scrollPosition');
            }
        }
        window.addEventListener('scroll', onScrollList);

        return function() {
            window.removeEventListener('scroll', onScrollList);
        }
    }, [films]);

    const onRequest = () => {
        getAllFilms(1, type, year, rating, genre, country)
            .then(onFilmsLoaded)
    }

    const onFilmsLoaded = (item) => {
        setTotalCount(item.total)
        if (JSON.parse(localStorage.getItem('films')) !== null && films.length === 0) {
            setFilms(JSON.parse(localStorage.getItem('films')))
        } else { 
            setFilms(item.itemList)
        }
    }

    const onUpdateRequest = (offset) => {
        localStorage.setItem('offset', +offset+1)
        getAllFilms(offset, type, year, rating, genre, country)
            .then(onUpdateFilmsLoaded)
    }

    const onUpdateFilmsLoaded = (item) => {
        setTotalCount(item.total)
        if (JSON.parse(localStorage.getItem('films')) !== null && films.length === 0) {
            setFilms(JSON.parse(localStorage.getItem('films')))
        } else { 
            setFilms(films => [...films, ...item.itemList])
        }
        setOffset(offset => offset + 1)
        setFetching(false)
    }

    const filmList = films.map(item => {
        return (
            <FilmListItem key={item.id} item={item}/>
        )
    })

    const cleanAllFilters = () => {
        if (!loading) {
            setGenre('%21null')
            setYear('%21null')
            setCountry('%21null')
            setRating('%21null')
            setType('%21null')
            localStorage.clear('films')
        }
    }

    const filterFilm = (filter) => {
        if (!fetching) {
            switch (Object.keys(filter)[0]) {
                case 'genre':
                    const encodeFilterGenre = encodeURI(filter.genre)
                    setGenre(genre => genre !== encodeFilterGenre && filter.genre !== 'Все' ? encodeFilterGenre : '%21null')
                    break;
                case 'year':
                    setYear(year => year !== filter.year && filter.year !== 'Все' ? filter.year : '%21null')
                    break;
                case 'country':
                    const encodeFilterCountry = encodeURI(filter.country)
                    setCountry(country => country !== encodeFilterCountry && filter.country !== 'Все' ? encodeFilterCountry : '%21null')
                    break;
                case 'rating':
                    setRating(rating => rating !== filter.ratingType && filter.rating !== 'Все' ? filter.ratingType : '%21null')
                    break;
                case 'type':
                    setType(type => type !== filter.typeNum && filter.type !== 'Все' ? encodeURI(filter.typeNum) : '%21null')
                    break;
                default:
                    return
            }
        }
    }

    const onScrollList = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 300 && filmList.length !== 0 && filmList.length < totalCount) {
            setFetching(true)
        }
    }

    const skeletonList = skeletonArr.map((item, i) => {
        return (
            <SkeletonSliderFilms key={i}/>
        )
    })

    const spinnerUpdate = fetching ? <img src={loadingImg} className="spinnerUpdate" alt="Loading..." /> : null

    return (
        <div>
            <Filter genreFilter={genre} typeFilter={type} yearFilter={year} ratingFilter={rating} countryFilter={country} cleanAllFilters={cleanAllFilters} fetching={fetching} filterFilm={filterFilm}/>
            <div className="film__minHeight">
                {films.length > 0 || error || loading ?
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                        exit={{opacity: 0}}
                        key={loading && !fetching}
                        className="film__flex"
                    >
                        {loading && !fetching ? skeletonList : error ? <ErrorMessage/> : filmList}
                    </motion.div>
                </AnimatePresence> : ''}
                {!totalCount ? <h1 className="nothing">Ничего не найдено</h1> : null}
            </div>
            {spinnerUpdate}
        </div>
    );
};

export default FilmList;