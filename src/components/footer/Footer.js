import React from "react";
import { Link } from "react-router-dom";

import logo from "../../resources/img/logo.svg"

import './footer.scss'

const Footer = () => {
    return (
        <footer>
            <div className="footer__inner">
                <div className="footer__inner-block">
                    <div className="footer__logo">
                        <Link to="/">
                            <img src={logo} alt="ApnaTV" />
                        </Link>
                    </div>
                </div>
                <div className="footer__inner-block footer__inner-block-hide">
                    <ul className="footer__list">
                        <li className="footer__list-item">
                            <Link to="/">Главная</Link>
                        </li>
                        <li className="footer__list-item">
                            <Link to="/films">Фильмы</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer__inner-block">
                    <div className="footer__help">Служба поддержки</div>
                    <div className="icons">
                        <ul>
                            <li className="vk">
                                <Link to="https://vk.com/baranchek1">
                                    <i className="fa w24 fa-vk fa-lg" aria-hidden="true"/>
                                </Link>
                            </li>
                            <li className="telegram">
                                <Link to="https://t.me/makso0on">
                                    <i className="fa w22 fa-telegram fa-lg" aria-hidden="true"/>
                                </Link>
                            </li>
                            <li className="instagram">
                                <Link to="https://instagram.com/maksim.ka_bv?igshid=NTc4MTIwNjQ2YQ==">
                                    <i className="fa fa-instagram fa-lg" aria-hidden="true"/>
                                </Link>
                            </li>
                            <li className="google">
                                <Link to="https://baranovmaks05@gmail.com">
                                    <i className="fa fa-google fa-lg" aria-hidden="true"/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer__line"></div>
            <div className="footer__underline">
                <div className="footer__underline-block">© 2003–2022 «ApnaTV». Все права защищены</div>
                <div className="footer__underline-block">При полном или частичном использовании материалов с сайта ссылка на источник обязательна.</div>
            </div>
        </footer>
    );
};

export default Footer;