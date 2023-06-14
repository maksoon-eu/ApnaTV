import React, { useEffect, useLayoutEffect, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Header from "../header/Header";
import MainPage from "../page/MainPage";
import FilmListPage from "../page/FilmListPage";
import FilmPage from "../page/FilmPage";
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

    useEffect(() => {
        const clearLocalStorage = () => {
            localStorage.clear()
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
                    <TransitionGroup component={null}>
                        <CSSTransition 
                            key={location.key} 
                            classNames="page__animation" 
                            timeout={250}
                            unmountOnExit
                            mountOnEnter
                        >
                            <Routes location={location}>
                                <Route path="/" element={<MainPage/>}/>
                                <Route path="/films" element={<FilmListPage/>}/>
                                <Route path="/films/:filmId" element={<FilmPage/>}/>
                            </Routes>
                        </CSSTransition>
                    </TransitionGroup>
                </Wrapper>
            <BottomPanel/>
            <Footer/>
            </div>
        </div>
    );
}

export default App;

