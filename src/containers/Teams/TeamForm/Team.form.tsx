import React, { ReactNode } from 'react';

import { Form, Space } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from '../../../components/Button/Button';
import { MainButtonVariant } from '../../../components/Button/enums';
import { Card } from '../../../components/Card/Card';
import { InputAreaField } from '../../../components/Fields/InputAreaField/InputAreaField';
import { InputField } from '../../../components/Fields/InputField/InputField';
import { BreakPoints } from '../../../theme/theme';

import { fields, IFormData } from './Team.fields';
import { messages } from './messages';

interface IProps {
  initialValues?: Partial<IFormData>;
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmit: (values: IFormData) => void;
  title: ReactNode;
}

export const TeamForm: React.FC<IProps> = (props: IProps) => {
  const { initialValues, isSubmitting = false, onCancel, onSubmit, title } = props;
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  return (
    <Card style={{ margin: '1rem auto', maxWidth: BreakPoints.sm }} title={title}>
      <Form form={form} initialValues={initialValues} layout="vertical" onFinish={onSubmit}>
        <InputField
          {...fields.name}
          label={<FormattedMessage {...messages.nameLabel} />}
          placeholder={formatMessage(messages.nameLabel)}
        />
        <InputField
          {...fields.tag}
          label={<FormattedMessage {...messages.tagLabel} />}
          placeholder={formatMessage(messages.tagLabel)}
        />
        <InputAreaField
          {...fields.description}
          label={<FormattedMessage {...messages.descriptionLabel} />}
          placeholder={formatMessage(messages.descriptionLabel)}
        />
        <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
          <Button onClick={onCancel} variant={MainButtonVariant.SECONDARY}>
            <FormattedMessage {...messages.cancelButtonLabel} />
          </Button>
          <Button loading={isSubmitting} type="submit">
            <FormattedMessage {...messages.saveButtonLabel} />
          </Button>
        </Space>
      </Form>
    </Card>
  );
};
