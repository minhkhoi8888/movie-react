import "./Footer.scss";

import footer from "../../asset/footer.jpg";
import Logo2 from "../../asset/logo2.png";

import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div 
            className="footer"
            style = {{backgroundImage: `url(${footer})`}}
        >
            <div className="footer__content">
                <div className="footer__content__logo">
                    <img src={Logo2} alt="logo" />
                    <div className="footer__content__social">
                        <a href="http://facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
                        <a href="http://youtube.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-youtube"></i></a>
                        <a href="http://twitter.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"></i></a>
                        <a href="http://instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
                        <a href="http://github.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i></a>
                    </div>
                    <div className="footer__content__copy">
                        copyright 2022 <i className="bi bi-emoji-sunglasses"></i>
                    </div>
                </div>
                <div className="footer__content__menus">
                    <div className="footer__content__menu">
                        <Link to="/">Home</Link>
                        <Link to="/">Contact us</Link>
                        <Link to="/">Term of services</Link>
                        <Link to="/">About us</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Pravacy policy</Link>
                    </div>
                    <div className="footer__content__menu">
                        <Link to="/">You must watch</Link>
                        <Link to="/">Recent release</Link>
                        <Link to="/">Top IMDB</Link>
                        {/* <Link to="/">Box Office</Link> */}
                    </div>
                </div>
            </div>    
        </div>
    )
}

export default Footer