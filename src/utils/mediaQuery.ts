import { CSSObject, CSSProp, css } from 'styled-components';

export const makeMediaQuery =
  (size: number) =>
  (args: TemplateStringsArray | CSSObject, ...interpolations: CSSProp[]) => {
    return css`
      @media only screen and (max-width: ${size}px) {
        ${css(args, ...interpolations)}
      }
    `;
  };
