import { FC, ReactNode, useEffect } from "react";
import { useTranslation, I18nextProvider } from "react-i18next";
import { useSearchParams } from "react-router-dom";

interface LangProviderProps {
  lang?: string;
  children: ReactNode;
}
const LangProvider: FC<LangProviderProps> = ({ children, lang }) => {
  const { i18n } = useTranslation();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const lang = searchParams.get("language");

    if (lang) {
      const appLocale = lang === "ru" ? "ru" : 'en';
      i18n.changeLanguage(appLocale);
    } else {
      i18n.changeLanguage('ru')
    }
  }, [lang, searchParams, i18n]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default LangProvider;
