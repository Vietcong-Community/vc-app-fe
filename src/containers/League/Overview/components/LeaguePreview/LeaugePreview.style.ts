import { Divider as AntDDivider } from 'antd';
import styled from 'styled-components';

import { IThemeProps } from '../../../../../theme/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
`;

export const Divider = styled(AntDDivider)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  margin: 0;
`;

export const TabLabel = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.text};
  padding: 1.5rem 0.5rem 0rem 0.5rem;
  position: relative;
`;

export const TabTag = styled.div<{ $isActive: boolean }>`
  background-color: ${(props) => (props.$isActive ? '#2a7f00' : '#515151')};
  border-radius: 4px;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  font-size: 12px;
  padding: 0 0.25rem;
  position: absolute;
  top: 0;
  right: -0.5rem;
`;
