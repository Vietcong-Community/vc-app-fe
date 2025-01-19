import styled from 'styled-components';

import { IThemeProps } from '../../../theme/theme';

export const InputContainer = styled.div`
  textarea {
    border: 1px solid ${(props: IThemeProps) => props.theme.mainColors.secondary};
  }
`;
