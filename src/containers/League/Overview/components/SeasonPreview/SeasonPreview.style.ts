import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const Matches = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;

  > * {
    flex: 1;
  }

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const CardTitle = styled.h3`
  font-weight: 600;
  margin-top: 0;
  text-align: center;
`;

export const NoMatches = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: auto;

  span {
    color: ${(props: IThemeProps) => props.theme.mainColors.primary};
    font-size: 24px;
  }
`;
