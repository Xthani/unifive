import React, {FC, useMemo, useState, useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './styles.scss';
import {useTranslation} from 'react-i18next';
import {preloadImages} from '../../utils';
import CustomCollapse from '../../components/Collapse';
import {FaqRes} from "@src/hooks/types";
import {PUBLIC_BASE_URL} from "@src/hooks/consts";

interface Props {
    faq: FaqRes[];
}

const icon_color = ['orange', 'light-blue', 'light-grey', 'grey', 'beg']

const Activity: FC<Props> = ({faq}) => {
    const {t} = useTranslation();
    const [openIndex, setOpenIndex] = useState<number>(0);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    console.log(openIndex, 'openIndex')

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true
        });

        const imageUrls = faq.flatMap((item) => [
            `${PUBLIC_BASE_URL}${item.logo}`,
            `${PUBLIC_BASE_URL}${item.img}`,
        ]);
        preloadImages(imageUrls);
    }, [faq]);

    const handleCollapseClick = (index: number) => {
        if (index !== openIndex) {
            setIsTransitioning(true);
            setTimeout(() => {
                setOpenIndex(index);
                setIsTransitioning(false);
            }, 500);
        }
    };

    const logo = useMemo(
        () =>
            openIndex !== null
                ? `${PUBLIC_BASE_URL}${faq[openIndex].logo}`
                : `${PUBLIC_BASE_URL}${faq[0].logo}`,
        [openIndex, faq],
    );
    const img = useMemo(
        () =>
            openIndex !== null
                ? `${PUBLIC_BASE_URL}${faq[openIndex].img}`
                : `${PUBLIC_BASE_URL}${faq[0].img}`,
        [openIndex, faq],
    );

    return (
        <section id="solutions" className="activity" data-aos="fade-up">
            <div className="activity-block">
                <div className="container">
                    <div className="activity-wrapper">
                        <div className="activity__head" data-aos="zoom-in">
                            <h2>{t('OurAreas')}</h2>

                            <div className="activity__head-image">
                                <img
                                    src={img}
                                    alt=""
                                    className={`activity__head-image__img ${isTransitioning ? 'transitioning' : ''}`}
                                    width={440}
                                    height={240}
                                />
                                <div
                                    className={`activity__head-image__icon ${icon_color[openIndex]} ${isTransitioning ? 'transitioning' : ''}`}
                                >
                                    <img src={logo} alt="" width={40} height={40}/>
                                </div>
                            </div>
                        </div>
                        <div className="activity__description-column">
                            {faq.map((i, index) => (
                                <CustomCollapse
                                    key={i.id}
                                    title={i.title}
                                    isOpen={openIndex === index}
                                    onClick={() => handleCollapseClick(index)}
                                    data-aos="fade-up"
                                >
                                    {i.faq_lists.length ? (
                                        <ul>
                                            {i.faq_lists.map((item) => (
                                                <li key={item.id}>{item.item}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div>{i.description}</div>
                                    )}
                                </CustomCollapse>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Activity;
