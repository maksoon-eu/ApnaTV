import { useState } from 'react';

import upArrow from "../../resources/img/up-arrow.svg"

import './dropdown.scss'

const Dropdown = ({initCurrent, list, filterFilm}) => {
    const [dropdownToggle, setDropdownToggle] = useState(false)
    const [currentDropdown, setCurrentDropdown] = useState(initCurrent)

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
        setCurrentDropdown(e.currentTarget.textContent === currentDropdown ? initCurrent : e.currentTarget.textContent)
        setDropdownToggle(false)
    }

    const filterList = list.map((item, i) => {
        return (
            <li key={i} id={item.filterNum} onClick={onSetCurrentDropdown}className="dropdown__menu-item">{item.filter}</li>
        )
    })

    return (
        <div className={`dropdown ${dropdownToggle ? 'active' : ''} ${initCurrent === 'Каталог' ? 'catalog' : ''}`} tabIndex="1">
            <div className="dropdown__current" onClick={onDropdownActive}>
                <div className="dropdown__current-item">{currentDropdown}</div>
                <img src={upArrow} alt="" />
            </div>
            <ul className="dropdown__menu">
                {filterList}
            </ul>
        </div>
    );
};

export default Dropdown;