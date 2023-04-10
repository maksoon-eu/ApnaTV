import GenreSlider from '../genreSlider/GenreSlider';
import MainSlider from '../mainSlider/MainSlider'

const MainPage = () => {
    return (
        <>
            <MainSlider/>
            <GenreSlider genre={'боевик'}/>
            <GenreSlider genre={'комедия'}/>
            <GenreSlider genre={'фантастика'}/>
            <GenreSlider genre={'ужасы'}/>
            <GenreSlider genre={'драма'}/>
            <GenreSlider genre={'приключения'}/>
        </>
    );
};

export default MainPage;