import React, { useEffect, useLayoutEffect, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeContext } from "../theme/Theme";

import Header from "../header/Header";
import MainPage from "../page/MainPage";
import FilmListPage from "../page/FilmListPage";
import FilmPage from "../page/FilmPage";
import ActorPage from "../page/ActorPage";
import BottomPanel from "../bottomPanel/BottomPanel";
import Footer from "../footer/Footer";

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
    document.querySelector('html').className = theme;

    useEffect(() => {
        const clearLocalStorage = () => {
            for (var i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);    
                if (key !== 'theme' & key !== 'type' & key !== 'licked' & key !== 'genre' & key !== 'country' & key !== 'rating' & key !== 'viewGenre' & key !== 'viewType' & key !== 'viewCountry' & key !== 'viewRating') {       
                    localStorage.removeItem(key);  
                } 
            }
        }
        window.addEventListener('beforeunload', clearLocalStorage)
        return () => {
            window.removeEventListener('beforeunload', clearLocalStorage)
        }
    }, [])

    return (
        <div className={`app ${theme}`}>
            <Header/>
            <div className="app__global">
                <Wrapper>
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/films" element={<FilmListPage/>}/>
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

