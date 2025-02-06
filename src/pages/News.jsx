import React from 'react';
import { useTranslation } from 'react-i18next';

function News() {

  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    currentLang === "en" ?
      <>
        <h1>News</h1> 
      </>: 
        <> 
          <h1>Новини</h1>
        </>
  );
}

export default News;
