import React, { CSSProperties } from 'react';

import Parser from 'html-react-parser';

import * as S from './ReactQuillRenderer.style';

interface IProps {
  data?: string;
  style?: CSSProperties;
}

export const ReactQuillRenderer: React.FC<IProps> = (props: IProps) => {
  const { data, style } = props;

  if (!data) {
    return null;
  }

  return <S.Container style={style}>{Parser(data ?? '')}</S.Container>;
};
