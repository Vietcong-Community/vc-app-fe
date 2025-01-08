import React from 'react';

import * as S from './H1.style';

interface IProps {
  children?: React.ReactNode;
}

export const H1: React.FC<IProps> = (props: IProps) => {
  const { children } = props;

  return <S.Title>{children}</S.Title>;
};
