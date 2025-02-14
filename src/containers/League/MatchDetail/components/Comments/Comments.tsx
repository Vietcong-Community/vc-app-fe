import React, { useState } from 'react';

import { Avatar, Pagination } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useUserMe } from '../../../../../api/hooks/auth/api';
import { useAddMatchComment, useMatchComment } from '../../../../../api/hooks/league/api';
import soldier from '../../../../../assets/teamDetail/soldier.webp';
import { EaseInOutContainer } from '../../../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { Card } from '../../../../../components/Card/Card';
import { Divider } from '../../../../../components/Divider/Divider';
import { Gap } from '../../../../../components/Gap/Gap';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { useRouter } from '../../../../../hooks/RouterHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../../../routes/enums';
import { formatDateForUser } from '../../../../../utils/dateUtils';
import { AddCommentForm } from '../AddComment/AddComment.form';

import { IFormData } from './Comments.fields';
import { messages } from './messages';

import * as S from '../Comments/Comments.style';

interface IProps {
  matchId: string;
}

export const Comments: React.FC<IProps> = (props: IProps) => {
  const { matchId } = props;
  const { navigate } = useRouter();
  const { showNotification } = useNotifications();
  const [selectedPage, setSelectedPage] = useState<number>(1);

  const comments = useMatchComment(matchId, { page: selectedPage });
  const userMe = useUserMe('always', [401]);
  const addComment = useAddMatchComment(matchId);

  const onSubmit = async (values: IFormData) => {
    try {
      await addComment.mutateAsync({ comment: values.comment });
      await comments.refetch();
    } catch (error) {
      showNotification(messages.saveCommentError, undefined, NotificationType.ERROR);
    }
  };

  return (
    <EaseInOutContainer isOpen={!comments.isLoading}>
      <Card>
        <S.SectionTitle>
          <FormattedMessage {...messages.title} />
        </S.SectionTitle>
        {comments.data?.comments?.length === 0 && (
          <S.NoCommentsText>
            <FormattedMessage {...messages.noCommentYet} />
          </S.NoCommentsText>
        )}
        {comments.data?.comments?.map((c, index) => (
          <S.CommentBox key={index}>
            <S.DesktopAvatar>
              <Avatar
                shape="square"
                size={100}
                src={<img alt="" src={c.author.image.url ?? soldier} />}
                onClick={() => navigate(Routes.USER_PROFILE.replace(':id', c.author.id))}
              />
            </S.DesktopAvatar>
            <S.CommentContent>
              <S.CommentHeader>
                <div>
                  <S.MobileAvatar>
                    <Avatar
                      shape="square"
                      size={60}
                      src={<img alt="" src={c.author.image.url ?? soldier} />}
                      onClick={() => navigate(Routes.USER_PROFILE.replace(':id', c.author.id))}
                    />
                  </S.MobileAvatar>
                  <S.UserName
                    onClick={() => navigate(Routes.USER_PROFILE.replace(':id', c.author.id))}
                    style={{ cursor: 'pointer' }}
                  >
                    {c.author.nickname}
                  </S.UserName>
                </div>
                <S.Time>{formatDateForUser(c.createdAt)}</S.Time>
              </S.CommentHeader>
              <S.CommentText>
                <p>{c.comment}</p>
              </S.CommentText>
            </S.CommentContent>
          </S.CommentBox>
        ))}
        {(comments.data?.total ?? 0) > 10 && <Gap defaultHeight={8} />}
        <Pagination
          align={'end'}
          responsive
          current={selectedPage}
          defaultPageSize={10}
          hideOnSinglePage
          total={comments.data?.total ?? 0}
          onChange={(value) => setSelectedPage(value)}
          showSizeChanger={false}
          style={{ width: '100%' }}
        />
        {(comments.data?.total ?? 0) > 10 && <Gap defaultHeight={16} />}
        {userMe.isSuccess && (
          <>
            <Divider />
            <AddCommentForm onSubmit={onSubmit} />
          </>
        )}
      </Card>
    </EaseInOutContainer>
  );
};
