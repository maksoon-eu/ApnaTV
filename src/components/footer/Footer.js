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
                <div className="footer__inner-block">
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
                                <Link>
                                    <i className="fa w24 fa-vk fa-lg" aria-hidden="true"/>
                                </Link>
                            </li>
                            <li className="telegram">
                                <Link>
                                    <i className="fa w22 fa-telegram fa-lg" aria-hidden="true"/>
                                </Link>
                            </li>
                            <li className="instagram">
                                <Link>
                                    <i className="fa fa-instagram fa-lg" aria-hidden="true"/>
                                </Link>
                            </li>
                            <li className="google">
                                <Link>
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