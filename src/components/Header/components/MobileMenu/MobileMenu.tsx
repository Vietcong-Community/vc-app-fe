import React, { useContext, useRef } from 'react';

import {
  EditOutlined,
  LoginOutlined,
  RightOutlined,
  SecurityScanOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons/faPeopleGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Divider, Space, Switch } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Transition } from 'react-transition-group';

import logo from '../../../../assets/vclogo-removebg-preview.png';
import { useRouter } from '../../../../hooks/RouterHook';
import { LanguageContext } from '../../../../providers/LanguageProvider/LanguageContext';
import { PreferredLanguage } from '../../../../providers/LanguageProvider/constants';
import { ThemeContext } from '../../../../providers/ThemeProvider/ThemeContext';
import { ThemeType } from '../../../../providers/ThemeProvider/constants';
import { Routes } from '../../../../routes/enums';
import { theme } from '../../../../theme/theme';
import { Gap } from '../../../Gap/Gap';
import { messages } from '../../messages';
import { GlobalSearch } from '../GlobalSearch/GlobalSearch';

import * as S from './MobileMenu.style';

const animationDuration = 200;

const defaultStyle = {
  transition: `opacity ${animationDuration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles: { [key: string]: object } = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

interface IProps {
  handleLogout: () => void;
  isOpen: boolean;
  onCloseButtonClick: () => void;
  isUserLoggedIn: boolean;
  nickname?: string;
  userAvatarUrl?: string;
  userId?: string;
}

export const MobileMenu: React.FC<IProps> = (props) => {
  const { handleLogout, isOpen, onCloseButtonClick, isUserLoggedIn, nickname, userAvatarUrl, userId } = props;
  const nodeRef = useRef(null);

  const { selectedTheme, toggleTheme } = useContext(ThemeContext);
  const { selectedLanguage, toggleLanguage } = useContext(LanguageContext);

  const { navigate, pathname } = useRouter();

  const onMenuItemClick = (path: string) => {
    navigate(path);
    onCloseButtonClick();
  };

  const renderGeneralLinks = () => {
    return (
      <>
        <S.MenuItem onClick={() => onMenuItemClick(Routes.LEAGUE)}>
          <FormattedMessage {...messages.leaguesLink} />
          <RightOutlined style={{ fontSize: 22 }} />
        </S.MenuItem>
        <S.MenuItem onClick={() => onMenuItemClick(Routes.CHAMPIONSHIP)}>
          <FormattedMessage {...messages.mcrvcLink} />
          <RightOutlined style={{ fontSize: 22 }} />
        </S.MenuItem>
        <S.MenuItem onClick={() => onMenuItemClick(Routes.DONATE_PAGE)}>
          <FormattedMessage {...messages.donateLink} />
          <RightOutlined style={{ fontSize: 22 }} />
        </S.MenuItem>
        {/*<S.MenuItem onClick={() => onMenuItemClick(Routes.STATISTICS)}>*/}
        {/*  <FormattedMessage {...messages.statisticsLink} />*/}
        {/*  <RightOutlined style={{ fontSize: 22 }} />*/}
        {/*</S.MenuItem>*/}
        <S.MenuItem onClick={() => onMenuItemClick(Routes.ARTICLES)}>
          <FormattedMessage {...messages.articleLink} />
          <RightOutlined style={{ fontSize: 22 }} />
        </S.MenuItem>
        <S.MenuItem onClick={() => onMenuItemClick(Routes.HOW_TO_PLAY)}>
          <FormattedMessage {...messages.howToPlay} />
          <RightOutlined style={{ fontSize: 22 }} />
        </S.MenuItem>
        <S.MenuItem onClick={() => onMenuItemClick(Routes.ABOUT_US)}>
          <FormattedMessage {...messages.aboutUsLink} />
          <RightOutlined style={{ fontSize: 22 }} />
        </S.MenuItem>
      </>
    );
  };

  const getUserIcon = () => {
    if (userAvatarUrl) {
      return <img alt="" src={userAvatarUrl} />;
    }

    return <UserOutlined />;
  };

  return (
    <Transition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={animationDuration}
      onExited={() => {
        // Reset state after exited
        // setActiveMenuItemIndex(undefined);
      }}
      // https://github.com/reactjs/react-transition-group/issues/817#issuecomment-1122997210
      key={pathname}
    >
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {state !== 'exited' && (
            <S.Container isOpen={isOpen}>
              <S.Header>
                <S.Logo onClick={() => onMenuItemClick(Routes.HOME)}>
                  <img src={logo} alt="Vietcong" style={{ height: '90%' }} />
                </S.Logo>
                <S.MobileHamburger isOpen={isOpen} onClick={onCloseButtonClick}>
                  <span />
                  <span />
                  <span />
                  <span />
                </S.MobileHamburger>
              </S.Header>
              <Gap defaultHeight={8} />
              <S.MenuContent>
                {isUserLoggedIn && (
                  <>
                    <S.UserName>
                      <Avatar size={48} icon={getUserIcon()} />
                      <span style={{ fontSize: '20px' }}>{nickname}</span>
                    </S.UserName>
                    <Divider
                      style={{ backgroundColor: theme.mainColors.borderColor, marginBottom: 0, marginTop: 12 }}
                    />
                    <GlobalSearch hideOverflow isOpen onClose={onCloseButtonClick} showCloseIcon={false} />
                    <Divider style={{ backgroundColor: theme.mainColors.borderColor, margin: 0 }} />
                    {renderGeneralLinks()}
                    <Divider
                      style={{ backgroundColor: theme.mainColors.borderColor, marginBottom: 0, marginTop: 12 }}
                    />
                    <S.MenuItem onClick={() => onMenuItemClick(Routes.USER_PROFILE.replace(':id', userId ?? ''))}>
                      <div>
                        <S.AvatarIcon size={28} icon={<UserOutlined />} />
                        <FormattedMessage {...messages.goToProfilePage} />
                      </div>
                      <RightOutlined style={{ fontSize: 22 }} />
                    </S.MenuItem>
                    <S.MenuItem onClick={() => onMenuItemClick(Routes.MY_TEAMS)}>
                      <div>
                        <S.AvatarIcon
                          size={28}
                          icon={<FontAwesomeIcon style={{ fontSize: 16 }} icon={faPeopleGroup} />}
                        />
                        <FormattedMessage {...messages.myTeams} />
                      </div>
                      <RightOutlined style={{ fontSize: 22 }} />
                    </S.MenuItem>
                    <S.MenuItem onClick={() => onMenuItemClick(Routes.EDIT_PROFILE.replace(':id', userId ?? ''))}>
                      <div>
                        <S.AvatarIcon size={28} icon={<EditOutlined />} />
                        <FormattedMessage {...messages.goToProfileEditPage} />
                      </div>
                      <RightOutlined style={{ fontSize: 22 }} />
                    </S.MenuItem>
                    <S.MenuItem onClick={() => onMenuItemClick(Routes.PRIVATE_CHANGE_PASSWORD)}>
                      <div>
                        <S.AvatarIcon size={28} icon={<SecurityScanOutlined />} />
                        <FormattedMessage {...messages.changePasswordLink} />
                      </div>
                      <RightOutlined style={{ fontSize: 22 }} />
                    </S.MenuItem>
                    <Space size="large">
                      <S.SwitchContainer>
                        <FormattedMessage {...messages.themeTitle} />
                        <Switch
                          checkedChildren={<FormattedMessage {...messages.lightTheme} />}
                          unCheckedChildren={<FormattedMessage {...messages.darkTheme} />}
                          onChange={toggleTheme}
                          defaultChecked={selectedTheme === ThemeType.LIGHT}
                        />
                      </S.SwitchContainer>
                      <S.SwitchContainer>
                        <FormattedMessage {...messages.languageTitle} />
                        <Switch
                          checkedChildren={<FormattedMessage {...messages.czech} />}
                          unCheckedChildren={<FormattedMessage {...messages.english} />}
                          defaultChecked={selectedLanguage === PreferredLanguage.CS}
                          onChange={toggleLanguage}
                        />
                      </S.SwitchContainer>
                    </Space>
                    <S.LogoutLink onClick={handleLogout}>
                      <FormattedMessage {...messages.logout} />
                    </S.LogoutLink>
                    <Gap defaultHeight={16} />
                  </>
                )}
                {!isUserLoggedIn && (
                  <>
                    <S.UserName onClick={() => onMenuItemClick(Routes.LOGIN)}>
                      <Avatar size={42} icon={<UserOutlined />} />
                      <span style={{ fontSize: '20px' }}>
                        <FormattedMessage {...messages.userNotLoggedIn} />
                      </span>
                    </S.UserName>
                    <Divider
                      style={{ backgroundColor: theme.mainColors.borderColor, marginBottom: 0, marginTop: 12 }}
                    />
                    <GlobalSearch hideOverflow isOpen onClose={onCloseButtonClick} showCloseIcon={false} />
                    <Divider
                      style={{ backgroundColor: theme.mainColors.borderColor, marginBottom: 0, marginTop: 12 }}
                    />
                    {renderGeneralLinks()}
                    <Divider
                      style={{ backgroundColor: theme.mainColors.borderColor, marginBottom: 0, marginTop: 12 }}
                    />
                    <S.MenuItem onClick={() => onMenuItemClick(Routes.LOGIN)}>
                      <div>
                        <S.AvatarIcon size={28} icon={<LoginOutlined />} />
                        <FormattedMessage {...messages.goToLogin} />
                      </div>
                      <RightOutlined style={{ fontSize: 22 }} />
                    </S.MenuItem>
                    <S.MenuItem onClick={() => onMenuItemClick(Routes.REGISTRATION)}>
                      <div>
                        <S.AvatarIcon size={28} icon={<UserAddOutlined />} />
                        <FormattedMessage {...messages.goToRegistration} />
                      </div>
                      <RightOutlined style={{ fontSize: 22 }} />
                    </S.MenuItem>
                    <Space size="large" style={{ marginBottom: 32 }}>
                      <S.SwitchContainer>
                        <FormattedMessage {...messages.themeTitle} />
                        <Switch
                          checkedChildren={<FormattedMessage {...messages.lightTheme} />}
                          unCheckedChildren={<FormattedMessage {...messages.darkTheme} />}
                          onChange={toggleTheme}
                          defaultChecked={selectedTheme === ThemeType.LIGHT}
                        />
                      </S.SwitchContainer>
                      <S.SwitchContainer>
                        <FormattedMessage {...messages.languageTitle} />
                        <Switch
                          checkedChildren={<FormattedMessage {...messages.czech} />}
                          unCheckedChildren={<FormattedMessage {...messages.english} />}
                          defaultChecked={selectedLanguage === PreferredLanguage.CS}
                          onChange={toggleLanguage}
                        />
                      </S.SwitchContainer>
                      <Gap defaultHeight={16} />
                    </Space>
                  </>
                )}
              </S.MenuContent>
            </S.Container>
          )}
        </div>
      )}
    </Transition>
  );
};
