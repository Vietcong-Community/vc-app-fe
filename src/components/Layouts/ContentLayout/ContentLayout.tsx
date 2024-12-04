import React from 'react';

import * as S from './ContentLayout.style';

interface IProps {
  children?: React.ReactNode;
}

export const ContentLayout: React.FC<IProps> = (props: IProps) => {
  const { children } = props;

  return <S.Container>{children}</S.Container>;
};
