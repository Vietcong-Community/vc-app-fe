import { Divider as AntDDivider } from 'antd';
import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const Content = styled.div`
  display: flex;
  justify-content: space-between; /* Rozdělí podřazené divy na levou a pravou stranu */
  align-items: flex-start; /* Zarovná podřazené divy nahoru */
  gap: 20px; /* Mezera mezi podřazenými divy */

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      align-items: center;
      flex-direction: column;
      justify-content: center;
    `}
  `};
`;

export const PictureDiv = styled.div`
  align-items: center;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  justify-content: center;
  max-width: 200px;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      justify-content: center;
    `}
  `};

  ${() => makeMediaQuery(BreakPoints.sm)`
    ${css`
      width: 100%;
    `}
  `};
`;

export const InfoDiv = styled.div`
  flex: 2;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background-color: ${(props) => props.theme.mainColors.secondary10};
  border-radius: 8px; /* Zaoblené rohy */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Jemný stín */
  min-height: 200px; /* Minimální výška */
  height: auto;
  width: 100%;
`;

export const TeamImage = styled.img`
  width: 100%;
  height: 100%; /* Výška obrázku */
  border-radius: 2%;
  object-fit: cover; /* Přizpůsobení obsahu */
`;

export const InfoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    transform: translateY(-2px); /* Lehký efekt posunu */
    transition: all 0.2s ease-in-out;
    font-size: 17px;
    background-color: ${(props: IThemeProps) => props.theme.mainColors.secondary10};
  }

  b {
    color: ${(props: IThemeProps) => props.theme.mainColors.text};
    text-align: start;
    width: 125px;
  }

  i {
    color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  }
`;

export const Divider = styled(AntDDivider)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  margin: 0;
`;
