import React, { useContext, useState } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { FormattedMessage } from 'react-intl';

import logo from '../../assets/vclogo-removebg-preview.png';
import { useRouter } from '../../hooks/RouterHook';
import { useWindowDimensions } from '../../hooks/WindowDimensionsHook';
import { ThemeContext } from '../../providers/ThemeProvider/ThemeContext';
import { ThemeType } from '../../providers/ThemeProvider/constants';
import { Routes } from '../../routes/enums';
import { BreakPoints } from '../../theme/theme';

import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { messages } from './messages';

import * as S from './Header.style';

export const Header: React.FC = () => {
  const { navigate } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width <= BreakPoints.md;

  const { selectedTheme, toggleTheme } = useContext(ThemeContext);

  const isUserLoggedIn = false; // TODO Connect to BE

  const loggedUserMenu = [
    {
      key: 'profile',
      label: (
        <span onClick={() => navigate(Routes.USER)}>
          <FormattedMessage {...messages.goToProfilePage} />
        </span>
      ),
    },
    {
      key: 'edit-profile',
      label: (
        <span onClick={() => navigate(Routes.EDIT_PROFILE)}>
          <FormattedMessage {...messages.goToProfileEditPage} />
        </span>
      ),
    },
    {
      key: 'change-password',
      label: (
        <span onClick={() => navigate(Routes.PRIVATE_CHANGE_PASSWORD)}>
          <FormattedMessage {...messages.changePasswordLink} />
        </span>
      ),
    },
    {
      key: 'theme',
      label: (
        <span onClick={toggleTheme}>
          <FormattedMessage {...(selectedTheme === ThemeType.LIGHT ? messages.darkTheme : messages.lightTheme)} />
        </span>
      ),
    },
    {
      key: 'logout',
      label: (
        // TODO LOGOUT FUNCTION
        <span onClick={() => {}}>
          <FormattedMessage {...messages.logout} />
        </span>
      ),
    },
  ];

  const anonymousUserMenu = [
    {
      key: 'login',
      label: (
        <span onClick={() => navigate(Routes.LOGIN)}>
          <FormattedMessage {...messages.goToLogin} />
        </span>
      ),
    },
    {
      key: 'registration',
      label: (
        <span onClick={() => navigate(Routes.REGISTRATION)}>
          <FormattedMessage {...messages.goToRegistration} />
        </span>
      ),
    },
    {
      key: 'theme',
      label: (
        <span onClick={toggleTheme}>
          <FormattedMessage {...(selectedTheme === ThemeType.LIGHT ? messages.darkTheme : messages.lightTheme)} />
        </span>
      ),
    },
  ];

  return (
    <S.Container>
      <S.Content>
        <S.LeftSection>
          <S.Logo onClick={() => navigate(Routes.HOME)}>
            <img src={logo} alt="Vietcong" style={{ height: '90%' }} />
          </S.Logo>
        </S.LeftSection>
        <S.MenuContainer>
          <Menu
            mode="horizontal"
            selectable={false}
            style={{ borderBottom: 'none', display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <Menu.Item key="leagues" onClick={() => navigate(Routes.LEAGUE)} style={{ fontSize: 16 }}>
              <FormattedMessage {...messages.leaguesLink} />
            </Menu.Item>
            <Menu.Item key="mcrvc" onClick={() => navigate(Routes.MCRVC)} style={{ fontSize: 16 }}>
              <FormattedMessage {...messages.mcrvcLink} />
            </Menu.Item>
            <Menu.Item key="statistics" onClick={() => navigate(Routes.STATISTICS)} style={{ fontSize: 16 }}>
              <FormattedMessage {...messages.statisticsLink} />
            </Menu.Item>
            <Menu.Item key="contact" onClick={() => navigate(Routes.ABOUT_US)} style={{ fontSize: 16 }}>
              <FormattedMessage {...messages.aboutUsLink} />
            </Menu.Item>
          </Menu>
        </S.MenuContainer>
        <S.RightSection>
          <S.HamburgerCont>
            <S.MobileHamburger isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span />
              <span />
              <span />
              <span />
            </S.MobileHamburger>
          </S.HamburgerCont>
          {!isSmallerThanMd && (
            <Dropdown
              menu={{ items: isUserLoggedIn ? loggedUserMenu : anonymousUserMenu }}
              trigger={['click', 'hover']}
            >
              <S.UserMenu>
                <Avatar size={32} icon={<UserOutlined />} />
                <span style={{ fontSize: '14px' }}>
                  <FormattedMessage {...messages.userNotLoggedIn} />
                </span>
              </S.UserMenu>
            </Dropdown>
          )}
        </S.RightSection>
      </S.Content>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onCloseButtonClick={() => setIsMobileMenuOpen(false)}
        isUserLoggedIn={isUserLoggedIn}
      />
    </S.Container>
  );
};
