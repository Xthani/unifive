import { BrowserRouter } from "react-router-dom";

import React, { Suspense } from "react";
import "./i18n";
import "./styles/global.css"
import LangProvider from "@components/providers/LangProvider/LangProvider";
import {RouteMap} from "@src/navs/routes";

interface AppContextProps {
  lang?: string;
  path?: string;
}

function App({ lang, path = "/" }: AppContextProps) {
  return (
      <BrowserRouter basename={path}>
        <Suspense fallback={<></>}>
          <LangProvider lang={lang}>
            <RouteMap />
          </LangProvider>
        </Suspense>
      </BrowserRouter>
  );
}

export default App;
