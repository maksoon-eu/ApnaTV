import React, { useEffect, useLayoutEffect, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useCookies } from 'react-cookie';

import Header from "../header/Header";
import MainPage from "../page/MainPage";
import FilmListPage from "../page/FilmListPage";
import FilmPage from "../page/FilmPage";
import ActorPage from "../page/ActorPage";
import BottomPanel from "../bottomPanel/BottomPanel";
import Footer from "../footer/Footer";
import { ThemeContext } from "../theme/Theme";

import '../../style/style.scss'

const Wrapper = ({children}) => {
    const location = useLocation();

    useLayoutEffect(() => {
        document.body.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, [location.pathname]);

    return children
} 

const App = () => {
    const location = useLocation();

    const { theme } = useContext(ThemeContext);
    document.querySelector('html').className = theme

    const [cookies, setCookie] = useCookies(['licked']);

    useEffect(() => {
        const clearLocalStorage = () => {
            localStorage.clear()
        }
        window.addEventListener('beforeunload', clearLocalStorage)
        return () => {
            window.removeEventListener('beforeunload', clearLocalStorage)
        }
    }, [])

    const onLicked = (item) => {
        if (cookies.licked !== undefined) {
            if (cookies.licked.length > 0) {
                if (cookies.licked.some(el => el.id === item.id)) {
                    setCookie('licked', cookies.licked.filter(el => el.id !== item.id));
                } else {
                    setCookie('licked', [...cookies.licked, ...[item]]);
                }
            } else {
                setCookie('licked', [item]);
            }
        } else {
            setCookie('licked', [item]);
        }
    }

    return (
        <div className={`app ${theme}`}>
            <Header/>
            <div className="app__global">
                <Wrapper>
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<MainPage onLicked={onLicked}/>}/>
                            <Route path="/films" element={<FilmListPage onLicked={onLicked}/>}/>
                            <Route path="/films/:filmId" element={<FilmPage/>}/>
                            <Route path="/actors/:actorId" element={<ActorPage/>}/>
                        </Routes>
                    </AnimatePresence>
                </Wrapper>
            <BottomPanel/>
            <Footer/>
            </div>
        </div>
    );
}

export default App;

