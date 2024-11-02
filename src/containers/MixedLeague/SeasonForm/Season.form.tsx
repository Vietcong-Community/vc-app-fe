import React, { ReactNode } from 'react';

import { Form, Space } from 'antd';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from '../../../components/Button/Button';
import { Card } from '../../../components/Card/Card';
import { DatePickerField } from '../../../components/Fields/DatePickerField/DatePickerField';
import { InputField } from '../../../components/Fields/InputField/InputField';
import { BreakPoints } from '../../../theme/theme';

import { fields, IFormData } from './Season.fields';
import { messages } from './messages';

interface IProps {
  initialValues?: Partial<IFormData>;
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmit: (values: IFormData) => void;
  title: ReactNode;
}

export const SeasonForm: React.FC<IProps> = (props: IProps) => {
  const { initialValues, isSubmitting = false, onCancel, onSubmit, title } = props;
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  const minimalStartDate = dayjs();

  return (
    <Card style={{ margin: '1rem auto', maxWidth: BreakPoints.sm }} title={title}>
      <Form form={form} initialValues={initialValues} layout="vertical" onFinish={onSubmit}>
        <InputField
          {...fields.name}
          label={<FormattedMessage {...messages.nameLabel} />}
          placeholder={formatMessage(messages.nameLabel)}
        />
        <DatePickerField
          {...fields.startDate}
          minimalDate={minimalStartDate}
          label={<FormattedMessage {...messages.startDateLabel} />}
        />
        <DatePickerField
          {...fields.endDate}
          minimalDate={minimalStartDate}
          label={<FormattedMessage {...messages.endDateLabel} />}
        />
        <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
          <Button onClick={onCancel} variant="default">
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
