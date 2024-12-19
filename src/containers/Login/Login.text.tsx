import React from 'react';

import { StarOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

import * as S from './Login.style';

export const LoginText: React.FC = () => {
  return (
    <>
      <S.LoginText>
        <S.SlideIn>
          <StarOutlined></StarOutlined>
          <FormattedMessage {...messages.slideTextA} />
        </S.SlideIn>
        <S.SlideIn>
          <StarOutlined></StarOutlined>
          <FormattedMessage {...messages.slideTextB} />
        </S.SlideIn>
      </S.LoginText>
    </>
  );
};
