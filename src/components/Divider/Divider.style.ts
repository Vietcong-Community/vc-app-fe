import { Divider as AntDDivider } from 'antd';
import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const Divider = styled(AntDDivider)`
  background-color: ${(props: IThemeProps) => props.theme.mainColors.primary};
  margin: 0;
`;
