import React, { ReactElement, useEffect, useMemo } from 'react';

import { IntlProvider } from 'react-intl';

import csMessages from '../../translations/cs.json';
import enMessages from '../../translations/en.json';

import { ILanguageContext, LanguageContext } from './LanguageContext';
import { LOCAL_STORAGE_LANGUAGE_KEY, PreferredLanguage } from './constants';

const CZECH_LANGUAGE = 'cs';
const ENGLISH_LANGUAGE = 'cs';

interface IProps {
  children: ReactElement;
}

export const LanguageProvider: React.FC<IProps> = (props: IProps) => {
  const { children } = props;
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY) ?? PreferredLanguage.CS,
  );

  // SET DEFAULT THEME ON FIRST PAGE LOAD
  useEffect(() => {
    const storedLanguageValue = localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY);
    if (!storedLanguageValue) {
      localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, PreferredLanguage.CS);
    }
  }, []);

  const translations = useMemo(
    () => (selectedLanguage === PreferredLanguage.CS ? csMessages : enMessages),
    [selectedLanguage],
  );

  const toggleLanguage = () => {
    const newSelectedLanguage = selectedLanguage === PreferredLanguage.CS ? PreferredLanguage.EN : PreferredLanguage.CS;
    setSelectedLanguage(newSelectedLanguage);
    localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, newSelectedLanguage);
  };

  const contextValue = useMemo((): ILanguageContext => {
    return { selectedLanguage: selectedLanguage as PreferredLanguage, toggleLanguage };
  }, [selectedLanguage, toggleLanguage]);

  return (
    <LanguageContext.Provider value={contextValue}>
      <IntlProvider
        defaultRichTextElements={{ b: (msg) => <b>{msg}</b> }}
        locale={selectedLanguage === PreferredLanguage.CS ? CZECH_LANGUAGE : ENGLISH_LANGUAGE}
        key={selectedLanguage === PreferredLanguage.CS ? CZECH_LANGUAGE : ENGLISH_LANGUAGE}
        messages={translations}
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};
