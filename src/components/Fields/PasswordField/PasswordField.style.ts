import styled from 'styled-components';

import { IThemeProps } from '../../../theme/theme';

export const InputContainer = styled.div`
  .ant-input-affix-wrapper {
    border: 1px solid ${(props: IThemeProps) => props.theme.mainColors.secondary};
  }
`;
