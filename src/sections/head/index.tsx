import React, {FC, useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import {preloadImages} from '@src/utils';
import LanguageSelector from '../../components/Select';
import {HeaderPage} from "@src/hooks/types";

import './styles.scss';

// @ts-ignore
import Logo from '@assets/head/logo.svg';
import {PUBLIC_BASE_URL} from "@src/hooks/consts";
import {useBreakpoints} from "@src/hooks/useBreakpoints";

interface Props {
    headerPage: HeaderPage;
}

const container = {
    hidden: {opacity: 1, scale: 0},
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: {y: 20, opacity: 0},
    visible: {
        y: 0,
        opacity: 1
    }
};

const color_icon = ['first', 'second', 'third']

const Head: FC<Props> = ({headerPage}) => {
    const {t} = useTranslation();
    const {isPhone} = useBreakpoints();
    const [imagesQueuePosition, setImagesQueuePosition] = useState<number>(0);
    const [showImages, setShowImages] = useState(true);

    useEffect(() => {
        if (headerPage?.img) {
            const imageUrls = headerPage.img
                .map((img) => `${PUBLIC_BASE_URL}${img.first_photo}`)
                .concat(
                    headerPage.img.map((img) => `${PUBLIC_BASE_URL}${img.second_photo}`)
                )
                .concat(
                    headerPage.img.map((img) => `${PUBLIC_BASE_URL}${img.third_photo}`)
                )
                .concat(headerPage.img.map((img) => `${PUBLIC_BASE_URL}${img.icon}`))
                .filter((url) => url);
            preloadImages(imageUrls);
        }
    }, [headerPage]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (headerPage?.img?.length < 2) return;
            setShowImages(false);

            setTimeout(() => setImagesQueuePosition(prevState => {
                setShowImages(true);
                if (headerPage.img.length <= 1) return prevState;
                if (prevState === headerPage.img.length - 1) {
                    return 0;
                }
                return prevState + 1;
            }), 1000);
        }, 10000);
        return () => clearInterval(timer);
    }, [headerPage.img]);

    const handleClick = (event: any) => {
        event.preventDefault();
        const anchor = event.target.getAttribute('href').slice(1); // Получаем якорь без #
        const anchorElement = document.getElementById(anchor);
        if(anchorElement) {
            window.scrollTo({
                top: anchorElement.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="head">
            <div className="container">
                <header className="header">
                    <a className='logo-head' href="">
                        <img src={Logo} alt="logo" width={146} height={44}/>
                        <p className='slogan'>Connecting Ideas Creating Solutions</p>
                    </a>
                    <nav className="navigate">
                        <a href="#about" onClick={handleClick}>{t('about')}</a>
                        {/*<a href="#projects" onClick={handleClick}>{t('Projects')}</a>*/}
                        {/*<a href="#reviews" onClick={handleClick}>{t('Reviews')}</a>*/}
                        <a href="#solutions" onClick={handleClick}>{t('Solutions')}</a>
                        <a href="#partners" onClick={handleClick}>{t('Partners')}</a>
                        {/*<a href="#news" onClick={handleClick}>{t('News')}</a>*/}
                        <a href="#contacts" onClick={handleClick}>{t('Contacts')}</a>
                    </nav>
                    <div className="header-right">
                        <a
                            className="connect-with-us"
                            href="mailto:someone@example.com?subject=Написать в поддержку&body=Здравствуйте, я хотел бы..."
                        >
                            {t('ContactUs')}
                        </a>
                        {!isPhone && <LanguageSelector/>}
                    </div>
                </header>
                <div className="head-content-wrapper">
                    <div className="head-content-wrapper__content">
                        <h1>{headerPage?.title}</h1>
                        <div className='content-head-text'>
                            <p className='content-head-text__mission'>{t('mission')}</p>
                            <p>{headerPage?.description}</p>
                        </div>
                        <div className="link-wrapper">
                            <a href="#about" className="link-wrapper__about-link">
                                {t('MoreAboutUs')}
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 5L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M19 12L12 19L5 12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>

                            {/*<a href="#projects" className="link-wrapper__projects">*/}
                            {/*    {t('ViewOurCases')}*/}
                            {/*</a>*/}
                        </div>
                    </div>
                    <motion.ul
                        className="head-image-wrapper"
                        initial="hidden"
                        animate="visible"
                        variants={container}
                    >
                        <AnimatePresence>
                            {showImages && (
                                <React.Fragment>
                                    <div className="head-image-wrapper__top">
                                        <motion.li
                                            key={`${headerPage.img[imagesQueuePosition]?.first_photo}-1`}
                                            variants={item}
                                            initial={{opacity: 0}}
                                            exit={{y: 20, opacity: 0}}
                                            animate={{y: 0, opacity: 1}}
                                            transition={{delay: 0.15}}
                                        >
                                            <img
                                                className="animated-image first__photo"
                                                src={`${PUBLIC_BASE_URL}${headerPage.img[imagesQueuePosition]?.first_photo}`}
                                                alt="frame"
                                            />
                                        </motion.li>
                                        <motion.li
                                            key={`${headerPage.img[imagesQueuePosition]?.second_photo}-2`}
                                            variants={item}
                                            initial={{opacity: 0}}
                                            exit={{y: 20, opacity: 0}}
                                            animate={{y: 0, opacity: 1}}
                                            transition={{delay: 0.3}}
                                        >
                                            <img
                                                className="animated-image second__photo"
                                                src={`${PUBLIC_BASE_URL}${headerPage.img[imagesQueuePosition]?.second_photo}`}
                                                alt="frame"
                                            />
                                        </motion.li>
                                    </div>
                                    <div className="head-image-wrapper__bottom">
                                        <motion.li
                                            key={`${headerPage.img[imagesQueuePosition]?.icon}-3`}
                                            variants={item}
                                            initial={{opacity: 0}}
                                            exit={{y: 20, opacity: 0}}
                                            animate={{y: 0, opacity: 1}}
                                            transition={{delay: 0.45}}
                                        >
                                            <div
                                                className={`head-image-wrapper__icon ${color_icon[1]}`}>
                                                <img
                                                    className="animated-image"
                                                    src={`${PUBLIC_BASE_URL}${headerPage.img[imagesQueuePosition]?.icon}`}
                                                    alt="frame"
                                                />
                                            </div>
                                        </motion.li>
                                        <motion.li
                                            key={`${headerPage.img[imagesQueuePosition]?.third_photo}-4`}
                                            variants={item}
                                            initial={{opacity: 0}}
                                            exit={{y: 20, opacity: 0}}
                                            animate={{y: 0, opacity: 1}}
                                            transition={{delay: 0.6}}
                                        >
                                            <img
                                                className="animated-image third__photo"
                                                src={`${PUBLIC_BASE_URL}${headerPage.img[imagesQueuePosition]?.third_photo}`}
                                                alt="frame"
                                            />
                                        </motion.li>
                                    </div>
                                </React.Fragment>
                            )}
                        </AnimatePresence>
                    </motion.ul>
                </div>
            </div>
        </section>
    );
};

export default Head;
