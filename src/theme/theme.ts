export enum BreakPoints {
  xs = 320,
  sm = 426,
  md = 767,
  lg = 992,
  xl = 1440,
}

export const theme = {
  breakpoints: BreakPoints,
  colors: {
    black: '#262626',
    white: '#ffffff',
  },
  fontSize: {
    normal: '18px',
  },
  fontWeight: {
    bold: 600,
    extraLight: 300,
    light: 400,
    normal: 500,
  },
  mainColors: {
    background: '#fbf1c7',
    primary: '#458588',
    secondary: '#d79921',
    borderColor: '#dddddd',
  },
  sizes: {
    contentPageWidth: `${BreakPoints.lg}px`,
    maxPageWidth: '1980px',
  },
};

export interface IThemeProps {
  theme: typeof theme;
}
