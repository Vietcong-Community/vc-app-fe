import styled from 'styled-components';

import { BreakPoints } from '../../theme/theme';

import { IGapHeight } from './Gap';

interface IGapProps extends IGapHeight {
  $defaultHeight: number;
}

export const GapContainer = styled.div<IGapProps>`
  height: ${(props: IGapProps) => props.$defaultHeight}px;

  @media screen and (max-width: ${BreakPoints.lg}px) {
    height: ${(props: IGapProps) => props.lg}px;
  }
  @media screen and (max-width: ${BreakPoints.md}px) {
    height: ${(props: IGapProps) => props.md}px;
  }
  @media screen and (max-width: ${BreakPoints.sm}px) {
    height: ${(props: IGapProps) => props.sm}px;
  }
  @media screen and (max-width: ${BreakPoints.xs}px) {
    height: ${(props: IGapProps) => props.xs}px;
  }
`;
