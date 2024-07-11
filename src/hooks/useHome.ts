import { useEffect, useState } from 'react';
import {
  DataResponse,
  FaqRes,
  Feedback,
  HeaderPage,
  LogosRes,
  NewsRes,
  PartnersRes,
  Project,
} from './types';
import { PUBLIC_API_URL } from './consts';

export const useHome = (currentLang: string | null) => {
  // const { param: currentLang, updateQueryParam } = useParam(
  //   'language',
  //   'default_language',
  // );

  const [load, setLoad] = useState<boolean>(false);
  const [faq, setFaq] = useState<FaqRes[]>();
  const [projects, setProjects] = useState<Project[]>();
  const [partners, setPartners] = useState<PartnersRes[]>();
  const [feedback, setFeedback] = useState<Feedback[]>();
  const [news, setNews] = useState<NewsRes[]>();
  const [logos, setLogos] = useState<LogosRes[]>();
  const [headerPage, setHeaderPage] = useState<HeaderPage>();

  useEffect(() => {
    (async () => {
      try {
        const url = `${PUBLIC_API_URL}?language=${currentLang || 'default_language'}`;
        setLoad(true);
        const res = await fetch(url);
        if (res.ok) {
          const data: DataResponse = await res.json();
          setHeaderPage(data.header_page);
          setFaq(data.faq);
          setProjects(data.projects);
          setPartners(data.partners);
          setFeedback(data.feedback);
          setNews(data.news);
          setLogos(data.logos);
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoad(false);
      }
    })();
  }, [currentLang]);

  return {
    faq,
    projects,
    partners,
    feedback,
    news,
    logos,
    headerPage,
    load,
  };
};
