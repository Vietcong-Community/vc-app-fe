import React, { useContext, useState } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Dropdown, Menu } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useUserMe } from '../../api/hooks/auth/api';
import logo from '../../assets/vclogo-removebg-preview.png';
import { useRouter } from '../../hooks/RouterHook';
import { useWindowDimensions } from '../../hooks/WindowDimensionsHook';
import { LanguageContext } from '../../providers/LanguageProvider/LanguageContext';
import { PreferredLanguage } from '../../providers/LanguageProvider/constants';
import { ThemeContext } from '../../providers/ThemeProvider/ThemeContext';
import { ThemeType } from '../../providers/ThemeProvider/constants';
import { Routes } from '../../routes/enums';
import { BreakPoints } from '../../theme/theme';
import { USER_AUTHENTICATION_STORAGE_KEY } from '../../utils/storageUtils';
import { Button } from '../Button/Button';
import { MainButtonVariant } from '../Button/enums';

import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { messages } from './messages';

import * as S from './Header.style';

export const Header: React.FC = () => {
  const { navigate } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const queryClient = useQueryClient();
  const isSmallerThanLg = width <= BreakPoints.lg;

  const { selectedTheme, toggleTheme } = useContext(ThemeContext);
  const { selectedLanguage, toggleLanguage } = useContext(LanguageContext);

  const userMe = useUserMe('always', [401]);

  const isUserLoggedIn = userMe.isSuccess;

  const handleLogout = async () => {
    localStorage.removeItem(USER_AUTHENTICATION_STORAGE_KEY);
    queryClient.removeQueries({ queryKey: ['userMe'] });
    queryClient.removeQueries({ queryKey: ['loggedUserTeams'] });
    navigate(Routes.HOME, { replace: true });
  };

  const loggedUserMenu = [
    {
      key: 'profile',
      onClick: () => navigate(Routes.USER_PROFILE.replace(':id', userMe.data?.id ?? '')),
      label: (
        <S.DropdownLabel>
          <FormattedMessage {...messages.goToProfilePage} />
        </S.DropdownLabel>
      ),
    },
    {
      key: 'edit-profile',
      label: (
        <S.DropdownLabel>
          <FormattedMessage {...messages.goToProfileEditPage} />
        </S.DropdownLabel>
      ),
      onClick: () => navigate(Routes.EDIT_PROFILE.replace(':id', userMe.data?.id ?? '')),
    },
    {
      key: 'theme',
      label: (
        <S.DropdownLabel>
          <FormattedMessage {...(selectedTheme === ThemeType.LIGHT ? messages.darkTheme : messages.lightTheme)} />
        </S.DropdownLabel>
      ),
      onClick: toggleTheme,
    },
    {
      key: 'language',
      label: (
        <S.DropdownLabel>
          <FormattedMessage
            {...(selectedLanguage === PreferredLanguage.CS ? messages.desktopEnglish : messages.desktopCzech)}
          />
        </S.DropdownLabel>
      ),
      onClick: toggleLanguage,
    },
    {
      key: 'logout',
      label: (
        <S.DropdownLabel>
          <FormattedMessage {...messages.logout} />
        </S.DropdownLabel>
      ),
      onClick: handleLogout,
    },
  ];

  const anonymousUserMenu = [
    {
      key: 'login',
      label: (
        <S.DropdownLabel>
          <FormattedMessage {...messages.goToLogin} />
        </S.DropdownLabel>
      ),
      onClick: () => navigate(Routes.LOGIN),
    },
    {
      key: 'registration',
      label: (
        <S.DropdownLabel>
          <FormattedMessage {...messages.goToRegistration} />
        </S.DropdownLabel>
      ),
      onClick: () => navigate(Routes.REGISTRATION),
    },
  ];

  const getUserIcon = () => {
    if (isUserLoggedIn && userMe.data?.image?.url) {
      return <img alt="" src={userMe.data?.image?.url} />;
    }

    return <UserOutlined />;
  };

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
            <Menu.Item key="about" onClick={() => navigate(Routes.ABOUT_US)} style={{ fontSize: 16 }}>
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
          {!isSmallerThanLg && (
            <>
              {!isUserLoggedIn && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button onClick={() => navigate(Routes.LOGIN)} variant={MainButtonVariant.OUTLINED}>
                    <FormattedMessage {...messages.goToLogin} />
                  </Button>
                  <Button onClick={() => navigate(Routes.REGISTRATION)}>
                    <FormattedMessage {...messages.goToRegistration} />
                  </Button>
                </div>
              )}
              {isUserLoggedIn && (
                <Dropdown menu={{ items: isUserLoggedIn ? loggedUserMenu : anonymousUserMenu }} trigger={['click']}>
                  <S.UserMenu>
                    <Avatar size={32} icon={getUserIcon()} />
                    <span style={{ fontSize: '14px' }}>
                      {isUserLoggedIn ? userMe.data?.nickname : <FormattedMessage {...messages.userNotLoggedIn} />}
                    </span>
                  </S.UserMenu>
                </Dropdown>
              )}
            </>
          )}
        </S.RightSection>
      </S.Content>
      <MobileMenu
        handleLogout={handleLogout}
        isOpen={isMobileMenuOpen}
        onCloseButtonClick={() => setIsMobileMenuOpen(false)}
        isUserLoggedIn={isUserLoggedIn}
        nickname={userMe.data?.nickname}
        userAvatarUrl={userMe.data?.image?.url}
        userId={userMe.data?.id}
      />
    </S.Container>
  );
};
