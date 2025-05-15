import React from 'react';

import { Avatar } from 'antd';

import { FrameType } from './enums';

import * as S from './Frame.style';

interface IProps {
  frameType: FrameType;
  src: string | undefined;
  size?: number;
  alt?: string;
  rank?: number;
}

export const Frame: React.FC<IProps> = ({ frameType, src, size, alt, rank }) => {
  return (
    <S.FrameWrapper frameType={frameType}>
      <Avatar src={src} size={size} alt={alt} style={{ borderRadius: '50%' }} />
      {rank && <S.RankBadge>{rank}.</S.RankBadge>}
    </S.FrameWrapper>
  );
};
