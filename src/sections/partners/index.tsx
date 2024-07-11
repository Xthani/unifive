import React, {FC, useEffect, useState} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './styles.scss';
import {useTranslation} from 'react-i18next';
import {PUBLIC_BASE_URL} from '@src/hooks/consts';
import {PartnersRes} from '@src/hooks/types';
import {getPackedArraysOfLogos} from "@src/utils";

interface Props {
    partners: PartnersRes[];
}

const Partners: FC<Props> = ({partners}) => {
    const {t} = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);

    const logosArrays = getPackedArraysOfLogos(partners, 12)

    const pagesCount = logosArrays?.length || 0

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                if (prevIndex === pagesCount - 1) return 0
                return prevIndex + 1
            });
        }, 5000); // смена каждые 5 секунд
        return () => clearInterval(interval);
    }, [pagesCount]);

    return (
        <section id="partners" className="partners" data-aos="fade-up">
            <div className="container">
                <div className="partners-wrapper">
                    <div className="partners-head" data-aos="zoom-in">
                        <h2>{t('Partners')}</h2>
                        <p>{t('WeCollaborate')}</p>
                        <p>{t('OurPortfolio')}</p>
                    </div>
                    <div className="partners-logo">
                        {Boolean(pagesCount) && logosArrays[currentIndex].map((i: any) => (
                            <a href={i.link} target='_blank'>
                            <div key={i.id} className="experts-clients__logo-item" data-aos="zoom-out" >
                                <img src={`${PUBLIC_BASE_URL}${i.img}`} alt="logo"/>
                            </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;



