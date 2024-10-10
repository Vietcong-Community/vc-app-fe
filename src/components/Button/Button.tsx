import React from 'react';

import { Button as AntDButton } from 'antd';
import { ButtonType } from 'antd/lib/button';

interface IProps {
  children?: React.ReactNode;
  onClick: () => void;
  type?: ButtonType;
}

export const Button: React.FC<IProps> = (props) => {
  const { children, onClick, type = 'primary' } = props;

  return (
    <AntDButton onClick={onClick} type={type as ButtonType}>
      {children}
    </AntDButton>
  );
};
