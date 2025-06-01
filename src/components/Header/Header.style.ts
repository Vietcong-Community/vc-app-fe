import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../theme/theme';
import { makeMediaQuery } from '../../utils/mediaQuery';

export const Container = styled.header`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.background};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 5.4rem;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 2;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      height: 4.4rem;
    `}
  `};
`;

export const Content = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 5.4rem;
  justify-content: space-between; /* Zajistí, že mezi levým, středním a pravým obsahem bude prostor */
  margin: 0 auto;
  max-width: ${(props: IThemeProps) => props.theme.sizes.maxPageWidth};
  padding: 0 1.5rem;
  width: 100%;
`;

export const LeftSection = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  justify-content: flex-start; /* Ujistí se, že logo bude vlevo */
  padding-right: 1rem;
  width: 100%;
`;

export const Logo = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  margin-right: 32px;
  align-items: center;
`;

export const MenuContainer = styled.div`
  display: flex;
  width: 100%;

  svg {
    color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  }

  .ant-menu-horizontal {
    background-color: ${(props: IThemeProps) => props.theme.mainColors.background} !important;
  }

  ${() => makeMediaQuery(BreakPoints.lg)`
    ${css`
      display: none;
    `}
  `};
`;

export const RightSection = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end; /* Ujistí se, že prvky vpravo budou na pravé straně */
`;

export const UserMenu = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 8px;
`;

export const HamburgerCont = styled.div`
  align-items: flex-end;
  justify-content: flex-end;
  display: none;

  @media screen and (max-width: ${BreakPoints.lg}px) {
    display: flex;
  }
`;

export const MobileHamburger = styled.div<{ $isOpen: boolean }>`
  width: 28px;
  height: 22px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;

  span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: ${(props: IThemeProps) => props.theme.mainColors.text};
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }

  span:nth-child(1) {
    top: 0;
  }

  span:nth-child(2),
  span:nth-child(3) {
    top: 9px;
  }

  span:nth-child(4) {
    top: 18px;
  }

  ${(props) =>
    props.$isOpen &&
    css`
      span:nth-child(1) {
        top: 18px;
        width: 0;
        left: 50%;
        opacity: 0;
      }
      span:nth-child(2) {
        transform: rotate(45deg);
      }
      span:nth-child(3) {
        transform: rotate(-45deg);
      }
      span:nth-child(4) {
        top: 5px;
        width: 0;
        opacity: 0;
        left: 50%;
      }
    `}
`;

export const DropdownLabel = styled.span`
  width: 100%;
`;

export const UserMatchesIconContainer = styled.div`
  color: ${(props: IThemeProps) => props.theme.mainColors.accent};
  cursor: pointer;
  font-size: 22px;
  position: relative;
  margin-right: 16px;
`;

export const TotalMatchesCount = styled.div`
  top: 0;
  background-color: ${(props: IThemeProps) => props.theme.colors.red};
  border-radius: 50%;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  font-size: 10px;
  position: absolute;
  right: -10px;
  height: 16px;
  width: 16px;
`;
