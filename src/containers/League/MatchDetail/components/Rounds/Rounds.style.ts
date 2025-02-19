import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.xl)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const MapContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const SectionTitle = styled.div`
  align-items: start;
  display: flex;
  font-size: 18px;
  font-weight: 500;
  justify-content: space-between;
  text-align: start;
  width: 100%;
`;

export const Icon = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.secondary};
  font-size: 20px;
  font-weight: bold;
`;
