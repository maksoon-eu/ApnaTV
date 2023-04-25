import React from "react";
import { useState, useEffect } from "react";
import useWatchService from "../../services/WatchService";

import Dropdown from "../dropdown/Dropdown";

import './filter.scss'

const Filter = ({filterFilm}) => {
    const [genres, setGenres] = useState([]);
    const [country, setCountry] = useState([]);
    const type = [{filter: 'Фильмы', filterNum: 1}, {filter: 'Сериалы', filterNum: 2}, {filter: 'Мультики', filterNum: 3}]
    const year = [{filter: '2022-2023'}, {filter: '2020-2021'}, {filter: '2018-2019'}, {filter: '2016-2017'}, {filter: '2014-2015'}, {filter: '2012-2013'}, {filter: '2000-2011'}]
    const rating = [{filter: 'От 9.0'}, {filter: 'От 8.0'}, {filter: 'От 7.0'}, {filter: 'От 6.0'}, {filter: 'От 5.0'}, {filter: 'От 4.0'}, {filter: 'От 3.0'}]
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
            <Dropdown filterFilm={filterFilm} initCurrent={'Жанры'} list={genres}/>
            <Dropdown filterFilm={filterFilm} initCurrent={'Страны'} list={country}/>
            <Dropdown filterFilm={filterFilm} initCurrent={'Каталог'} list={type}/>
            <Dropdown filterFilm={filterFilm} initCurrent={'Рейтинг'} list={rating}/>
            <Dropdown filterFilm={filterFilm} initCurrent={'Год выхода'} list={year}/>
        </div>
    );
};

export default Filter;