import React, { useContext, useState } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useUserMe } from '../../api/hooks/auth/api';
import logo from '../../assets/vclogo-removebg-preview.png';
import { useRouter } from '../../hooks/RouterHook';
import { useWindowDimensions } from '../../hooks/WindowDimensionsHook';
import { ThemeContext } from '../../providers/ThemeProvider/ThemeContext';
import { ThemeType } from '../../providers/ThemeProvider/constants';
import { Routes } from '../../routes/enums';
import { BreakPoints } from '../../theme/theme';
import { USER_AUTHENTICATION_STORAGE_KEY } from '../../utils/storageUtils';

import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { messages } from './messages';

import * as S from './Header.style';

export const Header: React.FC = () => {
  const { navigate } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width <= BreakPoints.md;

  const { selectedTheme, toggleTheme } = useContext(ThemeContext);

  const userMe = useUserMe('always', [401]);

  const isUserLoggedIn = userMe.isSuccess;

  const handleLogout = async () => {
    localStorage.removeItem(USER_AUTHENTICATION_STORAGE_KEY);
    await userMe.refetch();
    navigate(Routes.HOME, { replace: true });
  };

  const loggedUserMenu = [
    {
      key: 'profile',
      label: (
        <S.DropdownLabel onClick={() => navigate(Routes.USER_PROFILE.replace(':id', userMe.data?.id ?? ''))}>
          <FormattedMessage {...messages.goToProfilePage} />
        </S.DropdownLabel>
      ),
    },
    {
      key: 'edit-profile',
      label: (
        <S.DropdownLabel onClick={() => navigate(Routes.EDIT_PROFILE.replace(':id', userMe.data?.id ?? ''))}>
          <FormattedMessage {...messages.goToProfileEditPage} />
        </S.DropdownLabel>
      ),
    },
    {
      key: 'theme',
      label: (
        <S.DropdownLabel onClick={toggleTheme}>
          <FormattedMessage {...(selectedTheme === ThemeType.LIGHT ? messages.darkTheme : messages.lightTheme)} />
        </S.DropdownLabel>
      ),
    },
    {
      key: 'logout',
      label: (
        <S.DropdownLabel onClick={handleLogout}>
          <FormattedMessage {...messages.logout} />
        </S.DropdownLabel>
      ),
    },
  ];

  const anonymousUserMenu = [
    {
      key: 'login',
      label: (
        <S.DropdownLabel onClick={() => navigate(Routes.LOGIN)}>
          <FormattedMessage {...messages.goToLogin} />
        </S.DropdownLabel>
      ),
    },
    {
      key: 'registration',
      label: (
        <S.DropdownLabel onClick={() => navigate(Routes.REGISTRATION)}>
          <FormattedMessage {...messages.goToRegistration} />
        </S.DropdownLabel>
      ),
    },
    {
      key: 'theme',
      label: (
        <S.DropdownLabel onClick={toggleTheme}>
          <FormattedMessage {...(selectedTheme === ThemeType.LIGHT ? messages.darkTheme : messages.lightTheme)} />
        </S.DropdownLabel>
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
                  {isUserLoggedIn ? userMe.data?.nickname : <FormattedMessage {...messages.userNotLoggedIn} />}
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
        userId={userMe.data?.id}
      />
    </S.Container>
  );
};
