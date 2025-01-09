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
  color: ${(props: IThemeProps) => props.theme.mainColors.text};
  padding: 1.25rem 2rem;
  width: ${(props: IThemeProps & IButtonProps) => (props.$fullWidth ? '100%' : 'fit-content')};

  ${(props: IThemeProps & IButtonProps) =>
    props.$isSecondary &&
    css`
      background-color: ${props.theme.mainColors.secondary} !important;
    `}

  &:hover {
    color: ${(props: IThemeProps) => props.theme.mainColors.text} !important;
    transform: scale(1.05);
  }
`;
