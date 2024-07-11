import React, {FC, useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// @ts-ignore
import AboutImg from '@assets/about/about-img.png';
// @ts-ignore
import AboutImgMobile from '@assets/about/about-img-mobile.png';
// @ts-ignore
import Pattern from '@assets/about/pattern.png';
// @ts-ignore
import PatternMobile from '@assets/about/pattern-mobile.png';

import './styles.scss';
import {useTranslation} from 'react-i18next';
import {HeaderPage} from "@src/hooks/types";
import {useBreakpoints} from "@src/hooks/useBreakpoints";

interface Props {
    headerPage: HeaderPage;
}

const About: FC<Props> = ({headerPage}) => {
    const {isWeb} = useBreakpoints();
    console.log(isWeb, 'isWeb');
    const {t} = useTranslation();

    useEffect(() => {
        AOS.init({
            duration: 1000, // продолжительность анимации
            easing: 'ease-in-out', // эффект анимации
            once: true // анимация будет выполняться только один раз
        });
    }, []);

    return (
        <section id="about" className="about">
            <div className="about-wrapper">
                {isWeb ? (
                    <img
                        src={Pattern}
                        alt=""
                        className="pattern"
                        data-aos="fade-right"
                    />
                ) : (
                    <img
                        src={PatternMobile}
                        alt=""
                        className="pattern"
                        data-aos="fade-left"
                    />
                )}
                <div className="container">
                    <div className="about-content">
                        {isWeb ? (
                            <img
                                src={AboutImg}
                                alt="company"
                                className="about-content__logo"
                                data-aos="fade-up"
                            />
                        ) : (
                            <img
                                src={AboutImgMobile}
                                alt="company"
                                className="about-content__logo"
                                data-aos="fade-down"
                            />
                        )}
                        <div
                            className="about-content__description"
                            data-aos="zoom-in"
                        >
                            <h2>{t('about')}</h2>
                            <div className="about-content__description-text">
                                <p>{headerPage.about_company}</p>
                            </div>
                            <a
                                className="connect-with-us"
                                href="mailto:someone@example.com?subject=Написать в поддержку&body=Здравствуйте, я хотел бы..."
                                data-aos="fade-up"
                            >
                                {t('ContactUs')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
