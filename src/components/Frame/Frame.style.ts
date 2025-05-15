import styled, { css } from 'styled-components';

import { FrameType } from './enums';

interface IFrameProps {
  frameType: FrameType;
}

export const FrameWrapper = styled.div<IFrameProps>`
  display: inline-block;
  padding: 1px;
  border-radius: 50%;

  ${({ frameType }) => {
    switch (frameType) {
      case FrameType.GOLD:
        return css`
          border: 8px solid gold;
          box-shadow: 0 0 10px gold;
        `;
      case FrameType.SILVER:
        return css`
          border: 8px solid silver;
          box-shadow: 0 0 10px silver;
        `;
      case FrameType.BRONZE:
        return css`
          border: 8px solid #cd7f32;
          box-shadow: 0 0 10px #cd7f32;
        `;
    }
  }}
`;

export const RankBadge = styled.div`
  position: absolute;
  bottom: -5px;
  right: -5px;
  background-color: black;
  color: white;
  font-weight: bold;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
`;
