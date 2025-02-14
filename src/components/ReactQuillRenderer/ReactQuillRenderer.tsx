import React from 'react';

import Parser from 'html-react-parser';

import * as S from './ReactQuillRenderer.style';

interface IProps {
  data?: string;
}

export const ReactQuillRenderer: React.FC<IProps> = (props: IProps) => {
  const { data } = props;

  if (!data) {
    return null;
  }

  return <S.Container>{Parser(data ?? '')}</S.Container>;
};
