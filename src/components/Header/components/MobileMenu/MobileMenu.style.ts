import { Avatar } from 'antd';
import styled, { css } from 'styled-components';

import { IThemeProps } from '../../../../theme/theme';

export const Container = styled.div<{ isOpen: boolean }>`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  position: fixed;
  background-color: ${(props) => props.theme.mainColors.background};
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  height: 4.4rem;
  justify-content: space-between;
  padding: 0 1.5rem 0;
  width: 100%;
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

export const Logo = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 100%;
`;

export const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
  width: 100%;
`;

export const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`;

export const MenuLink = styled.div`
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.mainColors.borderColor};
  font-size: 16px;
  padding: 0.5rem;
`;

export const UserName = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 8px;
  height: 100%;
  justify-content: center;
`;

export const LogoutLink = styled.a`
  bottom: 1rem;
  font-size: 16px;
`;

export const SwitchContainer = styled.div`
  align-items: start;
  display: flex;
  font-size: 14px;
  flex-direction: column;
`;

export const AvatarIcon = styled(Avatar)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  margin-right: 0.5rem;
`;
