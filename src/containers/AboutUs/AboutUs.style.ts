import styled, { css } from 'styled-components';

import { BreakPoints } from '../../theme/theme';
import { makeMediaQuery } from '../../utils/mediaQuery';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      overflow: hidden;
    `}
  `};
`;

export const Section = styled.div<{ $revertOnMobile?: boolean }>`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1000px;
  overflow: hidden;
  width: 100%;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      flex-direction: column;
      justify-content: center;
    `}
  `};

  ${(props) =>
    props.$revertOnMobile &&
    css`
      ${() => makeMediaQuery(BreakPoints.md)`
        ${css`
          flex-direction: column-reverse;
        `}
      `};
    `}
`;

export const SectionText = styled.div`
  flex: 1 1 50%;
  padding: 1rem;
`;

export const SectionImage = styled.img`
  height: auto;
  flex: 1 1 50%;
  border-radius: 12px;
  max-width: 40%;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 60%;
  }
`;
