import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: start;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 16px;
    `}
  `};
`;

export const Perex = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: start;
  white-space: pre-line;
`;

export const Image = styled.img`
  aspect-ratio: 3/2;
  border-radius: 8px;
  width: 100%;
`;

export const MetaInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CommentCount = styled.div`
  align-items: center;
  display: inline;
  justify-content: left;
  gap: 4px;

  svg {
    color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  }
`;
