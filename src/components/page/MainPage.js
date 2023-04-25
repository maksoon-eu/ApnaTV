import React from "react";
import GenreSlider from '../genreSlider/GenreSlider';
import MainSlider from '../mainSlider/MainSlider'

const MainPage = () => {
    return (
        <>
            <MainSlider/>
            <div className="app__inner">
                <GenreSlider genre={'боевик'}/>
                <GenreSlider genre={'комедия'}/>
                <GenreSlider genre={'фантастика'}/>
                <GenreSlider genre={'ужасы'}/>
                <GenreSlider genre={'драма'}/>
                <GenreSlider genre={'приключения'}/>
            </div>
        </>
    );
};

export default MainPage;