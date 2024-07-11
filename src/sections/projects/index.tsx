import React, {FC, useEffect, useRef} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './styles.scss';
import {useTranslation} from 'react-i18next';
import Buttons from '../../components/Buttons';
import CustomCollapseText from '../../components/CollapseText';
import {Project} from "@src/hooks/types";
import {PUBLIC_BASE_URL} from "@src/hooks/consts";
import {useWindowSize} from "@src/hooks/useWindowSize";
import {useBreakpoints} from "@src/hooks/useBreakpoints";

interface Props {
    projects: Project[];
}

const Projects: FC<Props> = ({projects}) => {
    const {t} = useTranslation();
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const {isPhone} = useBreakpoints();
    const {width} = useWindowSize();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true
        });
    }, []);

    return (
        <section id="projects" className="projects" data-aos="fade-up">
            <div className="slider-container">
                <div className="projects-head" data-aos="zoom-in">
                    <h2>{t('OurProjects')}</h2>
                    <p>{t('Weprioritize')}</p>
                    {!isPhone && (
                        <Buttons
                            totalCards={projects.length}
                            scrollWidth={460 + 54}
                            sliderRef={sliderRef}
                        />
                    )}
                </div>

                <div className="slider" ref={sliderRef}>
                    {projects &&
                        projects.map((i) => (
                            <div key={i.id} className="card-wrapper" data-aos="fade-up">
                                <img
                                    src={`${PUBLIC_BASE_URL}${i.img}`}
                                    alt="card"
                                    className="card"
                                    style={{objectFit: 'cover'}}
                                />
                                <div className="card-wrapper__description">
                                    <CustomCollapseText title={i.name}>
                                        {i.description}
                                    </CustomCollapseText>
                                </div>
                            </div>
                        ))}
                    <img
                        src={`${PUBLIC_BASE_URL}${projects[0].img}`}
                        alt="card"
                        className="card-hidden"
                    />
                </div>
                {isPhone && (
                    <div className="control-wrapper__bottom">
                        <Buttons
                            totalCards={projects.length}
                            scrollWidth={(isPhone ? (width || 0) * 0.75 : 460) + (isPhone ? 24 : 54)}
                            sliderRef={sliderRef}
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
