import React, { CSSProperties } from 'react';

import { Spin } from 'antd';

import { MainButtonVariant } from './enums';

import * as S from './Button.style';

interface IProps {
  disabled?: boolean;
  children?: React.ReactNode;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  loading?: boolean;
  onClick?: () => void;
  outlined?: boolean;
  style?: CSSProperties;
  type?: 'submit' | 'button';
  variant?: MainButtonVariant;
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
    variant = MainButtonVariant.PRIMARY,
  } = props;

  const isDisabled = disabled || loading;

  if (variant === MainButtonVariant.OUTLINED) {
    return (
      <S.ButtonWrapper
        disabled={isDisabled}
        $fullWidth={fullWidth}
        htmlType={type}
        icon={icon}
        iconPosition={iconPosition}
        $isOutlined
        onClick={onClick}
        type="default"
        style={{
          ...style,
        }}
        variant="outlined"
      >
        {loading && <Spin size="small" />}
        {!loading && children}
      </S.ButtonWrapper>
    );
  }

  if (variant === MainButtonVariant.SECONDARY) {
    return (
      <S.ButtonWrapper
        disabled={isDisabled}
        $fullWidth={fullWidth}
        htmlType={type}
        icon={icon}
        iconPosition={iconPosition}
        $isSecondary
        onClick={onClick}
        type="default"
        style={style}
        variant="filled"
      >
        {loading && <Spin size="small" />}
        {!loading && children}
      </S.ButtonWrapper>
    );
  }

  return (
    <S.ButtonWrapper
      disabled={isDisabled}
      $fullWidth={fullWidth}
      htmlType={type}
      icon={icon}
      iconPosition={iconPosition}
      onClick={onClick}
      type="primary"
      style={style}
    >
      {loading && <Spin size="small" />}
      {!loading && children}
    </S.ButtonWrapper>
  );
};
