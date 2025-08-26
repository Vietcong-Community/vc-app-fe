import { BreakPoints, IThemeProps } from 'src/theme/theme';
import styled, { css } from 'styled-components';

import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const SeasonInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: start;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      align-items: start;
      flex-direction: column;
      gap: 12px;
      justify-content: start;
    `}
  `};
`;

export const InformationLabel = styled.span`
  font-size: 13px;
`;

export const InformationValue = styled.span`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  font-size: 15px;
  font-weight: 600;
`;

export const Participants = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
`;

export const Participant = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: flex-start;
  max-width: calc(10% - 1rem);
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      max-width: calc(20% - 1rem);
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      max-width: calc(33% - 1rem);
    `}
  `};
`;
