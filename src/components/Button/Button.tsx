import React, { CSSProperties } from 'react';

import { Button as AntDButton, Spin } from 'antd';
import { ButtonType } from 'antd/lib/button';

interface IProps {
  disabled?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  loading?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  type?: 'submit' | 'button';
  variant?: ButtonType;
}

export const Button: React.FC<IProps> = (props) => {
  const {
    disabled,
    children,
    fullWidth = false,
    icon,
    iconPosition = 'start',
    loading = false,
    onClick,
    style,
    type = 'button',
    variant = 'primary',
  } = props;

  const isDisabled = disabled || loading;

  return (
    <AntDButton
      disabled={isDisabled}
      htmlType={type}
      icon={icon}
      iconPosition={iconPosition}
      onClick={onClick}
      type={variant as ButtonType}
      style={{ width: fullWidth ? '100%' : 'fit-content', ...style }}
    >
      {loading && <Spin size="small" />}
      {!loading && children}
    </AntDButton>
  );
};
