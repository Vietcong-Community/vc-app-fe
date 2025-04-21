import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const EditorContainer = styled.div`
  background-color: ${(props: IThemeProps) => props.theme.colors.white};
  border-radius: 8px;
  color: ${(props: IThemeProps) => props.theme.colors.black};
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;
