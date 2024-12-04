import React from 'react';

import * as S from './H2.style';

interface IProps {
  children?: React.ReactNode;
}

export const H2: React.FC<IProps> = (props: IProps) => {
  const { children } = props;

  return <S.Title>{children}</S.Title>;
};
