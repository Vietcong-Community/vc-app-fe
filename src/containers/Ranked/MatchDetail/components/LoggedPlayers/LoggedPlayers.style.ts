import { Tag as AntDTag } from 'antd';
import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const Subtitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2;
  margin: 8px 0;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 18px;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.sm)`
    ${css`
      font-size: 16px;
    `}
  `};
`;

export const PlayerTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`;

export const Tag = styled(AntDTag)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent70};
  border: none;
  border-radius: 8px;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  font-size: 16px;
  margin: 0;
  padding: 0.5rem 1rem;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 16px;
      padding: 0.25rem 0.75rem;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.sm)`
    ${css`
      font-size: 14px;
      padding: 0.25rem 0.5rem;
    `}
  `};
`;
