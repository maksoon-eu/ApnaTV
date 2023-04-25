import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../header/Header";
import MainPage from "../page/MainPage";
import FilmListPage from "../page/FilmListPage";
import Footer from "../footer/Footer";

import '../../style/style.scss'

const App = () => {
    return (
        <Router>
            <div className="app">
                <Header/>
                <div className="app__global">
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/films" element={<FilmListPage/>}/>
                    </Routes>
                <Footer/>
                </div>
            </div>
        </Router>
    );
}

export default App;

