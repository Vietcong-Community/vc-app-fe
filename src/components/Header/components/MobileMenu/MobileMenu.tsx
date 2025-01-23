import React, { useContext, useRef } from 'react';

import { LoginOutlined, RightOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Space, Switch } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Transition } from 'react-transition-group';

import logo from '../../../../assets/vclogo-removebg-preview.png';
import { useRouter } from '../../../../hooks/RouterHook';
import { ThemeContext } from '../../../../providers/ThemeProvider/ThemeContext';
import { ThemeType } from '../../../../providers/ThemeProvider/constants';
import { Routes } from '../../../../routes/enums';
import { theme } from '../../../../theme/theme';
import { Gap } from '../../../Gap/Gap';
import { messages } from '../../messages';

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
  userId?: string;
}

export const MobileMenu: React.FC<IProps> = (props) => {
  const { handleLogout, isOpen, onCloseButtonClick, isUserLoggedIn, userId } = props;
  const nodeRef = useRef(null);

  const { selectedTheme, toggleTheme } = useContext(ThemeContext);

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
        <S.MenuItem onClick={() => onMenuItemClick(Routes.MCRVC)}>
          <FormattedMessage {...messages.mcrvcLink} />
          <RightOutlined style={{ fontSize: 22 }} />
        </S.MenuItem>
        <S.MenuItem onClick={() => onMenuItemClick(Routes.STATISTICS)}>
          <FormattedMessage {...messages.statisticsLink} />
          <RightOutlined style={{ fontSize: 22 }} />
        </S.MenuItem>
        <S.MenuItem onClick={() => onMenuItemClick(Routes.ABOUT_US)}>
          <FormattedMessage {...messages.aboutUsLink} />
          <RightOutlined style={{ fontSize: 22 }} />
        </S.MenuItem>
      </>
    );
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
                      <Avatar size={48} icon={<UserOutlined />} />
                      <span style={{ fontSize: '20px' }}>Trapper</span>
                    </S.UserName>
                    <Divider
                      style={{ backgroundColor: theme.mainColors.borderColor, marginBottom: 0, marginTop: 12 }}
                    />
                    {renderGeneralLinks()}
                    <Divider
                      style={{ backgroundColor: theme.mainColors.borderColor, marginBottom: 0, marginTop: 12 }}
                    />
                    <S.MenuItem onClick={() => onMenuItemClick(Routes.USER_PROFILE.replace(':id', userId ?? ''))}>
                      <FormattedMessage {...messages.goToProfilePage} />
                      <RightOutlined style={{ fontSize: 22 }} />
                    </S.MenuItem>
                    <S.MenuItem onClick={() => onMenuItemClick(Routes.PRIVATE_CHANGE_PASSWORD)}>
                      <FormattedMessage {...messages.changePasswordLink} />
                      <RightOutlined style={{ fontSize: 22 }} />
                    </S.MenuItem>
                    <S.MenuLink onClick={toggleTheme}>
                      <FormattedMessage
                        {...(selectedTheme === ThemeType.LIGHT ? messages.darkTheme : messages.lightTheme)}
                      />
                    </S.MenuLink>
                    <S.LogoutLink onClick={handleLogout}>
                      <FormattedMessage {...messages.logout} />
                    </S.LogoutLink>
                  </>
                )}
                {!isUserLoggedIn && (
                  <>
                    <S.UserName>
                      <Avatar size={42} icon={<UserOutlined />} />
                      <span style={{ fontSize: '20px' }}>
                        <FormattedMessage {...messages.userNotLoggedIn} />
                      </span>
                    </S.UserName>
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
                          defaultChecked
                        />
                      </S.SwitchContainer>
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
