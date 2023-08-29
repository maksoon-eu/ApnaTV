import React from "react";
import { useEffect, useRef, useState } from 'react';

import upArrow from "../../resources/img/up-arrow.svg"

import './dropdown.scss'

const Dropdown = ({loading, error, initCurrent, localStr, list, filterFilm, fetching, filter}) => {
    const [dropdownToggle, setDropdownToggle] = useState(false)
    const [currentDropdown, setCurrentDropdown] = useState(localStorage.getItem(localStr) === null ? initCurrent : decodeURIComponent(localStorage.getItem(localStr)))

    const ref = useRef()

    useEffect(() => {
        if (filter === '%21null') {
            setCurrentDropdown(initCurrent)
        }
    }, [filter])

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
        if (!(loading || error)) {
            if (!dropdownToggle) {
                setTimeout(() => {
                    setDropdownToggle(true)
                }, 200)
            } else {
                setDropdownToggle(false)
            }
        }
    }

    const onSetCurrentDropdown = (e) => {
        if (!(loading || error || fetching)) {
            switch (initCurrent) {
                case 'Жанры':
                    filterFilm({genre: e.currentTarget.textContent})
                    localStorage.setItem('viewGenre', e.currentTarget.textContent)
                    break;
                case 'Страны':
                    filterFilm({country: e.currentTarget.textContent})
                    localStorage.setItem('viewCountry', e.currentTarget.textContent)
                    break;
                case 'Каталог':
                    filterFilm({type: e.currentTarget.textContent, typeNum: e.currentTarget.id})
                    localStorage.setItem('viewType', e.currentTarget.textContent)
                    break;
                case 'Рейтинг':
                    filterFilm({rating: e.currentTarget.textContent, ratingType: e.currentTarget.id})
                    localStorage.setItem('viewRating', e.currentTarget.textContent)
                    break;
                case 'Год выхода':
                    filterFilm({year: e.currentTarget.textContent})
                    localStorage.setItem('viewYear', e.currentTarget.textContent)
                    break;
            }
            if (e.currentTarget.textContent === 'Все')  {
                setCurrentDropdown(initCurrent)
            } else {
                setCurrentDropdown(e.currentTarget.textContent === currentDropdown ? initCurrent : e.currentTarget.textContent)
            }
            setDropdownToggle(false)
        }
    }

    const filterList = list.map((item, i) => {
        return (
            <li key={i} id={item.filterNum} onClick={onSetCurrentDropdown}className={`dropdown__menu-item ${currentDropdown === item.filter ? 'active' : ''}`}>{item.filter}</li>
        )
    })

    return (
        <div ref={ref} className={`dropdown ${dropdownToggle ? 'active' : ''} ${initCurrent === 'Каталог' ? 'catalog' : ''}`} tabIndex="1">
            <div className="dropdown__current" onClick={onDropdownActive}>
                <div className="dropdown__current-item">{currentDropdown}</div>
                <img src={upArrow} alt="" />
            </div>
            <ul className="dropdown__menu">
                <li onClick={onSetCurrentDropdown} className={`dropdown__menu-item ${currentDropdown === initCurrent ? 'active' : ''}`}>Все</li>
                {filterList}
            </ul>
        </div>
    );
};

export default Dropdown;