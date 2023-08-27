import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import SkeletonSlider from "../skeleton/SkeletonSlider"
import ErrorMessage from "../errorMessage/ErorrMessage"

import loadingImg from "../../resources/img/loading.svg";
import image from '../../resources/img/image.jpg'

const ActorsSlider = ({actorFilmList, loading, error, name}) => {
    const skeletonArr = ['', '', '', '', '', '']

    const thisActorFilmList = actorFilmList.map(item => {
        return (
            <Link to={`/films/${item.id}`} key={item.id}>
                <div className="films__item films__item-after">
                    <div className="films__item-img">
                        <LazyLoadImage 
                            width='100%' height='100%'
                            effect="blur"
                            placeholderSrc={loadingImg}
                            src={item.posterSmall === undefined ? image : item.posterSmall}
                            alt={item.name}
                        />
                    </div>
                    <div className="films__item-name">{item.name}</div>
                </div>
            </Link>
        )
    })

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

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? skeletonList : null
    const contentSlider =  !(loading || error) ? thisActorFilmList : null
    return (
        <>
            {thisActorFilmList.length === 0 && !loading ? null :
            <>
                {thisActorFilmList.length > 0 || error || loading ? 
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                        exit={{opacity: 0}}
                        key={loading}
                    >
                        <div className="genre__title" style={{opacity: name === undefined ? '0' : '1'}}>{`Фильмы с участием ${name}`}</div>
                        <Slider {...settings} className="main__slider genre__slider"> 
                            {errorMessage}  
                            {spinner}  
                            {contentSlider}  
                        </Slider>
                    </motion.div>
                </AnimatePresence> : ''}
            </>}
        </>
    );
};

export default ActorsSlider;