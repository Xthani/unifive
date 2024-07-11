import React, {FC, useEffect, useState} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles.scss';
import {useTranslation} from 'react-i18next';
import {HeaderPage, LogosRes} from '@src/hooks/types';
import {PUBLIC_BASE_URL} from '@src/hooks/consts';
import {getPackedArraysOfLogos} from "@src/utils";

interface Props {
    logos: LogosRes[];
    headerPage: HeaderPage;
}

const Experts: FC<Props> = ({logos, headerPage}) => {
    const {t} = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);

    const logosArrays = getPackedArraysOfLogos(logos)

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

    return (<></>
        // <section id="experts" className="experts" data-aos="fade-up">
        //     <div className="container">
        //         <div className="experts-head" data-aos="zoom-in">
        //             <h2>{t('Professional')}</h2>
        //             <p>{headerPage.logo_description}</p>
        //         </div>
        //         <div className="experts-clients">
        //             <div className="experts-clients__title" data-aos="fade-right">
        //                 <h6>32+</h6>
        //                 <span>{t('Satisfied')}</span>
        //             </div>
        //             <div className="experts-clients__logo">
        //                 {Boolean(pagesCount) && logosArrays[currentIndex].map((i: any) => (
        //                     <div key={i.id} className="experts-clients__logo-item" data-aos="zoom-out">
        //                         <img src={`${PUBLIC_BASE_URL}${i.logo}`} alt="logo"/>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </section>
    );
};

export default Experts;