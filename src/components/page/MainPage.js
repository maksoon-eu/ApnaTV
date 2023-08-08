import { useCookies } from 'react-cookie';
import { motion } from "framer-motion";

import SkeletonSlider from '../skeleton/SkeletonSlider';
import Slider from 'react-slick';
import GenreSlider from '../genreSlider/GenreSlider';
import MainSlider from '../mainSlider/MainSlider'

import 'react-lazy-load-image-component/src/effects/blur.css';
import '../filmListItem/filmListItem.scss'
import FilmListItem from '../filmListItem/FilmListItem';

const MainPage = ({onLicked}) => {
    const [cookies] = useCookies(['licked']);
    const skeletonArr = ['', '', '', '', '', ''];

    const lickedFilms = (arr) => {
        if (arr !== undefined) {
            return arr.map(item => {
                return (
                    <FilmListItem key={item.id} item={item} onLicked={onLicked}/>
                )
            })
        }
    }

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
              breakpoint: 1230,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 870,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 550,
              settings: {
                slidesToShow: 3
              }
            }
        ]
    };

    const skeletonList = skeletonArr.map((item, i) => {
        return (
            <SkeletonSlider key={i}/>
        )
    })

    const spinner = cookies.licked === undefined ? skeletonList : null
    const contentLickedFilms = cookies.licked !== undefined ? lickedFilms(cookies.licked) : null

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
            <MainSlider/>
            <div className="app__inner">
                <GenreSlider onLicked={onLicked} genre={'боевик'}/>
                <GenreSlider onLicked={onLicked} genre={'комедия'}/>
                <GenreSlider onLicked={onLicked} genre={'фантастика'}/>
                <GenreSlider onLicked={onLicked} genre={'ужасы'}/>
                <GenreSlider onLicked={onLicked} genre={'драма'}/>
                <GenreSlider onLicked={onLicked} genre={'приключения'}/>

                <div className="choseFilm__slider" style={{display: cookies.licked === undefined ? 'none' : cookies.licked.length > 0 ? 'block' : 'none'}}>
                    <div className="genre__title">Вам понравилось</div>
                    <Slider {...settings} className="main__slider genre__slider">
                        {spinner}  
                        {contentLickedFilms}  
                    </Slider>
                </div>
                
            </div>
        </motion.div>
    );
};

export default MainPage;