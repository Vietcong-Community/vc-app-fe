import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const CardTitle = styled.h3`
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

export const Icon = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.secondary};
  font-size: 20px;
  font-weight: bold;
`;

export const TeamName = styled.h4`
  font-weight: 600;
  font-size: larger;
  color: ${(props: IThemeProps) => props.theme.mainColors.secondary};
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  gap: 100px;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;

  > * {
    width: calc(25% - 12px);
  }

  ${() => makeMediaQuery(1100)`
    ${css`
      > * {
        width: calc(50% - 8px);
      }
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      > * {
        width: 100%;
      }
    `}
  `};
`;

export const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // aby obrázek a text byly centrované
  text-align: center;
  max-width: 300px; // nebo dle potřeby
`;

export const FrameContainer = styled.div`
  cursor: pointer;
  height: 160px; // nastav stejné maximum pro všechny
  display: flex;
  align-items: flex-end; // zarovná rámeček dolů uvnitř fixní výšky
  justify-content: center;
  margin-bottom: 16px;
`;

export const TeamLineUp = styled.div``;
