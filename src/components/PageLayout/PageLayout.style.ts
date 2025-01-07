import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const PageContainer = styled.div`
  flex: 1;
`;

export const ContentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${(props: IThemeProps) => props.theme.sizes.maxPageWidth};
`;
