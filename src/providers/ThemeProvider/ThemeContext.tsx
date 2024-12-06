import React from 'react';

import { ThemeType } from './constants';

export interface IThemeContext {
  selectedTheme: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<IThemeContext>({
  selectedTheme: ThemeType.LIGHT,
  toggleTheme: () => {},
});

ThemeContext.displayName = 'ThemeContext';
