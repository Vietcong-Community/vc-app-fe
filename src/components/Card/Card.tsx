import React, { CSSProperties } from 'react';

import * as S from './Card.style';

interface IProps {
  bodyStyle?: CSSProperties;
  bordered?: boolean;
  children?: React.ReactNode;
  style?: CSSProperties;
  transparentBackground?: boolean;
  title?: React.ReactNode;
}
export const Card: React.FC<IProps> = (props: IProps) => {
  const { bordered = false, bodyStyle, children, style, transparentBackground = false, title } = props;

  return (
    <S.CardContainer
      bordered={bordered}
      style={style}
      $transparentBackground={transparentBackground}
      title={title}
      styles={{ body: bodyStyle }}
    >
      {children}
    </S.CardContainer>
  );
};
