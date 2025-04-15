import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const LadderTableLabel = styled.span`
  font-size: 13px;
  font-weight: 400;
`;

export const LadderTableValue = styled.span`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  font-weight: 600;
`;

export const SeasonInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;

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
