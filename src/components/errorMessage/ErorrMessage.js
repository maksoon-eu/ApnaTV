import React from "react";
import { useState, useEffect, useRef } from "react";

import './errorMessage.scss'

const ErrorMessage = () => {
    const [rotate, setRotate] = useState(0)

    const ref = useRef()

    useEffect(() => {
        window.addEventListener('mousemove', looking);

        return function() {
            window.removeEventListener('mousemove', looking);
        }
    }, [])

    const looking = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const eyeX = (rect.left + rect.right) / 2;
        const eyeY = (rect.top + rect.bottom) / 2;
        setRotate(- Math.atan2(eyeX - e.pageX, eyeY - e.pageY));
    }
    
    return (
        <div className="eye__flex eye__margin">
            <div className="error__eye">
                <span class='error-num'>5</span>
                <div className="eye__block">
                    <div ref={ref} class='eye' style={{transform: 'rotate(' + rotate + 'rad)'}}></div>
                    <div ref={ref} class='eye' style={{transform: 'rotate(' + rotate + 'rad)'}}></div>
                </div>
            </div>
            <p class='sub-text'>О нет, мои глаза! Что-то пошло не так.
            <br />
            Мы уже смотрим, что произошло.</p>
        </div>
    )
}

export default ErrorMessage;