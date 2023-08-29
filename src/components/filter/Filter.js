import React from "react";
import { useState, useEffect } from "react";
import useWatchService from "../../services/WatchService";

import Dropdown from "../dropdown/Dropdown";

import clean from "../../resources/img/clean.svg"

import './filter.scss'

const Filter = ({filterFilm, fetching, cleanAllFilters, genreFilter, typeFilter, yearFilter, ratingFilter, countryFilter}) => {
    const [genres, setGenres] = useState([]);
    const [country, setCountry] = useState([]);
    const type = [{filter: 'Фильмы', filterNum: 'movie'}, {filter: 'Сериалы', filterNum: 'tv-series'}, {filter: 'Мультики', filterNum: 'cartoon'}]
    const year = [{filter: '2022-2023'}, {filter: '2020-2021'}, {filter: '2018-2019'}, {filter: '2016-2017'}, {filter: '2014-2015'}, {filter: '2012-2013'}, {filter: '2000-2011'}]
    const rating = [{filter: 'От 9.0', filterNum: '9-10'}, {filter: 'От 8.0', filterNum: '8-10'}, {filter: 'От 7.0', filterNum: '7-10'}, {filter: 'От 6.0', filterNum: '6-10'}, {filter: 'От 5.0', filterNum: '5-10'}, {filter: 'От 4.0', filterNum: '4-10'}, {filter: 'От 3.0', filterNum: '3-10'}]
    const {error, loading, getAllFilters} = useWatchService();

    useEffect(() => {
        onRequest()
        // eslint-disable-next-line
    }, [])

    const onRequest = () => {
        getAllFilters('possible-values-by-field?field=genres.name')
            .then(onGenresLoaded)
        getAllFilters('possible-values-by-field?field=countries.name')
            .then(onCountryLoaded)
    }

    const onGenresLoaded = (genres) => {
        setGenres(genres)
    }

    const onCountryLoaded = (country) => {
        setCountry(country)
    }
    
    return (
        <div className="filter">
            <Dropdown error={error} loading={loading} filter={genreFilter} fetching={fetching} filterFilm={filterFilm} localStr={'viewGenre'} initCurrent={'Жанры'} list={genres}/>
            <Dropdown error={error} loading={loading} filter={countryFilter} fetching={fetching} filterFilm={filterFilm} localStr={'viewCountry'} initCurrent={'Страны'} list={country}/>
            <Dropdown error={error} loading={loading} filter={typeFilter} fetching={fetching} filterFilm={filterFilm} localStr={'viewType'} initCurrent={'Каталог'} list={type}/>
            <Dropdown error={error} loading={loading} filter={ratingFilter} fetching={fetching} filterFilm={filterFilm} localStr={'viewRating'} initCurrent={'Рейтинг'} list={rating}/>
            <Dropdown error={error} loading={loading} filter={yearFilter} fetching={fetching} filterFilm={filterFilm} localStr={'viewYear'} initCurrent={'Год выхода'} list={year}/>
            <div onClick={cleanAllFilters} className="clean">
                <div className="clean__text">Очистить</div>
                <div className="clean__img">
                    <img src={clean} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Filter;