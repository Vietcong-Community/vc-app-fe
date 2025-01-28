import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../theme/theme';
import { makeMediaQuery } from '../../utils/mediaQuery';

export const Container = styled.header`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.background};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 4.4rem;
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
  height: 4.4rem;
  justify-content: space-between; /* Zajistí, že mezi levým, středním a pravým obsahem bude prostor */
  margin: 0 auto;
  max-width: ${(props: IThemeProps) => props.theme.sizes.maxPageWidth};
  padding: 0 1.5rem;
  width: 100%;
`;

export const LeftSection = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: flex-start; /* Ujistí se, že logo bude vlevo */
`;

export const Logo = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;

  .ant-menu-horizontal {
    background-color: ${(props: IThemeProps) => props.theme.mainColors.background} !important;
  }

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      display: none;
    `}
  `};
`;

export const RightSection = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
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

  @media screen and (max-width: ${BreakPoints.md}px) {
    display: flex;
  }
`;

export const MobileHamburger = styled.div<{ isOpen: boolean }>`
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
    props.isOpen &&
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
