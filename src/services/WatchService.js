import { useHttp } from "../hooks/http.hook";

const useWatchService = () => {
    const {loading, request, error, clearError} = useHttp()

    const _apiBase = 'https://api.kinopoisk.dev/v1.4/';
    const _oldApiBase = 'https://api.kinopoisk.dev/v1.3/';
    const _baseOffset = 1;
    const _baseCurrent = '%21null';

    const getAllFilms = async (offset = _baseOffset, type = _baseCurrent, year = _baseCurrent, rating = _baseCurrent, genre = _baseCurrent, country = _baseCurrent) => {
        const res = await request(`${_oldApiBase}movie?selectFields=name%20id%20typeNumber%20movieLength%20ageRating%20countries.name%20genres.name%20year%20rating.imdb%20poster.previewUrl&page=${offset}&limit=28&type=${type}&year=${year}&rating.imdb=${rating}&countries.name=${country}&poster.previewUrl=%21null&name=%21null&genres.name=${genre}`);

        return {
            itemList: res.docs.map(_transformGenreFilms),
            total: res.total
        }
    }

    const getFilmForId = async (id) => {
        const res = await request(`${_apiBase}movie/${id}`)
        return [res].map(_transformFilmForId)
    }

    const getActorForId = async (id) => {
        const res = await request(`${_apiBase}person/${id}`)
        return [res].map(_transformActorForId)
    }

    const getSearchedFilms = async (name = '%20') => {
        const res = await request(`${_apiBase}movie/search?page=1&limit=10&query=${name}`);
        return res.docs.map(_transformSearchedFilms)
    }

    const getTopFilms = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}movie?page=${offset}&limit=50&selectFields=id&selectFields=name&selectFields=shortDescription&selectFields=year&selectFields=rating&selectFields=poster&selectFields=backdrop&selectFields=logo&selectFields=videos&notNullFields=id&notNullFields=name&notNullFields=rating.kp&notNullFields=poster.url&notNullFields=backdrop.url&notNullFields=logo.url&notNullFields=videos.trailers.url&notNullFields=videos.trailers.site&notNullFields=videos.trailers.name&typeNumber=1&year=2015-2050&rating.imdb=6-10`);

        return res.docs.map(_transformTopFilms)
    }

    const getGanreFilms = async (genre, offset = _baseOffset) => {
        const res = await request(`${_apiBase}movie?page=${offset}&limit=24&selectFields=id&selectFields=name&selectFields=year&selectFields=rating&selectFields=ageRating&selectFields=movieLength&selectFields=genres&selectFields=countries&selectFields=poster&year=2015-2050&notNullFields=rating.imdb&notNullFields=genres.name&notNullFields=countries.name&notNullFields=poster.url&typeNumber=1&genres.name=${genre}&rating.imdb=6-10`);

        return res.docs.map(_transformGenreFilms)
    }

    const getAllFilters = async (url) => {
        const res = await request(`https://api.kinopoisk.dev/v1/movie/${url}`);

        return res.map(_transformGenres)
    }

    const _transformSearchedFilms = (item) => {
        return {
            name: item.name,
            alternativeName: item.alternativeName,
            posterSmall: item.poster ? item.poster.previewUrl : null,
            rating: item.rating.imdb || item.rating.kp || item.rating.filmCritics,
            year: item.year,
            id: item.id
        }
    }

    const _transformFilmForId = (item) => {
        return {
            name: item.name,
            posterBig: !item.poster ? '' : item.poster.url,
            id: item.id,
            logo: !item.logo ? null : item.logo.url,
            trailers: !item.videos ? [] : item.videos.trailers,
            rating: item.rating.imdb || item.rating.kp || item.rating.filmCritics,
            year: item.year,
            country: item.countries,
            genres: item.genres,
            description: item.description,
            budget: `${item.budget.value} ${item.budget.currency}`,
            movieLength: item.movieLength,
            ageRating: item.ageRating,
            fees: !item.fees.world ? '...' : `${item.fees.world.value} ${item.fees.world.currency}`,
            persons: item.persons,
            backdrop: item.backdrop.url,
            similarMovies: item.similarMovies,
            sequelsAndPrequels: item.sequelsAndPrequels,
            alternativeName: item.alternativeName,
            premiere: !item.premiere ? '...' : item.premiere.world,
            typeNumber: item.typeNumber,
            seriesLength: item.seriesLength,
            endYear: item.typeNumber === 2 ? item.releaseYears[0].end : '...',
            status: item.status
        }
    }

    const _transformActorForId = (item) => {
        return {
            id: item.id,
            age: item.age,
            birthPlace: item.birthPlace,
            birthday: item.birthday,
            death: item.death,
            enName: item.enName,
            movies: item.movies, 
            name: item.name,
            photo: item.photo,
            profession: item.profession,
            spouses: item.spouses
        }
    }

    const _transformTopFilms = (item) => {
        return {
            name: item.name, 
            rating: item.rating.imdb || item.rating.kp || item.rating.filmCritics,
            description: item.shortDescription, 
            posterBig: item.poster.url, 
            posterSmall: item.poster.previewUrl,
            trailers: item.videos.trailers,
            backdrop: item.backdrop.url,
            logo: item.logo.url,
            id: item.id
        }
    }

    const _transformGenreFilms = (item) => {
        return {
            name: item.name,
            posterSmall: item.poster.previewUrl,
            alternativeName: item.alternativeName,
            rating: item.rating.imdb || item.rating.kp || item.rating.filmCritics,
            year: item.year,
            country: item.countries,
            genre: item.genres,
            movieLength: item.movieLength,
            ageRating: item.ageRating,
            id: item.id
        }
    }

    const _transformGenres = (item) => {
        return {
            filter: item.name
        }
    }

    return {getTopFilms, getAllFilms, getFilmForId, getActorForId, getGanreFilms, getAllFilters, loading, error, clearError, getSearchedFilms}
}

export default useWatchService;