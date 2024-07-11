import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const APP_ORIGIN_HOST = process.env.REACT_APP_ORIGIN_HOST || "";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // resources,
    fallbackLng: "ru",
    supportedLngs: ["ru", "en"],
    // lng: window.localStorage.i18nextLng || "ru",
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
      loadPath: `${APP_ORIGIN_HOST}locales/{{lng}}/{{ns}}.json`,
    },
  });

export default i18n;
