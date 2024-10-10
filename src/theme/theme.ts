export const theme = {
  colors: {
    black: '#262626',
    white: '#ffffff',
  },
  fontWeight: {
    bold: 600,
    extraLight: 300,
    light: 400,
    normal: 500,
  },
  fontSize: {
    normal: '18px',
  },
};

export interface IThemeProps {
  theme: typeof theme;
}

export enum BreakPoints {
  xs = 320,
  sm = 426,
  md = 767,
  lg = 992,
  xl = 1440,
}
