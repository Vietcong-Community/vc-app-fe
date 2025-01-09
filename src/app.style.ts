import styled from 'styled-components';

import { IThemeProps } from './theme/theme';

export const AppContainer = styled.div`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.background};
  color: ${(props: IThemeProps) => props.theme.mainColors.text};
  display: flex;
  flex-direction: column;
  font-family: 'Poppins', serif;
  font-size: ${(props: IThemeProps) => props.theme.fontSize.normal};
  font-style: normal;
  font-stretch: normal;
  font-weight: normal;
  letter-spacing: normal;
  line-height: 1.67;
  margin: 0;
  max-width: 100%;
  min-height: 100vh;
  padding: 0;
  position: relative;
  text-align: center;
`;
