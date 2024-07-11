import React, {FC, useRef, useState, useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './styles.scss';
import {preloadImages} from '../../utils';
import Buttons from '../../components/Buttons';
import {PUBLIC_BASE_URL} from "@src/hooks/consts";
import {Feedback} from "@src/hooks/types";
import {useBreakpoints} from "@src/hooks/useBreakpoints";

interface Props {
    feedback: Feedback[];
}

const Reviews: FC<Props> = ({feedback}) => {
    const commentsRef = useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const {isPhone} = useBreakpoints();

    useEffect(() => {
        const imageUrls = feedback.map(
            (item) => `${PUBLIC_BASE_URL}${item.avatar}`
        );
        preloadImages(imageUrls);
    }, [feedback]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true
        });
    }, []);

    const handleScroll = (index: number) => {
        setIsHidden(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsHidden(false);
        }, 500); // Время должно совпадать с CSS переходом
    };

    return (
        <section id="reviews" className="reviews" data-aos="fade-up">
            <div className="container">
                {isPhone && (
                    <div className={`human ${isHidden ? 'hidden' : ''}`} data-aos="fade-right">
                        <img
                            src={`${PUBLIC_BASE_URL}${feedback[currentIndex].avatar}`}
                            alt="review-photo"
                        />
                        <div className="human-description">
                            <h6>{feedback[currentIndex].user}</h6>
                            <span>{feedback[currentIndex].position}</span>
                        </div>
                    </div>
                )}

                <div ref={commentsRef} className="reviews-comments" data-aos="fade-up">
                    {feedback.map((i) => (
                        <p key={i.id}>“ {i.feedback}”</p>
                    ))}
                </div>
                <div className="reviews-footer" data-aos="fade-up">
                    {!isPhone && (
                        <div className={`human ${isHidden ? 'hidden' : ''}`}>
                            <img
                                src={`${PUBLIC_BASE_URL}${feedback[currentIndex].avatar}`}
                                alt="review-photo"
                            />
                            <div className="human-description">
                                <h6>{feedback[currentIndex].user}</h6>
                                <span>{feedback[currentIndex].position}</span>
                            </div>
                        </div>
                    )}

                    <Buttons
                        totalCards={feedback.length}
                        scrollWidth={1300}
                        sliderRef={commentsRef}
                        variant="comment"
                        onScroll={handleScroll}
                    />
                </div>
            </div>
        </section>
    );
};

export default Reviews;
