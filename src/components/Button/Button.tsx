import React, { CSSProperties } from 'react';

import { Button as AntDButton, Spin } from 'antd';
import { ButtonType } from 'antd/lib/button';

interface IProps {
  disabled?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  onClick: () => void;
  style?: CSSProperties;
  type?: ButtonType;
}

export const Button: React.FC<IProps> = (props) => {
  const { disabled, children, fullWidth = false, loading = false, onClick, style, type = 'primary' } = props;

  const isDisabled = disabled || loading;

  return (
    <AntDButton
      disabled={isDisabled}
      onClick={onClick}
      type={type as ButtonType}
      style={{ width: fullWidth ? '100%' : 'fit-content', ...style }}
    >
      {loading && <Spin size="small" />}
      {!loading && children}
    </AntDButton>
  );
};
