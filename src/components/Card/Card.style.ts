import { Card } from 'antd';
import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

interface ICardProps {
  $transparentBackground: boolean;
}

export const CardContainer = styled(Card)<ICardProps>`
  background-color: ${(props: IThemeProps & ICardProps) =>
    props.$transparentBackground ? 'transparent' : props.theme.mainColors.accent10};
  width: 100%;
`;
