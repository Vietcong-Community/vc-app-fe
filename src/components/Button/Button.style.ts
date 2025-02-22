import { Button } from 'antd';
import styled, { css } from 'styled-components';

import { IThemeProps } from '../../theme/theme';

interface IButtonProps {
  $fullWidth?: boolean;
  $isOutlined?: boolean;
  $isSecondary?: boolean;
}

export const ButtonWrapper = styled(Button)<IButtonProps>`
  box-shadow: none;
  color: ${(props: IThemeProps) => props.theme.colors.white};
  padding: 1.25rem 2rem;
  width: ${(props: IThemeProps & IButtonProps) => (props.$fullWidth ? '100%' : 'fit-content')};

  ${(props: IThemeProps & IButtonProps) =>
    props.$isSecondary &&
    css`
      background-color: ${props.theme.mainColors.secondary} !important;
    `}

  ${(props: IThemeProps & IButtonProps) =>
    props.$isOutlined &&
    css`
      border: 1px solid ${(props: IThemeProps) => props.theme.colors.white};
      color: ${(props: IThemeProps) => props.theme.mainColors.text};
    `}

  &:hover {
    color: ${(props: IThemeProps) => props.theme.colors.white} !important;
    transform: scale(1.05);

    ${(props: IThemeProps & IButtonProps) =>
      props.$isOutlined &&
      css`
        border: 1px solid ${(props: IThemeProps) => props.theme.colors.white} !important;
        color: ${(props: IThemeProps) => props.theme.mainColors.text} !important;
      `}
  }
`;
