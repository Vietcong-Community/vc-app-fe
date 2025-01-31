import React from 'react';

import { PreferredLanguage } from './constants';

export interface ILanguageContext {
  selectedLanguage: PreferredLanguage;
  toggleLanguage: () => void;
}

export const LanguageContext = React.createContext<ILanguageContext>({
  selectedLanguage: PreferredLanguage.CS,
  toggleLanguage: () => {},
});

LanguageContext.displayName = 'LanguageContext';
