import React, { CSSProperties } from 'react';

import * as S from './Card.style';

interface IProps {
  bodyStyle?: CSSProperties;
  bordered?: boolean;
  hoverScale?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: CSSProperties;
  transparentBackground?: boolean;
  title?: React.ReactNode;
}
export const Card: React.FC<IProps> = (props: IProps) => {
  const {
    bordered = false,
    bodyStyle,
    hoverScale = false,
    children,
    onClick,
    style,
    transparentBackground = false,
    title,
  } = props;

  return (
    <S.CardContainer
      bordered={bordered}
      onClick={onClick}
      $hoverScale={hoverScale}
      $transparentBackground={transparentBackground}
      style={style}
      title={title}
      styles={{ body: bodyStyle, header: { display: 'none' } }}
    >
      {children}
    </S.CardContainer>
  );
};
