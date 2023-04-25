import React from "react";
import { useEffect, useRef, useState } from 'react';

import upArrow from "../../resources/img/up-arrow.svg"

import './dropdown.scss'

const Dropdown = ({initCurrent, list, filterFilm}) => {
    const [dropdownToggle, setDropdownToggle] = useState(false)
    const [currentDropdown, setCurrentDropdown] = useState(initCurrent)

    const ref = useRef()

    useEffect(() => {
        const clickOutElement = (e) => {
            if (dropdownToggle && ref.current && !ref.current.contains(e.target)) {
                setDropdownToggle(false)
            }
        }
    
        document.addEventListener("mousedown", clickOutElement)
    
        return function() {
          document.removeEventListener("mousedown", clickOutElement)
        }
    }, [dropdownToggle])

    const onDropdownActive = () => {
        setDropdownToggle(dropdownToggle => !dropdownToggle)
    }

    const onSetCurrentDropdown = (e) => {
        switch (initCurrent) {
            case 'Жанры':
                filterFilm({genre: e.currentTarget.textContent})
                break;
            case 'Страны':
                filterFilm({country: e.currentTarget.textContent})
                break;
            case 'Каталог':
                filterFilm({type: e.currentTarget.textContent, typeNum: e.currentTarget.id})
                break;
            case 'Рейтинг':
                filterFilm({rating: e.currentTarget.textContent})
                break;
            case 'Год выхода':
                filterFilm({year: e.currentTarget.textContent})
                break;
        }
        
        if (e.currentTarget.textContent === 'Все')  {
            setCurrentDropdown(initCurrent)
        } else {
            setCurrentDropdown(e.currentTarget.textContent === currentDropdown ? initCurrent : e.currentTarget.textContent)
        }
        setDropdownToggle(false)
    }

    const filterList = list.map((item, i) => {
        return (
            <li key={i} id={item.filterNum} onClick={onSetCurrentDropdown}className="dropdown__menu-item">{item.filter}</li>
        )
    })

    return (
        <div ref={ref} className={`dropdown ${dropdownToggle ? 'active' : ''} ${initCurrent === 'Каталог' ? 'catalog' : ''}`} tabIndex="1">
            <div className="dropdown__current" onClick={onDropdownActive}>
                <div className="dropdown__current-item">{currentDropdown}</div>
                <img src={upArrow} alt="" />
            </div>
            <ul className="dropdown__menu">
                <li onClick={onSetCurrentDropdown} className="dropdown__menu-item">Все</li>
                {filterList}
            </ul>
        </div>
    );
};

export default Dropdown;