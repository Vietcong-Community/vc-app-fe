import React, { useEffect, useMemo } from 'react';

import { ConfigProvider } from 'antd';
import locale from 'antd/locale/cs_CZ';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { theme } from '../../theme/theme';

import { IThemeContext, ThemeContext } from './ThemeContext';
import { LOCAL_STORAGE_THEME_KEY, ThemeType } from './constants';
import { DarkAntDTheme, DarkAppTheme } from './darkTheme';
import { LightAntDTheme, LightAppTheme } from './lightTheme';

interface IProps {
  children?: React.ReactNode;
}

export const ThemeProvider: React.FC<IProps> = (props: IProps) => {
  const { children } = props;
  const [selectedTheme, setSelectedTheme] = React.useState(
    localStorage.getItem(LOCAL_STORAGE_THEME_KEY) ?? ThemeType.LIGHT,
  );

  // SET DEFAULT THEME ON FIRST PAGE LOAD
  useEffect(() => {
    const storedThemeValue = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    if (!storedThemeValue) {
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, ThemeType.LIGHT);
    }
  }, []);

  const antDTheme = useMemo(() => {
    if (selectedTheme === ThemeType.DARK) {
      return DarkAntDTheme;
    }

    return LightAntDTheme;
  }, [selectedTheme]);

  const appTheme = useMemo(() => {
    const mainColors = selectedTheme === ThemeType.LIGHT ? LightAppTheme : DarkAppTheme;

    return {
      ...theme,
      mainColors,
    };
  }, [selectedTheme]);

  const toggleTheme = () => {
    const newSelectedTheme = selectedTheme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;
    setSelectedTheme(newSelectedTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newSelectedTheme);
  };

  const contextValue = useMemo((): IThemeContext => {
    return { selectedTheme: selectedTheme as ThemeType, toggleTheme };
  }, [selectedTheme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider
        locale={locale}
        theme={{
          token: {
            ...antDTheme,
            fontFamily: 'Poppins, serif',
          },
        }}
      >
        <SCThemeProvider theme={appTheme}>{children}</SCThemeProvider>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
