import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const PageContainer = styled.div`
  background-color: ${(props: IThemeProps) => props.theme.colors.white};
  background-image: linear-gradient(180deg, rgba(248, 247, 255, 1) 0%, rgba(255, 255, 255, 0) 54px);
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;
