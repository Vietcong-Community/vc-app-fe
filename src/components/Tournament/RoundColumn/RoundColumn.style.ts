import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 270px;
  width: 100%;
`;

export const RoundTitle = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.mainColors.primary};
`;
