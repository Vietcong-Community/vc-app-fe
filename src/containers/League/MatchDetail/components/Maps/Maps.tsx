import React from 'react';

import arroyo from '../../../../../assets/mapPreview/Arroyo.png';
import storm from '../../../../../assets/mapPreview/Storm.png';

import * as S from './Maps.style';

interface IProps {
  maps: { id: string; name: string }[];
}

export const Maps: React.FC<IProps> = (props: IProps) => {
  const { maps } = props;

  const firstMap = maps?.[0];
  const secondMap = maps?.[1];

  return (
    <S.MapsContainer>
      <S.Map>
        <S.MapName>
          {firstMap?.name} <br />
          Arroyo
        </S.MapName>
        <img src={arroyo} alt="" />
      </S.Map>
      <S.Map>
        <S.MapName>
          {secondMap?.name} <br />
          Storm
        </S.MapName>
        <img src={storm} alt="" />
      </S.Map>
    </S.MapsContainer>
  );
};
