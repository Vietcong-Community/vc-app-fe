import { Avatar } from 'antd';
import styled, { css } from 'styled-components';

import { IThemeProps } from '../../../../theme/theme';

export const Container = styled.div`
  display: flex;
  margin: auto;
  max-width: 740px;
  position: relative;
`;

export const IconContainer = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
`;

export const AchievementItem = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 150px;
  min-width: 150px;
  white-space: pre-wrap;
`;

export const OverflowContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow: auto;
  padding-bottom: 1rem;
  white-space: nowrap;

  &::-webkit-scrollbar {
    background-color: ${(props: IThemeProps) => props.theme.mainColors.primary20};
    border-radius: 8px;
    height: 8px;
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props: IThemeProps) => props.theme.mainColors.accent};
    border-radius: 8px;
  }
`;

export const AchievementIconAvatar = styled(Avatar)`
  background: ${(props: IThemeProps) => props.theme.mainColors.accent15} !important;
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
`;

export const ArrowLeft = styled.div<{ reachedStart?: boolean }>`
  position: absolute;
  bottom: 10px;
  left: 0;
  font-size: 23px;
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  cursor: pointer;

  ${(props) =>
    props.reachedStart &&
    css`
      cursor: initial;
      opacity: 0.2;
    `}
`;

export const ArrowRight = styled.div<{ reachedEnd?: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 0;
  font-size: 23px;
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  cursor: pointer;

  ${(props) =>
    props.reachedEnd &&
    css`
      cursor: initial;
      opacity: 0.2;
    `}
`;
