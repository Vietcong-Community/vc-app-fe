import { Collapse } from 'antd';
import styled from 'styled-components';

import { IThemeProps } from '../../theme/theme';

export const Container = styled(Collapse)`
  width: 100%;

  .ant-collapse {
    background: linear-gradient(
      160deg,
      ${(props: IThemeProps) => props.theme.mainColors.primary},
      ${(props: IThemeProps) => props.theme.mainColors.accent}
    );
    border: 1px solid ${(props: IThemeProps) => props.theme.mainColors.primary};
  }
`;
