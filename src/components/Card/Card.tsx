import React, { CSSProperties } from 'react';

import { Card as AntDCard } from 'antd';

interface IProps {
  children?: React.ReactNode;
  style?: CSSProperties;
  title?: React.ReactNode;
}
export const Card: React.FC<IProps> = (props: IProps) => {
  const { children, style, title } = props;

  return (
    <AntDCard bordered style={{ width: '100%', ...style }} title={title}>
      {children}
    </AntDCard>
  );
};
