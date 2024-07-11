import React, {useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// @ts-ignore
import Logo from '@assets/head/logo.svg';

// @ts-ignore
import Phone from '@assets/footer/phone.svg';
// @ts-ignore
import Mail from '@assets/footer/mail.svg';
// @ts-ignore
import Location from '@assets/footer/location-pin.svg';
// @ts-ignore
import FaceBook from '@assets/footer/facebook.svg';
// @ts-ignore
import Twitter from '@assets/footer/twitter.svg';
// @ts-ignore
import Insta from '@assets/footer/insta.svg';

import './styles.scss';
import {useTranslation} from 'react-i18next';

const Footer = () => {
    const {t} = useTranslation();

    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: 'ease-in-out',
            once: true
        });
    }, []);

    const handleClick = (event: any) => {
        event.preventDefault();
        const anchor = event.target.getAttribute('href').slice(1); // Получаем якорь без #
        const anchorElement = document.getElementById(anchor);
        if (anchorElement) {
            window.scrollTo({
                top: anchorElement.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="contacts" className="footer" data-aos="fade-up">
            <div className="container">
                <div className="footer-wrapper" data-aos="fade-up">
                    <a href="" data-aos="fade-right">
                        <img src={Logo} alt="logo" width={146} height={44}/>
                        <p className='slogan'>Connecting Ideas Creating Solutions</p>
                    </a>
                    <nav data-aos="fade-up">
                        <a href="#about" onClick={handleClick}>{t('about')}</a>
                        {/*<a href="#projects" onClick={handleClick}>{t('Projects')}</a>*/}
                        {/*<a href="#reviews" onClick={handleClick}>{t('Reviews')}</a>*/}
                        <a href="#solutions" onClick={handleClick}>{t('Solutions')}</a>
                    </nav>
                    <nav data-aos="fade-up">
                        <a href="#partners" onClick={handleClick}>{t('Partners')}</a>
                        {/*<a href="#news" onClick={handleClick}>{t('News')}</a>*/}
                        <a href="#contacts" onClick={handleClick}>{t('Contacts')}</a>
                    </nav>
                    <div className="footer__contacks" data-aos="fade-up">
                        <a href="tel:+77273131317" className="footer__contacks-item">
                            <img src={Phone} alt="" width={24} height={24}/>+ 7 727 313 1317
                        </a>
                        <a href="mailto:info@unifive.pro" className="footer__contacks-item">
                            <img src={Mail} alt="" width={24} height={24}/>
                            info@unifive.pro
                        </a>
                        <a
                            href="https://www.google.com/maps/place/%D0%BF%D1%80-%D1%82.+%D0%A1%D0%B5%D0%B9%D1%84%D1%83%D0%BB%D0%BB%D0%B8%D0%BD%D0%B0+506,+%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B+050000,+%D0%9A%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD/@43.2497311,76.9340505,19.76z/data=!4m6!3m5!1s0x38836ec7430054f9:0x16a3c0a07cdf6a94!8m2!3d43.2495923!4d76.9342478!16s%2Fg%2F11hdkgtr6b?entry=ttu"
                            target="_blank"
                            className="footer__contacks-last-item"
                            data-aos="fade-up"
                        >
                            <img src={Location} alt="" width={24} height={24}/>
                            {t('address')}
                        </a>
                    </div>
                    <div className="footer__action" data-aos="fade-up">
                        <a
                            href="mailto:someone@example.com?subject=Написать в поддержку&body=Здравствуйте, я хотел бы..."
                            className="connect-with-us"
                        >
                            {t('ContactUs')}
                        </a>
                        <div className="footer__action-social">
                            {/*<img src={FaceBook} alt="" data-aos="fade-up"/>*/}
                            {/*<img src={Twitter} alt="" data-aos="fade-up"/>*/}
                            {/*<img src={Insta} alt="" data-aos="fade-up"/>*/}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
