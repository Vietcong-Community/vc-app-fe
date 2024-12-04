import React from 'react';

import * as S from './Title.style';

interface IProps {
  children?: React.ReactNode;
}

export const Title: React.FC<IProps> = (props: IProps) => {
  const { children } = props;

  return <S.Title>{children}</S.Title>;
};
