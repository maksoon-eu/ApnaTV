import React from "react";
import { useState, useEffect } from "react";

const ErrorMessage = () => {
    const [rotate, setRotate] = useState(0)

    // useEffect(() => {
    //     window.addEventListener('mousemove', looking);

    //     return function() {
    //         window.removeEventListener('mousemove', looking);
    //     }
    // }, [])

    // const looking = (e) => {
    //     var eye = $('.eye');
    //     var x = (eye.offset().left) + (eye.width() / 2);
    //     var y = (eye.offset().top) + (eye.height() / 2);
    //     var rad = Math.atan2(e.pageX - x, e.pageY - y);
    //     var rot = (rad * (180 / Math.PI) * -1) + 180;
    //   }
    return (
        <div>
            <span class='error-num'>5</span>
            <div class='eye' style={{transform: 'rotate(' + rotate + 'deg)'}}></div>
            <div class='eye' style={{transform: 'rotate(' + rotate + 'deg)'}}></div>
            <p class='sub-text'>О нет, мои глаза! Что-то пошло не так. Мы уже смотрим, что произошло.</p>
        </div>
    )
}

export default ErrorMessage;