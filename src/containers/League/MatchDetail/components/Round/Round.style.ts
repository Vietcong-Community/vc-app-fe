import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const RoundContainer = styled.div`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.secondary30};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: 1rem;
  position: relative;
  text-align: start;
  width: 100%;
`;

export const WinnerTag = styled.div<{ $isDraw: boolean }>`
  border-radius: 4px;
  background-color: ${(props: IThemeProps & { $isDraw: boolean }) =>
    props.$isDraw ? '#808080' : props.theme.colors.green};
  font-size: 12px;
  padding: 0 0.25rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

export const MapTitle = styled.div`
  font-size: 16px;
  font-weight: 600;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      font-size: 14px;
    `}
  `};
`;

export const ResultContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 4px;
  font-size: 18px;
  justify-content: center;
`;

export const TeamTag = styled.div`
  align-items: center;
  border-radius: 4px;
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent60};
  display: flex;
  justify-content: center;
  font-size: 12px;
  padding: 0.25rem 0.5rem;
  width: fit-content;
`;

export const Flag = styled.img`
  width: 20px;
`;

export const UploadBox = styled.div`
  width: 100%;
  .ant-upload-select {
    width: 100% !important;
  }
`;

export const Players = styled.div`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.accent35};
  border-radius: 8px;
  display: flex;
  gap: 8px;
  padding: 0.5rem;
  flex-direction: column;
`;

export const StatisticItem = styled.div`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.primary30};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`;

export const Statistics = styled.div`
  align-items: center;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;

  > * {
    align-items: center;
    display: flex;
    gap: 6px;
    justify-content: flex-start;
    width: 35px;
  }
`;
