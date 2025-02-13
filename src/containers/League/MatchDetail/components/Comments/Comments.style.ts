import styled, { css } from 'styled-components';

import { BreakPoints, IThemeProps } from '../../../../../theme/theme';
import { makeMediaQuery } from '../../../../../utils/mediaQuery';

export const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-align: start;
  width: 100%;
`;

export const CommentInput = styled.div`
  width: 50%;
  padding: 10px;
  font-size: 14px;
  resize: none;
  margin: 0 auto;
  text-align: center;

  ${() => makeMediaQuery(BreakPoints.md)`
    ${css`
      width: 100%;
    `}
  `};
`;

export const CommentBox = styled.div`
  background: ${(props: IThemeProps) => props.theme.mainColors.secondary30};
  padding: 12px;
  border-radius: 5px;
  width: 100%;
  margin: 10px auto;
  display: flex;
  align-items: flex-start; /* Zarovná prvky nahoru */
  gap: 12px; /* Mezera mezi avatarem a obsahem */
`;

export const UserName = styled.span`
  color: ${(props: IThemeProps) => props.theme.mainColors.text};
  font-weight: 500;
  font-size: 16px;

  ${() => makeMediaQuery(BreakPoints.md)`
    margin-top: 20px;
  `}
`;

export const Time = styled.span`
  font-size: 12px;
  color: #777;
`;

export const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CommentText = styled.div`
  font-size: 14px;
  color: ${(props: IThemeProps) => props.theme.mainColors.text};
  text-align: left;
`;

export const CommentReactions = styled.div`
  text-align: right;
  overflow: hidden;
`;

export const Icons = styled.span`
  font-size: 18px;
  padding: 0 8px;
  display: inline-block;
  transition: transform 0.05s ease;
  color: ${(props: IThemeProps) => props.theme.mainColors.secondary};

  &:hover {
    color: ${(props: IThemeProps) => props.theme.mainColors.text};
  }

  &:active {
    transform: scale(1.4);
  }
`;

export const NoCommentsText = styled.p`
  color: ${(props: IThemeProps) => props.theme.mainColors.secondary55};
  font-style: italic;
`;

export const Image = styled.img`
  max-width: 100%;
  height: 100%;
  border-radius: 10%;
  cursor: pointer;
`;

export const CommentAvatar = styled.div`
  width: 100px;
  min-width: 40px;
  height: 100px;
  border-radius: 10%;
  background-color: transparent;

  @media (max-width: 392px) {
    display: none;
  }
`;
