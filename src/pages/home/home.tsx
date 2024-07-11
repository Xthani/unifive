import React, {useState} from 'react';

import './page.scss';

import Loader from '../../components/Loader';
import Head from '../../sections/head';
import Experts from '../../sections/experts';
import About from '../../sections/about';
import Projects from '../../sections/projects';
import Reviews from '../../sections/reviews';
import Activity from '../../sections/activity';
import Partners from '../../sections/partners';
import News from '../../sections/news';
import Footer from '../../sections/footer';
import { useTranslation } from 'react-i18next';
import {useHome} from "@src/hooks/useHome";
import {useParam} from "@src/hooks/useParam";
import {slide as Menu} from "react-burger-menu";
import LanguageSelector from "@components/Select";
// @ts-ignore
import FaceBook from '@assets/footer/facebook.svg';
// @ts-ignore
import Twitter from '@assets/footer/twitter.svg';
// @ts-ignore
import Insta from '@assets/footer/insta.svg';
import {useBreakpoints} from "@src/hooks/useBreakpoints";

export function Home() {
  const {t} = useTranslation();
  const { param: currentLang, updateQueryParam } = useParam(
    'language',
    'default_language',
  );

  const {isWeb} = useBreakpoints()

  const { feedback, news, logos, headerPage, load, projects, partners, faq } =
    useHome(currentLang);

  const [menuOpen, setMenuOpen] = useState(false);


  const handleClick = (event: any) => {
    setMenuOpen(false)
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
    <div>

      {!isWeb &&  <Menu isOpen={menuOpen} right width="100%" onStateChange={({ isOpen }) => setMenuOpen(isOpen)}>
        <LanguageSelector className="bm-language-select"/>
        <ul>
          <a onClick={handleClick} href="#about">{t('about')}</a>
          {/*<a onClick={handleClick} href="#projects">{t('Projects')}</a>*/}
          {/*<a onClick={handleClick} href="#reviews">{t('Reviews')}</a>*/}
          <a onClick={handleClick} href="#solutions">{t('Solutions')}</a>
          <a onClick={handleClick} href="#partners">{t('Partners')}</a>
          {/*<a onClick={handleClick} href="#news">{t('News')}</a>*/}
          <a onClick={handleClick} href="#contacts">{t('Contacts')}</a>

        </ul>

        <div className="bm-links">
          <a
            className="connect-with-us"
            href="mailto:someone@example.com?subject=Написать в поддержку&body=Здравствуйте, я хотел бы..."
            style={{display: 'flex'}}
          >
            {t('ContactUs')}
          </a>

          <div className="bm-links__social">
            <img src={FaceBook} alt=""/>
            <img src={Twitter} alt=""/>
            <img src={Insta} alt=""/>
          </div>

        </div>

      </Menu>}


      {load ? (
        <Loader/>
      ) : (
        <>
          {headerPage && <Head headerPage={headerPage}/>}
          {logos && headerPage && (
            <Experts headerPage={headerPage} logos={logos}/>
          )}
          {headerPage && <About headerPage={headerPage} />}
          {/*{projects && <Projects projects={projects} />}*/}
          {/*{feedback && <Reviews feedback={feedback} />}*/}
          {faq && <Activity faq={faq} />}
          {partners && <Partners partners={partners} />}
          {/*{news && <News news={news} />}*/}
          {headerPage && <Footer />}
        </>
      )}
    </div>
  );
}
