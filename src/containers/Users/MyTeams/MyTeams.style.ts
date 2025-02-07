import styled, { css } from 'styled-components';

import { BreakPoints } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const MyTeamsContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: start;
  margin: auto;
  flex-wrap: wrap;
  width: 100%;

  > * {
    width: calc(100% / 4 - 12px);
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;

      > * {
        width: 100%;
      }
    `}
  `};
`;

export const IconContainer = styled.div`
  color: ${(props) => props.theme.mainColors.accent};
  cursor: pointer;
  font-size: 24px;

  &:hover {
    transform: scale(1.2);
  }
`;
