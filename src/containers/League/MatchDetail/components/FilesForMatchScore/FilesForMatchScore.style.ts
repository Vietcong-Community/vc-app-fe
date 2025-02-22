import styled from 'styled-components';

import { IThemeProps } from '../../../../../theme/theme';

export const SectionTitle = styled.div`
  align-items: start;
  display: flex;
  font-size: 18px;
  font-weight: 500;
  justify-content: space-between;
  text-align: start;
  width: 100%;
`;

export const Icon = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.secondary};
  font-size: 20px;
  font-weight: bold;
`;
