import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../theme/theme';
import { makeMediaQuery } from '../../../../utils/mediaQuery';

export const Container = styled.div`
  align-items: start;
  border-radius: 8px;
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent40};
  display: flex;
  flex-direction: column;
  font-size: 14px;
  justify-content: start;
  padding: 1rem;
  width: 236px;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      width: 100%;
    `}
  `};
`;

export const TeamName = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.25;
  text-align: start;
`;

export const TeamRole = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  font-size: 14px;
  font-weight: 600;
`;
