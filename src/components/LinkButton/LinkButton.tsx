import React, { CSSProperties, ReactNode } from 'react';

import * as S from './LinkButton.style';

interface IProps {
  children: ReactNode;
  onClick: () => void;
  style?: CSSProperties;
  withScale?: boolean;
}

export const LinkButton: React.FC<IProps> = (props: IProps) => {
  const { children, onClick, style, withScale = true } = props;

  return (
    <S.LinkButton onClick={onClick} style={style} $withScale={withScale}>
      {children}
    </S.LinkButton>
  );
};
