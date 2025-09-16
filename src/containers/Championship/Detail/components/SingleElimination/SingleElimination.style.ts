import styled from 'styled-components';

import { IThemeProps } from '../../../../../theme/theme';

export const Container = styled.div`
  overflow: auto;
  width: 100%;
  &::-webkit-scrollbar {
    background-color: ${(props: IThemeProps) => props.theme.mainColors.background};
    border-radius: 8px;
    height: 8px;
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props: IThemeProps) => props.theme.mainColors.accent};
    border-radius: 8px;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
`;
