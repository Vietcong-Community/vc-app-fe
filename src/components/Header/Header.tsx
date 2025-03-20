import React, { useContext, useState } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faPersonRifle } from '@fortawesome/free-solid-svg-icons/faPersonRifle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Dropdown, Menu } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useUserMe } from '../../api/hooks/auth/api';
import { useUserMatches } from '../../api/hooks/users/api';
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
import { AnimatedWidthContainer } from '../Animations/AnimatedWidthContainer/AnimatedHeightContainer';
import { Button } from '../Button/Button';
import { MainButtonVariant } from '../Button/enums';

import { GlobalSearch } from './components/GlobalSearch/GlobalSearch';
import { MobileMenu } from './components/MobileMenu/MobileMenu';
import { MyMatches } from './components/MyMatches/MyMatches';
import { messages } from './messages';

import * as S from './Header.style';

export const Header: React.FC = () => {
  const { navigate } = useRouter();
  const [matchesDrawerOpen, setMatchesDrawerOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedPage, setSelectedPage] = useState<number>(1);

  const { width } = useWindowDimensions();
  const queryClient = useQueryClient();
  const isSmallerThanLg = width <= BreakPoints.lg;

  const { selectedTheme, toggleTheme } = useContext(ThemeContext);
  const { selectedLanguage, toggleLanguage } = useContext(LanguageContext);

  const userMe = useUserMe('always', [401]);
  const isUserLoggedIn = userMe.isSuccess;

  const userMatches = useUserMatches(isUserLoggedIn, { page: selectedPage });

  const onMyMatchesOpen = () => {
    userMatches.refetch();
    setMatchesDrawerOpen(true);
  };

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
      key: 'my-teams',
      label: (
        <S.DropdownLabel>
          <FormattedMessage {...messages.myTeams} />
        </S.DropdownLabel>
      ),
      onClick: () => navigate(Routes.MY_TEAMS),
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
    <>
      <S.Container>
        <S.Content>
          <S.LeftSection>
            <S.Logo onClick={() => navigate(Routes.HOME)}>
              <img src={logo} alt="Vietcong" style={{ height: '90%' }} />
            </S.Logo>
            <S.MenuContainer>
              {!isSearchOpen && (
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  onClick={() => setIsMainMenuOpen(false)}
                  style={{ cursor: 'pointer', margin: 8, fontSize: 24 }}
                />
              )}
              <GlobalSearch
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                onExitComplete={() => setIsMainMenuOpen(true)}
              />
              <AnimatedWidthContainer isOpen={isMainMenuOpen} onExitComplete={() => setIsSearchOpen(true)}>
                <Menu
                  mode="horizontal"
                  selectable={false}
                  style={{ borderBottom: 'none', width: '100%' }}
                  items={[
                    {
                      key: 'leagues',
                      onClick: () => navigate(Routes.LEAGUE),
                      label: <FormattedMessage {...messages.leaguesLink} />,
                    },
                    {
                      key: 'mcrvc',
                      onClick: () => navigate(Routes.MCRVC),
                      label: <FormattedMessage {...messages.mcrvcLink} />,
                    },
                    {
                      key: 'statistics',
                      onClick: () => navigate(Routes.STATISTICS),
                      label: <FormattedMessage {...messages.statisticsLink} />,
                    },
                    {
                      key: 'articles',
                      onClick: () => navigate(Routes.ARTICLES),
                      label: <FormattedMessage {...messages.articleLink} />,
                    },
                    {
                      key: 'about',
                      onClick: () => navigate(Routes.ABOUT_US),
                      label: <FormattedMessage {...messages.aboutUsLink} />,
                    },
                  ]}
                />
              </AnimatedWidthContainer>
            </S.MenuContainer>
          </S.LeftSection>
          <S.RightSection>
            <Button
              onClick={toggleLanguage}
              style={{ padding: '0.25rem', marginRight: 16 }}
              variant={MainButtonVariant.OUTLINED}
            >
              <FormattedMessage
                {...(selectedLanguage === PreferredLanguage.CS ? messages.desktopEnglish : messages.desktopCzech)}
              />
            </Button>
            {isUserLoggedIn && (
              <S.UserMatchesIconContainer onClick={onMyMatchesOpen}>
                <FontAwesomeIcon icon={faPersonRifle} />
                {(userMatches.data?.total ?? 0) > 0 && (
                  <S.TotalMatchesCount>{userMatches.data?.total}</S.TotalMatchesCount>
                )}
              </S.UserMatchesIconContainer>
            )}
            <S.HamburgerCont>
              <S.MobileHamburger $isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
                    <Button onClick={() => navigate(Routes.LOGIN)} variant={MainButtonVariant.SECONDARY}>
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
      <MyMatches
        isOpen={matchesDrawerOpen}
        matches={userMatches.data?.matches ?? []}
        onClose={() => setMatchesDrawerOpen(false)}
        onPageChange={setSelectedPage}
        page={selectedPage}
        total={userMatches.data?.total ?? 0}
      />
    </>
  );
};
