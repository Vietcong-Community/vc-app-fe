import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const StatsLink = styled.div`
  display: flex;
  gap: 8px;

  span {
    color: ${(props: IThemeProps) => props.theme.mainColors.primary};
    font-size: 20px;
  }
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 100%;
`;
