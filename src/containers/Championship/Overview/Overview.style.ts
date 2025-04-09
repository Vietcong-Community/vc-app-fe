import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 100%;
`;
export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
`;

export const Dates = styled.div`
  display: flex;
  gap: 16px;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const DateBox = styled.div`
  align-items: center;
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent30};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: fit-content;
`;

export const FacebookLink = styled.div`
  display: flex;
  gap: 8px;

  span {
    color: ${(props: IThemeProps) => props.theme.mainColors.primary};
    font-size: 20px;
  }
`;
