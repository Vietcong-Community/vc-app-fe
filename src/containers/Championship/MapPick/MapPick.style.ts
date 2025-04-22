import { Tag as AntDTag } from 'antd';
import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../theme/theme';
import { makeMediaQuery } from '../../../utils/mediaQuery';

export const Container = styled.div`
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

export const InformationLabel = styled.span`
  font-size: 14px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.normal};

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 12px;
    `}
  `};
`;

export const InformationValue = styled.span`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  font-size: 18px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 14px;
    `}
  `};
`;

export const MatchType = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 22px;
  font-weight: 600;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 18px;
    `}
  `};
`;

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

export const MapTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`;

export const Tag = styled(AntDTag)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent70};
  border: none;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  font-size: 18px;
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
