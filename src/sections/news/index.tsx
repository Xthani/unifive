import React, {FC, useState, useEffect} from 'react';
import cn from 'classnames';
import {Carousel} from 'antd';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './styles.scss';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button';
import {NewsRes} from "@src/hooks/types";
import {useBreakpoints} from "@src/hooks/useBreakpoints";

interface Props {
    news: NewsRes[];
}

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const News: FC<Props> = ({news}) => {
    const {t} = useTranslation();
    const [hoveredItem, setHoveredItem] = useState<number>();
    const {isPhone} = useBreakpoints();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true
        });
    }, []);

    function truncateText(text: string, maxLength: number = 74): string {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + '...'; // Вычитаем 3, чтобы учесть многоточие
        }
        return text;
    }

    return (
        <section id="news" className="news">
            <div className="news-wrapper">
                <div className="container">
                    <h2 data-aos="fade-up">{t('News')}</h2>

                    {isPhone && (
                        <Carousel dots dotPosition="bottom" adaptiveHeight>
                            {news.map((i, index) => (
                                <div key={i.id} className="carousel-item">
                                    <div
                                        className="news-item"
                                        onMouseEnter={() => setHoveredItem(index)} // Установка при наведении
                                        onMouseLeave={() => setHoveredItem(undefined)} // Сброс при уходе курсора
                                        data-aos="fade-up"
                                    >
                                        <header>
                                            <div className="news-item__header">
                                                <div
                                                    className={cn('circle', {
                                                        blue: !index,
                                                        coralRed: index === 1,
                                                        green: index === 2,
                                                    })}
                                                />
                                                <span>09 April</span>
                                            </div>
                                            <h3 className="news-item__title">{i.title}</h3>
                                        </header>

                                        <footer className="news-item__footer">
                                            <p>{truncateText(i.description, 74)}</p>
                                            <Button hover={hoveredItem === index}/>
                                        </footer>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    )}

                    {!isPhone && (
                        <div className="news-item__wrapper">
                            {news.map((i, index) => (
                                <a key={i.id} href="">
                                    <div
                                        className="news-item"
                                        onMouseEnter={() => setHoveredItem(index)} // Установка при наведении
                                        onMouseLeave={() => setHoveredItem(undefined)} // Сброс при уходе курсора
                                        data-aos="fade-up"
                                    >
                                        <header>
                                            <div className="news-item__header">
                                                <div
                                                    className={cn('circle', {
                                                        blue: !index,
                                                        coralRed: index === 1,
                                                        green: index === 2,
                                                    })}
                                                />
                                                <span>09 April</span>
                                            </div>
                                            <h3 className="news-item__title">{i.title}</h3>
                                        </header>

                                        <footer className="news-item__footer">
                                            <p>{truncateText(i.description, 74)}</p>
                                            <Button hover={hoveredItem === index}/>
                                        </footer>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default News;
