import { useHttp } from "../hooks/http.hook";

const useWatchService = () => {
    const {loading, request, error, clearError} = useHttp()

    const _apiBase = 'https://api.kinopoisk.dev/v1/';
    const _corsBase = 'https://cors-anywhere.herokuapp.com/';
    const _baseOffset = 1;
    const _baseCurrent = '%21null';

    const getAllFilms = async (offset = _baseOffset, type = _baseCurrent, year = _baseCurrent, rating = _baseCurrent, genre = _baseCurrent, country = _baseCurrent) => {
        const res = await request(`${_apiBase}movie?selectFields=name%20id%20typeNumber%20genres.name%20year%20rating.imdb%20poster.previewUrl&page=${offset}&limit=20&typeNumber=${type}&year=${year}&rating.imdb=${rating}&premiere.country=${country}&poster.previewUrl=%21null&genres.name=${genre}`);

        return res.docs.map(_transformGenreFilms)
    }

    const getTopFilms = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}movie?selectFields=id%20name%20rating.imdb%20rating.kp%20description%20poster.previewUrl%20poster.url%20videos.trailers.url&page=${offset}&limit=50&typeNumber=1%203&year=2015-2100&poster.url=%21null&poster.previewUrl=%21null&videos.trailers=%21null&rating.kp=%21null&rating.imdb=%21null`);

        return res.docs.map(_transformTopFilms)
    }

    const getGanreFilms = async (genre, offset = _baseOffset) => {
        const res = await request(`${_apiBase}movie?selectFields=id%20name%20poster.previewUrl&page=${offset}&limit=24&year=2015-2100&poster.url=%21null&poster.previewUrl=%21null&typeNumber=1%203&rating.kp=%21null&rating.imdb=%21null&genres.name=${genre}`);

        return res.docs.map(_transformGenreFilms)
    }

    const getPoster = async (id) => {
        const res = await request(`${_apiBase}image?selectFields=url&page=1&limit=10&movieId=${id}`);

        const resImg = res.docs.map(_transformPoster)
        .map(value => ({ value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

        return await request(`${_corsBase}${resImg[0].url}`);
    }

    const getAllFilters = async (url) => {
        const res = await request(`${_apiBase}movie/${url}`);

         return res.map(_transformGenres)
    }

    const _transformTopFilms = (item) => {
        return {
            name: item.name, 
            ratingImdb: item.rating.imdb, 
            ratingKp: item.rating.kp, 
            description: item.description, 
            posterBig: item.poster.url, 
            posterSmall: item.poster.previewUrl,
            trailers: item.videos.trailers,
            id: item.id
        }
    }

    const _transformGenreFilms = (item) => {
        return {
            name: item.name,
            posterSmall: item.poster.previewUrl,
            id: item.id
        }
    }

    const _transformPoster = (item) => {
        return {
            url: item.url
        }
    }

    const _transformGenres = (item) => {
        return {
            filter: item.name
        }
    }

    return {getTopFilms, getAllFilms, getPoster, getGanreFilms, getAllFilters, loading, error, clearError}
}

export default useWatchService;