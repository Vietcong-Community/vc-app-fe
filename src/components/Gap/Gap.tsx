import React from 'react';

import * as S from './Gap.style';

export interface IGapHeight {
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
}

interface IProps {
  defaultHeight: number;
  children?: never;
  height?: IGapHeight;
}

export const Gap: React.FC<IProps> = (props) => {
  const { height = {}, defaultHeight } = props;
  const { lg = defaultHeight, md = lg, sm = md, xs = sm } = height;
  return <S.GapContainer lg={lg} md={md} sm={sm} xs={xs} defaultHeight={defaultHeight} />;
};
