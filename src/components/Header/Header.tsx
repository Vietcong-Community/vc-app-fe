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
import firstColors from './testLogo/1_barevna.png';
import firstWhite from './testLogo/1_bila.png';
import firstBlack from './testLogo/1_cerna.png';
import firstGrey from './testLogo/1_seda.png';
import firstGreen from './testLogo/1_zelena.png';
import secondColors1 from './testLogo/2_barevna_1.png';
import secondColors2 from './testLogo/2_barevna_2.png';
import secondWhite from './testLogo/2_bila.png';
import secondBlack from './testLogo/2_cerna.png';
import secondGrey from './testLogo/2_seda.png';
import secondGreen from './testLogo/2_zelena.png';
import thirdColors from './testLogo/3_barevna.png';
import thirdWhite from './testLogo/3_bila.png';
import thirdBlack from './testLogo/3_cerna.png';
import thirdGrey from './testLogo/3_seda.png';
import thirdGreen from './testLogo/3_zelena.png';
import ctvrtaColors from './testLogo/4_barevna.png';
import ctvrtaBlack from './testLogo/4_cerna.png';
import ctvrtaGrey from './testLogo/4_seda.png';
import fifthBlack from './testLogo/5_cerny.png';
import fifthGrey from './testLogo/5_seda.png';
import fifthGreen from './testLogo/5_zelena.png';
import sixVersion1 from './testLogo/6_verze_1.png';
import sixVersion2 from './testLogo/6_verze_2.png';

import * as S from './Header.style';

export const Header: React.FC = () => {
  const { navigate, query } = useRouter<{ v?: string }>();
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

  const getLogoSrc = () => {
    if (!query?.v) {
      return logo;
    }

    if (query?.v === '1_barevna') {
      return firstColors;
    }
    if (query?.v === '1_bila') {
      return firstWhite;
    }
    if (query?.v === '1_cerna') {
      return firstBlack;
    }
    if (query?.v === '1_seda') {
      return firstGrey;
    }
    if (query?.v === '1_zelena') {
      return firstGreen;
    }
    if (query?.v === '2_barevna_1') {
      return secondColors1;
    }
    if (query?.v === '2_barevna_2') {
      return secondColors2;
    }
    if (query?.v === '2_bila') {
      return secondWhite;
    }
    if (query?.v === '2_cerna') {
      return secondBlack;
    }
    if (query?.v === '2_seda') {
      return secondGrey;
    }
    if (query?.v === '2_zelena') {
      return secondGreen;
    }
    if (query?.v === '3_barevna') {
      return thirdColors;
    }
    if (query?.v === '3_bila') {
      return thirdWhite;
    }
    if (query?.v === '3_cerna') {
      return thirdBlack;
    }
    if (query?.v === '3_seda') {
      return thirdGrey;
    }
    if (query?.v === '3_zelena') {
      return thirdGreen;
    }
    if (query?.v === '4_cerna') {
      return ctvrtaBlack;
    }
    if (query?.v === '4_seda') {
      return ctvrtaGrey;
    }
    if (query?.v === '4_barevna') {
      return ctvrtaColors;
    }
    if (query?.v === '5_cerna') {
      return fifthBlack;
    }
    if (query?.v === '5_seda') {
      return fifthGrey;
    }
    if (query?.v === '5_zelena') {
      return fifthGreen;
    }
    if (query?.v === '6_verze_1') {
      return sixVersion1;
    }
    if (query?.v === '6_verze_2') {
      return sixVersion2;
    }

    return logo;
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
              <img src={getLogoSrc()} alt="Vietcong" style={{ height: '90%' }} />
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
                      onClick: () => navigate(Routes.CHAMPIONSHIP),
                      label: <FormattedMessage {...messages.mcrvcLink} />,
                    },
                    {
                      key: 'donate',
                      onClick: () => navigate(Routes.DONATE_PAGE),
                      label: <FormattedMessage {...messages.donateLink} />,
                    },
                    // {
                    //   key: 'statistics',
                    //   onClick: () => navigate(Routes.STATISTICS),
                    //   label: <FormattedMessage {...messages.statisticsLink} />,
                    // },
                    {
                      key: 'articles',
                      onClick: () => navigate(Routes.ARTICLES),
                      label: <FormattedMessage {...messages.articleLink} />,
                    },
                    {
                      key: 'how-to-play',
                      onClick: () => navigate(Routes.HOW_TO_PLAY),
                      label: <FormattedMessage {...messages.howToPlay} />,
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
