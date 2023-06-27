import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useWatchService from "../../services/WatchService";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

import ActorsSlider from "../actorsSlider/ActorsSlider";
import ErrorMessage from "../errorMessage/ErorrMessage";
import SkeletonActor from "../skeleton/SkeletonActor";

import loadingImg from "../../resources/img/loading.svg";
import image from '../../resources/img/image.jpg'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import './actor.scss'
import '../genreSlider/genreSlider.scss'

const Actor = () => {
    const [actor, setActor] = useState([]);
    const [name, setName] = useState()
    const [birthday, setBirthday] = useState()
    const [death, setDeath] = useState()
    const [birthPlace, setBirthPlace] = useState([])
    const [profession, setProfession] = useState([])
    const [spouses, setSpouses] = useState([])
    const [thisActorFilms, setThisActorFilms] = useState([])

    const {actorId} = useParams()
    const {error, loading, getActorForId} = useWatchService();
    
    useEffect(() => {
        onRequest()
        // eslint-disable-next-line
    }, [actorId])

    const onRequest = () => {
        getActorForId(actorId)
            .then(onActorLoaded)
    }

    const setData = (init, setInit) => {
        const data = init === null ? '...' : init.slice(0, 10).split('-')
        switch (data[1]) {
            case '01':
                setInit([data[2], ' января ', data[0]])
                break;
            case '02':
                setInit([data[2], ' февраля ', data[0]])
                break;
            case '03':
                setInit([data[2], ' марта ', data[0]])
                break;
            case '04':
                setInit([data[2], ' апреля ', data[0]])
                break;
            case '05':
                setInit([data[2], ' мая ', data[0]])
                break;
            case '06':
                setInit([data[2], ' июня ', data[0]])
                break;
            case '07':
                setInit([data[2], ' июля ', data[0]])
                break;
            case '08':
                setInit([data[2], ' августа ', data[0]])
                break;
            case '09':
                setInit([data[2], ' сентября ', data[0]])
                break;
            case '10':
                setInit([data[2], ' октября ', data[0]])
                break;
            case '11':
                setInit([data[2], ' ноября ', data[0]])
                break;
            case '12':
                setInit([data[2], ' декабря ', data[0]])
                break;
            default:
                setInit('...')
                break;
        }
    }

    const onActorLoaded = (actor) => {
        setActor(actor)

        setBirthPlace(actor[0].birthPlace === null ? '...' : 
            actor[0].birthPlace.map((item, i) => 
                <div className="actors__text" key={i}>{item.value}</div>
            )
        )
        setThisActorFilms(actor[0].movies.filter(item => item.enProfession === 'actor' && item.name !== null))
        setName(actor[0].name === null ? actor[0].alternativeName : actor[0].name)
        setProfession(actor[0].profession === null ? '...' : 
            actor[0].profession.map((item, i) => 
                <div className="actors__text" key={i}>{item.value}</div>
            )
        )
        setData(actor[0].birthday, setBirthday)
        setData(actor[0].death, setDeath)
        setSpouses(actor[0].spouses.length === 0 ? '...' : 
            actor[0].spouses.map(item =>
                <Link to={`/actors/${item.id}`} key={item.id}>
                    <div className="spouses__name">{item.relation}: {item.name === null ? '...' : item.name}, дети: {item.children === null ? 0 : item.children }</div>
                </Link>
            )
        )
    }

    const mainContent = actor.map(item => {
        return (
            <div className="actorInfo" key={item.id}>
                <motion.div
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}>
                <div className="actorInfo__flex">
                    <div className="actorInfo__flex-left">
                        <div className="actorInfo__photo">
                            <LazyLoadImage 
                                width='100%' height='100%'
                                effect="blur"
                                placeholderSrc={loadingImg}
                                src={item.photo === null ? image : item.photo}
                                alt={item.name}
                            />
                        </div>
                    </div>
                    <div className="actorInfo__flex-rigth">
                        <div className="actorInfo__name">
                            <div className="actorInfo__ruName">{item.name === null ? '...' : item.name}</div>
                            <div className="actorInfo__enName">{item.enName === null ? '...' : item.enName}</div>
                        </div>
                        <table className="choseFilm__table">
                            <tbody> 
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Карьера</th>
                                    <td className="choseFilm__text">{item.profession === 0 ? '...' : profession}</td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Дата рождения</th>
                                    <td className="choseFilm__text">{item.birthday === null ? '...' : birthday}</td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Место рождения</th>
                                    <td className="choseFilm__text">{item.birthPlace === null ? '...' : birthPlace}</td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Возраст</th>
                                    <td className="choseFilm__text">{item.age === null ? '...' : item.age}</td>
                                </tr>
                                <tr className="choseFilm__row" style={{display: item.death === null ? 'none' : 'block'}}>
                                    <th className="choseFilm__title">Дата смерти</th>
                                    <td className="choseFilm__text">{death}</td>
                                </tr>
                                <tr className="choseFilm__row">
                                    <th className="choseFilm__title">Семейные отношения</th>
                                    <td className="choseFilm__text">{spouses}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </motion.div>
            </div>
        )
    })

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <SkeletonActor/> : null
    const content =  !(loading || error) ? mainContent : null

    return (
        <div className="actor">
            {errorMessage}
            {spinner}
            {content}
            <ActorsSlider actorFilmList={thisActorFilms} loading={loading} error={error} name={name}/>
        </div>
    );
};

export default Actor;