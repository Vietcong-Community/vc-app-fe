import React from 'react';

// import { DislikeFilled, LikeFilled } from '@ant-design/icons';
import { Form } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useUserMe } from '../../../../../api/hooks/auth/api';
import { useAddMatchComment, useMatchComment } from '../../../../../api/hooks/league/api';
import soldier from '../../../../../assets/teamDetail/soldier.webp';
import { Button } from '../../../../../components/Button/Button';
import { Card } from '../../../../../components/Card/Card';
import { InputAreaField } from '../../../../../components/Fields/InputAreaField/InputAreaField';
import { FormComponent } from '../../../../../components/Form/FormComponent';
import { Gap } from '../../../../../components/Gap/Gap';
import { useRouter } from '../../../../../hooks/RouterHook';
import { Routes } from '../../../../../routes/enums';
import { formatDateForUser } from '../../../../../utils/dateUtils';

import { IFormData } from './Comments.fields';
import { messages } from './messages';

import * as S from '../Comments/Comments.style';

interface IProps {
  matchId: string;
}

export const Comments: React.FC<IProps> = (props: IProps) => {
  const { matchId } = props;
  const comments = useMatchComment(matchId);
  const [form] = Form.useForm<IFormData>();
  const addComment = useAddMatchComment(matchId);
  const userMe = useUserMe('always', [401]);
  const { navigate } = useRouter();

  const onSubmit = async (values: IFormData) => {
    try {
      await addComment.mutateAsync({ comment: values.comment });
      form.resetFields();
      await comments.refetch();
    } catch (error) {
      console.log('Chyba při vkládání komentáře!');
    }
  };

  return (
    <Card>
      <S.SectionTitle>
        <FormattedMessage {...messages.title} />
      </S.SectionTitle>

      {comments.data?.comments?.map((c, index) => (
        <S.CommentBox key={index}>
          <S.CommentAvatar>
            <S.Image
              src={c.author.image.url ?? soldier}
              alt="avatar"
              onClick={() => navigate(Routes.USER_PROFILE.replace(':id', c.author.id))}
            />
          </S.CommentAvatar>
          <S.CommentContent>
            <S.CommentHeader>
              <S.UserName
                onClick={() => navigate(Routes.USER_PROFILE.replace(':id', c.author.id))}
                style={{ cursor: 'pointer' }}
              >
                {c.author.nickname}
              </S.UserName>
              <S.Time>{formatDateForUser(c.createdAt)}</S.Time>
            </S.CommentHeader>
            <S.CommentText>
              <p>{c.comment}</p>
            </S.CommentText>
            {/*<S.CommentReactions>*/}
            {/*  <S.Icons>*/}
            {/*    <LikeFilled />*/}
            {/*  </S.Icons>*/}
            {/*  0*/}
            {/*  <S.Icons>*/}
            {/*    <DislikeFilled />*/}
            {/*  </S.Icons>*/}
            {/*  0*/}
            {/*</S.CommentReactions>*/}
          </S.CommentContent>
        </S.CommentBox>
      ))}

      <hr />
      {userMe && (
        <FormComponent form={form} onSubmit={onSubmit}>
          <S.CommentInput>
            <InputAreaField label={''} name={'comment'} />
            <Gap defaultHeight={8} />
            <Button type="submit">
              <FormattedMessage {...messages.addButton} />
            </Button>
          </S.CommentInput>
        </FormComponent>
      )}
    </Card>
  );
};
