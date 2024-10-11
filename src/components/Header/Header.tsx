import React from 'react';

import { Space } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useRouter } from '../../hooks/RouterHook';
import { Routes } from '../../routes/enums';
import { Button } from '../Button/Button';

import { messages } from './messages';

import * as S from './Header.style';

export const Header: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <S.Container>
      <Space>
        <Button onClick={() => navigate(Routes.LOGIN)}>
          <FormattedMessage id={messages.title.id} defaultMessage={messages.title.defaultMessage} />
        </Button>
        <Button onClick={() => navigate(Routes.REGISTRATION)}>
          <FormattedMessage
            id={messages.goToRegistration.id}
            defaultMessage={messages.goToRegistration.defaultMessage}
          />
        </Button>
        <Button onClick={() => navigate(Routes.HOME)}>
          <FormattedMessage id={messages.goToHomePage.id} defaultMessage={messages.goToHomePage.defaultMessage} />
        </Button>
      </Space>
      <FormattedMessage id={messages.title.id} defaultMessage={messages.title.defaultMessage} />
    </S.Container>
  );
};
