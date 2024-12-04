import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const MatchInformationContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
    `}
  `};
`;

export const TeamsContainer = styled.div`
  display: flex;
  flex: 2;
  width: 100%;
`;

export const InformationLabel = styled.span`
  font-size: 14px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.normal};
`;

export const InformationValue = styled.span`
  color: darkolivegreen;
  font-size: 18px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
`;

export const TeamsLabel = styled.div`
  font-size: 26px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
  width: 100%;
`;
