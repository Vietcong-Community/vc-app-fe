import React, { CSSProperties } from 'react';

import * as S from './Divider.style';

interface IProps {
  style?: CSSProperties;
}

export const Divider: React.FC<IProps> = (props: IProps) => {
  const { style } = props;

  return <S.Divider style={style} />;
};
