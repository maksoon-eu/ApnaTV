import React, { useEffect, useLayoutEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

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
    const { theme } = useContext(ThemeContext);

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
        <Router>
            <div className={`app ${theme}`}>
                <Header/>
                <div className="app__global">
                    <Wrapper>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/films" element={<FilmListPage/>}/>
                        <Route path="/films/:filmId" element={<FilmPage/>}/>
                    </Routes>
                    </Wrapper>
                <BottomPanel/>
                <Footer/>
                </div>
            </div>
        </Router>
    );
}

export default App;

