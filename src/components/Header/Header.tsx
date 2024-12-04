import React from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { FormattedMessage } from 'react-intl';

import logo from '../../assets/vclogo-removebg-preview.png';
import { useRouter } from '../../hooks/RouterHook';
import { Routes } from '../../routes/enums';

import { messages } from './messages';

import * as S from './Header.style';

export const Header: React.FC = () => {
  const { navigate } = useRouter();

  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <span onClick={() => navigate(Routes.USER)}>
          <FormattedMessage id={messages.goToProfilePage.id} defaultMessage={messages.goToProfilePage.defaultMessage} />
        </span>
      ),
    },
    {
      key: 'change-password',
      label: (
        <span onClick={() => navigate(Routes.HOME)}>
          <FormattedMessage id="Změna hesla" defaultMessage="Změna hesla" />
        </span>
      ),
    },
    {
      key: 'logout',
      label: (
        <span onClick={() => navigate(Routes.HOME)}>
          <FormattedMessage id="Odhlásit se" defaultMessage="Odhlásit se" />
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
          <Menu mode="horizontal" selectable={false} style={{ borderBottom: 'none' }}>
            <Menu.Item key="home" onClick={() => navigate(Routes.HOME)}>
              <FormattedMessage id={messages.goToHomePage.id} defaultMessage={messages.goToHomePage.defaultMessage} />
            </Menu.Item>
            <Menu.Item key="mixLeague" onClick={() => navigate(Routes.MIX_LEAGUE_OVERVIEW)}>
              <FormattedMessage
                id={messages.goToMixLeaguePage.id}
                defaultMessage={messages.goToMixLeaguePage.defaultMessage}
              />
            </Menu.Item>
            <Menu.Item key="profile" onClick={() => navigate(Routes.REGISTRATION)}>
              <FormattedMessage id={messages.goToMcrvcPage.id} defaultMessage={messages.goToMcrvcPage.defaultMessage} />
            </Menu.Item>
            <Menu.Item key="rules" onClick={() => navigate(Routes.LOGIN)}>
              <FormattedMessage id={messages.goToGloryPage.id} defaultMessage={messages.goToGloryPage.defaultMessage} />
            </Menu.Item>
            <Menu.Item key="rules" onClick={() => navigate(Routes.LOGIN)}>
              <FormattedMessage id={messages.goToRulesPage.id} defaultMessage={messages.goToRulesPage.defaultMessage} />
            </Menu.Item>
            <Menu.Item key="rules" onClick={() => navigate(Routes.LOGIN)}>
              <FormattedMessage id={messages.goToRulesPage.id} defaultMessage={messages.goToRulesPage.defaultMessage} />
            </Menu.Item>
          </Menu>
        </S.MenuContainer>
        <S.RightSection>
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
            <span style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <UserOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
              <span style={{ fontSize: '15px', marginTop: '3px', marginRight: '8px' }}>#Basccino</span>
            </span>
          </Dropdown>
          <Menu mode="horizontal" selectable={true}>
            <Menu.Item key="registration" onClick={() => navigate(Routes.REGISTRATION)}>
              <FormattedMessage
                id={messages.goToRegistration.id}
                defaultMessage={messages.goToRegistration.defaultMessage}
              />
            </Menu.Item>
            <Menu.Item key="login" onClick={() => navigate(Routes.LOGIN)}>
              <FormattedMessage id={messages.goToLogin.id} defaultMessage={messages.goToLogin.defaultMessage} />
            </Menu.Item>
            <Menu.Item key="profile" onClick={() => navigate(Routes.REGISTRATION)}>
              <FormattedMessage
                id={messages.goToProfilePage.id}
                defaultMessage={messages.goToProfilePage.defaultMessage}
              />
            </Menu.Item>
          </Menu>
        </S.RightSection>
      </S.Content>
    </S.Container>
  );
};
