import React, { CSSProperties } from 'react';

import { Alert as AntDAlert } from 'antd';

import * as S from './Alert.style';

interface IProps {
  title: string;
  description?: string;
  type: 'info' | 'warning' | 'success' | 'error';
  showIcon?: boolean;
  style?: CSSProperties;
}

export const Alert: React.FC<IProps> = (props: IProps) => {
  const { description, title, type, showIcon = false, style } = props;

  return (
    <S.AlertContainer>
      <AntDAlert message={title} description={description} type={type} showIcon={showIcon} style={style} />
    </S.AlertContainer>
  );
};
