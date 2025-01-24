import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  justify-content: space-between; /* Rozdělí podřazené divy na levou a pravou stranu */
  align-items: flex-start; /* Zarovná podřazené divy nahoru */
  padding: 20px;
  gap: 20px; /* Mezera mezi podřazenými divy */
`;

export const TeamInfo = styled.div`
  flex: 2;
  border-radius: 8px;
`;

export const Members = styled.div`
  flex: 1;
  border-left: 1px solid #d9d9d9;
`;
