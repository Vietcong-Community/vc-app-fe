import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../theme/theme';
import { makeMediaQuery } from '../../../../utils/mediaQuery';

export const Container = styled.div`
  align-items: center;
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent35};
  border-radius: 8px;
  color: ${(props: IThemeProps) => props.theme.colors.black};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  max-width: 250px;
  width: 100%;

  &:hover {
    transform: scale(1.05);
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      max-width: initial;

      &:hover {
        transform: none;
      }
    `}
  `};
`;

export const TypeTitle = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  font-size: 20px;
`;

export const Icons = styled.div`
  align-items: center;
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  display: flex;
  gap: 4px;
  justify-content: center;
`;
