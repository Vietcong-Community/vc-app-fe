import styled from 'styled-components';

import { IThemeProps } from '../../../../theme/theme';

export const Container = styled.div`
  align-items: center;
  box-shadow:
    rgba(0, 0, 0, 0.05) 0 6px 24px 0,
    rgba(0, 0, 0, 0.08) 0 0 0 1px;
  box-sizing: border-box;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: darkseagreen;
    transform: scale(1.025);
  }
`;

export const Score = styled.div`
  font-size: 18px;
  font-weight: ${(props: IThemeProps) => props.theme.fontWeight.bold};
`;
