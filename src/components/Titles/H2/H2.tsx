import React from 'react';

import * as S from './H2.style';

interface IProps {
  children?: React.ReactNode;
  id?: string;
}

export const H2: React.FC<IProps> = (props: IProps) => {
  const { children, id } = props;

  return <S.Title id={id}>{children}</S.Title>;
};
