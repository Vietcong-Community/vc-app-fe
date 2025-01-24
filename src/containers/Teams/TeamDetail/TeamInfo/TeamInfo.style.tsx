import styled from 'styled-components';

import { IThemeProps } from '../../../../theme/theme';

export const Content = styled.div`
  display: flex;
  justify-content: space-between; /* Rozdělí podřazené divy na levou a pravou stranu */
  align-items: flex-start; /* Zarovná podřazené divy nahoru */
  gap: 20px; /* Mezera mezi podřazenými divy */
`;

export const PictureDiv = styled.div`
  flex: 1;
  border-radius: 8px;
`;

export const InfoDiv = styled.div`
  flex: 2;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background-color: #f9f9f9; /* Jemné světle šedé pozadí */
  border-radius: 8px; /* Zaoblené rohy */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Jemný stín */
  height: 280px;
`;

export const TeamImage = styled.img`
  width: 280px; /* Šířka obrázku */
  height: 280px; /* Výška obrázku */
  border-radius: 2%;
  object-fit: cover; /* Přizpůsobení obsahu */
`;

export const InfoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #ffffff; /* Bílá karta */
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    transform: translateY(-2px); /* Lehký efekt posunu */
    transition: all 0.2s ease-in-out;
    font-size: 17px;
    background-color: ${(props: IThemeProps) => props.theme.mainColors.background};
  }

  b {
    color: #333; /* Barva nadpisu */
  }

  i {
    color: #666; /* Barva textu */
  }
`;
