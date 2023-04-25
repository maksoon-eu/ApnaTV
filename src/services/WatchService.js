import { useHttp } from "../hooks/http.hook";

const useWatchService = () => {
    const {loading, request, error, clearError} = useHttp()

    const _apiBase = 'https://api.kinopoisk.dev/v1/';
    const _baseOffset = 1;
    const _baseCurrent = '%21null';

    const getAllFilms = async (offset = _baseOffset, type = _baseCurrent, year = _baseCurrent, rating = _baseCurrent, genre = _baseCurrent, country = _baseCurrent) => {
        const res = await request(`${_apiBase}movie?selectFields=name%20id%20typeNumber%20movieLength%20ageRating%20countries.name%20genres.name%20year%20rating.imdb%20poster.previewUrl&page=${offset}&limit=28&typeNumber=${type}&year=${year}&rating.imdb=${rating}&premiere.country=${country}&poster.previewUrl=%21null&genres.name=${genre}`);

        return {
            itemList: res.docs.map(_transformGenreFilms),
            total: res.total
        }
    }

    const getSearchedFilms = async (name = _baseCurrent) => {
        const res = await request(`https://api.kinopoisk.dev/v1.2/movie/search?page=1&limit=10&query=${name}`);

        return res.docs.map(_transformSearchedFilms)
    }

    const getTopFilms = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}movie?selectFields=logo%20backdrop.url%20id%20name%20rating.imdb%20rating.kp%20shortDescription%20poster.previewUrl%20poster.url%20videos.trailers.url%20videos.trailers.name%20videos.trailers.site%20videos.trailers.type&page=${offset}&limit=50&typeNumber=1&year=2015-2100&poster.url=%21null&poster.previewUrl=%21null&videos.trailers=%21null&videos.trailers.site=youtube&videos.trailers.type=TRAILER&rating.kp=%21null&logo.url=%21null&backdrop.url=%21null&rating.imdb=6-10`);

        return res.docs.map(_transformTopFilms)
    }

    const getGanreFilms = async (genre, offset = _baseOffset) => {
        const res = await request(`${_apiBase}movie?selectFields=id%20name%20movieLength%20ageRating%20countries.name%20genres.name%20year%20rating.imdb%20poster.previewUrl&page=${offset}&limit=24&year=2015-2100&poster.url=%21null&poster.previewUrl=%21null&typeNumber=1&genres.name=${genre}&rating.imdb=6-10`);

        return res.docs.map(_transformGenreFilms)
    }

    const getAllFilters = async (url) => {
        const res = await request(`${_apiBase}movie/${url}`);

        return res.map(_transformGenres)
    }

    const _transformSearchedFilms = (item) => {
        return {
            name: item.name,
            alternativeName: item.alternativeName,
            posterSmall: item.poster,
            rating: item.rating,
            year: item.year,
            id: item.id
        }
    }

    const _transformTopFilms = (item) => {
        return {
            name: item.name, 
            ratingImdb: item.rating.imdb, 
            ratingKp: item.rating.kp, 
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
            ratingImdb: item.rating.imdb, 
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

    return {getTopFilms, getAllFilms, getGanreFilms, getAllFilters, loading, error, clearError, getSearchedFilms}
}

export default useWatchService;