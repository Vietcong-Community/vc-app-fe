import React from 'react';

import { Form } from 'antd';
import { FormattedMessage } from 'react-intl';

import { Button } from '../../Button/Button';
import { InputAreaField } from '../../Fields/InputAreaField/InputAreaField';
import { FormComponent } from '../../Form/FormComponent';
import { Gap } from '../../Gap/Gap';

import { fields, IFormData } from './AddComment.fields';
import { messages } from './messages';

import * as S from '../Comments/Comments.style';

interface IProps {
  onSubmit: (values: IFormData) => Promise<void>;
}

export const AddCommentForm: React.FC<IProps> = (props: IProps) => {
  const { onSubmit } = props;
  const [form] = Form.useForm<IFormData>();

  const onFormSubmit = async (values: IFormData) => {
    try {
      await onSubmit(values);
      form.resetFields();
    } catch {
      form.focusField('comment');
    }
  };

  return (
    <FormComponent form={form} onSubmit={onFormSubmit}>
      <S.CommentInput>
        <InputAreaField {...fields.comment} />
        <Gap defaultHeight={8} />
        <Button type="submit">
          <FormattedMessage {...messages.addButton} />
        </Button>
      </S.CommentInput>
    </FormComponent>
  );
};
