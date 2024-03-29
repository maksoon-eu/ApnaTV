import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { motion } from 'framer-motion';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import useWatchService from "../../services/WatchService";
import { ThemeContext } from "../theme/Theme";

import ErrorMessage from "../errorMessage/ErorrMessage"

import clean from "../../resources/img/clean.svg"
import loadingImg from "../../resources/img/loading.svg";
import logo from '../../resources/img/logo.svg';
import image from '../../resources/img/image.jpg'

import './header.scss';

const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const {error, loading, getSearchedFilms} = useWatchService();
    
    const [searchActive, setSearchActive] = useState(false);
    const [films, setFilms] = useState([]);
    const [name, setName] = useState(' ');

    const ref = useRef();
    const refinput = useRef();
    const refCheckbox = useRef();

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    };
    
    useEffect(() => {
        onRequest(name)
        // eslint-disable-next-line
    }, [name])

    useEffect(() => {
        const clickOutElement = (e) => {
            if (searchActive && ref.current && !ref.current.contains(e.target)) {
                setSearchActive(false)
            }
        }
    
        document.addEventListener("mousedown", clickOutElement)
    
        return function() {
          document.removeEventListener("mousedown", clickOutElement)
        }
    }, [searchActive])

    useEffect(() => {
        if (theme === 'dark-theme') {
            refCheckbox.current.checked = false;
        } else {
            refCheckbox.current.checked = true;
        }
        
    }, [theme])

    const onRequest = (name) => {
        getSearchedFilms(encodeURI(name))
            .then(onFilmsLoaded)
    }

    const onFilmsLoaded = (films) => {
        setFilms(films)
    }

    const onSearchActive = () => {
        setSearchActive(true)
    }

    const onSearchNoneActive = () => {
        setSearchActive(false)
    }

    const onValueChange = (e) => {
        setName(e.target.value)
    }

    const removeInputValue = () => {
        refinput.current.value = ''
        setName(' ')
        refinput.current.focus()
    }

    const searchedFilms = films.map(item => {
        return (
            <motion.div
            key={item.id}
            className="mb"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}>
                <Link to={`/films/${item.id}`} className="search__menu-item" onClick={() => {removeInputValue(); onSearchNoneActive()}}>
                    <div className="search__item-img">
                        <LazyLoadImage 
                            width='100%' height='100%'
                            effect="blur"
                            placeholderSrc={loadingImg}
                            src={!item.posterSmall ? image : item.posterSmall}
                            alt={item.name}
                        />
                    </div>
                    <div className="search__item-info">
                        <div className="search__item-name">{item.name === '' ? item.alternativeName : item.name}</div>
                        <div className="search__item-group">
                            <div className={`search__item-rating ${item.rating >= 7 ? 'rating__green' : ''} ${item.rating <= 7 && item.rating >= 5 ? 'rating__yellow' : ''} ${item.rating <= 5 ? 'rating__red' : ''}`}>{item.rating}</div>
                            <div className="search__item-year">{item.year}</div>
                        </div>
                    </div>
                </Link>
            </motion.div>
        )
    })

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <img style={{margin: '0 auto', width: '160px', display: 'block', marginTop: '50px'}} src={loadingImg} alt="loading" /> : null
    const content = !(loading || error) ? searchedFilms : null
    const noneRes = !(searchedFilms.length || loading || error) ? <h3 className="noneTitle">Не найдено</h3> : content

    return (
        <header>
            <div className="header__inner">
                <Link to="/films" className="header__item header__item-adaptive">
                    <div className="header__item-text header__link">
                        <div>Каталог</div>
                    </div>
                </Link>
                <div className="header__item">
                    <div className="header__item-logo">
                        <Link to="/">
                            <img src={logo} alt="ApnaTV" />
                        </Link>
                    </div>
                </div>
                <div className="header__item header__item--theme">
                    <div className="theme">
                    <motion.div layout transition={spring}><input onClick={() => toggleTheme()} className="input__theme" type="checkbox" id="switch" ref={refCheckbox}/><label className="label__theme" htmlFor="switch">Toggle</label></motion.div>
                    </div>
                    <div className="header__item-account">
                        <div ref={ref} className={`search ${searchActive ? 'active' : ''}`} tabIndex="1">
                            <div className="search__current" onClick={onSearchActive}>
                                <div onClick={removeInputValue} className={`cleanInput ${searchActive ? 'cleanInput--active' : ''}`}>
                                    <img src={clean} alt="" />
                                </div>
                                <input ref={refinput} className={`${searchActive ? 'focus' : ''}`} type="text" onInput={onValueChange} placeholder="Название..."/>
                                <div className="header__account-img">
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.71 16.79L14.31 13.4C15.407 12.0025 16.0022 10.2767 16 8.5C16 6.91775 15.5308 5.37103 14.6518 4.05544C13.7727 2.73984 12.5233 1.71446 11.0615 1.10896C9.59966 0.503462 7.99113 0.345036 6.43928 0.653718C4.88743 0.962399 3.46197 1.72433 2.34315 2.84315C1.22433 3.96197 0.462403 5.38743 0.153721 6.93928C-0.15496 8.49113 0.00346625 10.0997 0.608967 11.5615C1.21447 13.0233 2.23985 14.2727 3.55544 15.1518C4.87103 16.0308 6.41775 16.5 8 16.5C9.77666 16.5022 11.5025 15.907 12.9 14.81L16.29 18.21C16.383 18.3037 16.4936 18.3781 16.6154 18.4289C16.7373 18.4797 16.868 18.5058 17 18.5058C17.132 18.5058 17.2627 18.4797 17.3846 18.4289C17.5064 18.3781 17.617 18.3037 17.71 18.21C17.8037 18.117 17.8781 18.0064 17.9289 17.8846C17.9797 17.7627 18.0058 17.632 18.0058 17.5C18.0058 17.368 17.9797 17.2373 17.9289 17.1154C17.8781 16.9936 17.8037 16.883 17.71 16.79ZM2 8.5C2 7.31331 2.3519 6.15327 3.01119 5.16658C3.67047 4.17988 4.60755 3.41085 5.7039 2.95672C6.80026 2.5026 8.00666 2.38378 9.17055 2.61529C10.3344 2.8468 11.4035 3.41824 12.2426 4.25736C13.0818 5.09647 13.6532 6.16557 13.8847 7.32946C14.1162 8.49334 13.9974 9.69974 13.5433 10.7961C13.0892 11.8925 12.3201 12.8295 11.3334 13.4888C10.3467 14.1481 9.18669 14.5 8 14.5C6.4087 14.5 4.88258 13.8679 3.75736 12.7426C2.63214 11.6174 2 10.0913 2 8.5Z" fill={`${searchActive ? '#FA4776' : '#F8F8F8'}`}/>
                                    </svg>
                                </div>
                            </div>
                            <ul className="search__menu">
                                {errorMessage}  
                                {spinner} 
                                {noneRes}
                            </ul>
                        </div>
                        <div className="header__account-text header__link" style={{display: 'none'}}>
                            <Link to="/">Аккаунт</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;