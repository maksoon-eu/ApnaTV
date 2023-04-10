import { useState, useEffect } from "react";
import useWatchService from "../../services/WatchService";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Filter from "../filter/Filter";

import loadingImg from "../../resources/img/loading.svg"

import './filmList.scss'

const FilmList = () => {
    const [films, setFilms] = useState([])
    const [filterArr, setFilterArr] = useState([])
    const {error, loading, getAllFilms} = useWatchService();

    const [genre, setGenre] = useState('%21null');
    const [type, setType] = useState('%21null');
    const [year, setYear] = useState('%21null');
    const [rating, setRating] = useState('%21null');
    const [country, setCountry] = useState('%21null');

    useEffect(() => {
        onRequest()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        onRequestFilter()
    }, [genre, country, year, rating, type])

    const onRequest = () => {
        getAllFilms()
            .then(onFilmsLoaded)
    }

    const onFilmsLoaded = (item) => {
        setFilms(item)
    }

    const filmList = films.map(item => {
        return (
            <div key={item.id} className="filmList__item">
                <div className="filmList__item-img">
                    <LazyLoadImage 
                        width='100%' height='100%'
                        placeholderSrc={loadingImg}
                        src={item.posterSmall}
                        alt={item.name}
                    />
                </div>
                <div className="filmList__item-name">{item.name}</div>
            </div>
        )
    })

    const filterFilm = (filter) => {
        switch (Object.keys(filter)[0]) {
            case 'genre':
                setGenre(genre => genre !== encodeURI(filter[Object.keys(filter)[0]]) ? encodeURI(filter[Object.keys(filter)[0]]) : '%21null')
                console.log(1)
                break;
            case 'year':
                setYear(year => year !== filter[Object.keys(filter)[0]] ? filter[Object.keys(filter)[0]] : '%21null')
                break;
            case 'country':
                setCountry(country => country !== encodeURI(filter[Object.keys(filter)[0]]) ? encodeURI(filter[Object.keys(filter)[0]]) : '%21null')
                break;
            case 'rating':
                setRating(rating => rating !== `${filter[Object.keys(filter)[0]].slice(3, filter[Object.keys(filter)[0]].length-2)}-10` ? `${filter[Object.keys(filter)[0]].slice(3, filter[Object.keys(filter)[0]].length-2)}-10` : '%21null')
                break;
            case 'type':
                setType(type => type !== filter[Object.keys(filter)[1]] ? encodeURI(filter[Object.keys(filter)[1]]) : '%21null')
                break;
        }
        // if (filterArr.length !== 0) {
        //     filterArr.forEach(item => {
        //         if (Object.keys(item)[0] === Object.keys(filter)[0]) {
        //             setFilterArr(filterArr => filterArr.filter(item => Object.keys(item)[0] !== Object.keys(filter)[0] ))
        //             setFilterArr(filterArr => filterArr.concat(filter))
        //         } 

        //         if (item[Object.keys(item)[0]] === filter[Object.keys(filter)[0]]) {
        //             setFilterArr(filterArr => filterArr.filter(item => Object.keys(item)[0] !== Object.keys(filter)[0] ))
        //         }
        //     })

        //     if (!filterArr.some(item => Object.keys(item)[0] === Object.keys(filter)[0])) {
        //         setFilterArr(filterArr => filterArr.concat(filter))
        //     }
        // } else {
        //     setFilterArr(filterArr => filterArr.concat(filter))
        // }
    }

    const onRequestFilter = () => {
        getAllFilms(1, type, year, rating, genre, country)
            .then(onFilmsLoaded)
    }

    return (
        <div>
            <Filter filterFilm={filterFilm}/>
            <div className="film__flex">
                {filmList}
            </div>
        </div>
    );
};

export default FilmList;