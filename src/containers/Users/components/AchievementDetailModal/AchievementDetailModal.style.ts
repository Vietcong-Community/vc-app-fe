import { Avatar } from 'antd';
import styled from 'styled-components';

import { IThemeProps } from '../../../../theme/theme';

export const AchievementIconAvatar = styled(Avatar)`
  background: #f2f2f2 !important;
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;
