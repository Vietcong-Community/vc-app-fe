import { Card } from 'antd';
import styled, { css } from 'styled-components';

import { IThemeProps } from '../../theme/theme';

interface ICardProps {
  $hoverScale: boolean;
  $transparentBackground: boolean;
}

export const CardContainer = styled(Card)<ICardProps>`
  background-color: ${(props: IThemeProps & ICardProps) =>
    props.$transparentBackground ? 'transparent' : props.theme.mainColors.accent10};
  width: 100%;

  .ant-card-body::before {
    display: none;
  }

  .ant-card-body::after {
    display: none;
  }

  ${(props: ICardProps) =>
    props.$hoverScale &&
    css`
      &:hover {
        transform: scale(1.02);
      }
    `}
`;
