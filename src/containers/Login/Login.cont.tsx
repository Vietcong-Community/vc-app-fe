import React from 'react';

import { LoginForm } from './Login.form';
import { LoginText } from './Login.text';

import * as S from './Login.style';

export const LoginCont: React.FC = () => {
  return (
    <>
      <LoginForm />
      <S.ClipPath>
        <LoginText />
      </S.ClipPath>
    </>
  );
};
