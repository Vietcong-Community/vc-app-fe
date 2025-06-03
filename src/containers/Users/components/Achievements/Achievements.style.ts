import { Avatar } from 'antd';
import styled from 'styled-components';

import { IThemeProps } from '../../../../theme/theme';

export const Container = styled.div`
  display: flex;
  margin: auto;
  max-width: 740px;
`;

export const IconContainer = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
`;

export const AchievementItem = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const OverflowContainer = styled.div`
  display: flex;
  gap: 16px;
  overflow: auto;
  white-space: nowrap;
`;

export const AchievementIconAvatar = styled(Avatar)`
  background: #f2f2f2 !important;
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
`;
