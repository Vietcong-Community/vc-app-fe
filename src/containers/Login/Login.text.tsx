import React from 'react';

import { StarOutlined } from '@ant-design/icons';

import * as S from './Login.style';

export const LoginText: React.FC = () => {
  return (
    <>
      <S.LoginText>
        <S.SlideIn>
          <StarOutlined></StarOutlined> Přihlaš se a bojuj o své místo v mix lize
        </S.SlideIn>
        <S.SlideIn>
          <StarOutlined></StarOutlined> Za své statistiky sbírej ocenění
        </S.SlideIn>
      </S.LoginText>
    </>
  );
};
