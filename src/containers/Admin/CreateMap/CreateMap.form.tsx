import React from 'react';

import { Form, Space } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from '../../../components/Button/Button';
import { MainButtonVariant } from '../../../components/Button/enums';
import { Card } from '../../../components/Card/Card';
import { CheckboxField } from '../../../components/Checkbox/Checkbox';
import { InputField } from '../../../components/Fields/InputField/InputField';
import { FormComponent } from '../../../components/Form/FormComponent';
import { Gap } from '../../../components/Gap/Gap';
import { BreakPoints } from '../../../theme/theme';

import { fields, IFormData } from './CreateMap.fields';
import { messages } from './messages';

interface IProps {
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (values: IFormData) => void;
}

export const CreateMapForm: React.FC<IProps> = (props: IProps) => {
  const { isSubmitting, onCancel, onSubmit } = props;
  const { formatMessage } = useIntl();
  const [form] = Form.useForm<IFormData>();

  return (
    <Card style={{ margin: '1rem auto', maxWidth: BreakPoints.sm }} title={<FormattedMessage {...messages.title} />}>
      <FormComponent form={form} initialValues={{ official: false }} onSubmit={onSubmit}>
        <InputField
          {...fields.name}
          label={<FormattedMessage {...messages.name} />}
          placeholder={formatMessage(messages.name)}
        />
        <CheckboxField {...fields.official} label={<FormattedMessage {...messages.official} />} />
        <Gap defaultHeight={16} />
        <Space>
          <Button onClick={onCancel} variant={MainButtonVariant.OUTLINED}>
            <FormattedMessage {...messages.cancelButton} />
          </Button>
          <Button loading={isSubmitting} type="submit">
            <FormattedMessage {...messages.submitButton} />
          </Button>
        </Space>
      </FormComponent>
    </Card>
  );
};
