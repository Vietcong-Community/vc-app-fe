import styled, { css } from 'styled-components';

export const Container = styled.div<{ $position: 'bottom' | 'top'; $teamId?: string }>`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  position: relative;

  ${(props) =>
    props.$position === 'top' &&
    css`
      border-bottom: 1px solid ${props.theme.mainColors.primary};
      &:before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 2px;
        height: 50%;
        background-color: ${props.theme.mainColors.primary};
      }
    `}

  ${(props) =>
    props.$position === 'bottom' &&
    css`
      border-top: 1px solid ${props.theme.mainColors.primary};
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 2px;
        height: 50%;
        background-color: ${props.theme.mainColors.primary};
      }
    `}
  
  .highlighted {
    background-color: ${(props) => props.theme.mainColors.secondary20};
  }
`;

export const Team = styled.div<{ $teamId?: string }>`
  border-radius: 4px;
  display: flex;
  justify-content: flex-end;
  padding-right: 0.5rem;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

export const Score = styled.div`
  background-color: ${(props) => props.theme.mainColors.secondary20};
  width: 2rem;
`;
