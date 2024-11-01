import styled from 'styled-components';

import { IThemeProps } from '../../../theme/theme';

export const PageContainer = styled.div`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.background};
  background-image: linear-gradient(180deg, rgba(248, 247, 255, 1) 0%, rgba(255, 255, 255, 0) 54px);
`;

export const ContentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${(props: IThemeProps) => props.theme.sizes.maxPageWidth};
`;
