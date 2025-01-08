import React from 'react';

import { FormattedMessage } from 'react-intl';

import { LoginForm } from './Login.form';
import { LoginText } from './Login.text';
import { messages } from './messages';

import * as S from './Login.style';

export const LoginCont: React.FC = () => {
  const onSubmit = () => {};
  return (
    <>
      <LoginForm isSubmitting={false} onSubmit={onSubmit} title={<FormattedMessage {...messages.createTitle} />} />
      <S.ClipPath>
        <LoginText />
      </S.ClipPath>
    </>
  );
};
