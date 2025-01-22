import React from 'react';

import { Col, Form, Row } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from '../../../components/Button/Button';
import { PasswordField } from '../../../components/Fields/PasswordField/PasswordField';
import { FormComponent } from '../../../components/Form/FormComponent';
import { Gap } from '../../../components/Gap/Gap';
import { H2 } from '../../../components/Titles/H2/H2';

import { fields, IFormData } from './ChangePassword.fields';
import { messages } from './messages';

interface IProps {
  isSubmitting: boolean;
  onSubmit: (values: IFormData) => void;
}

export const ChangePasswordForm: React.FC<IProps> = (props: IProps) => {
  const { isSubmitting, onSubmit } = props;
  const { formatMessage } = useIntl();
  const [form] = Form.useForm<IFormData>();

  return (
    <Row justify="center" align="middle">
      <Col xs={24} sm={12} md={12} lg={6}>
        <FormComponent form={form} onSubmit={onSubmit}>
          <H2>
            <FormattedMessage {...messages.title} />
          </H2>
          <p>
            <FormattedMessage {...messages.description} />
          </p>
          <PasswordField
            {...fields.password}
            label={<FormattedMessage {...messages.passwordLabel} />}
            placeholder={formatMessage(messages.passwordLabel)}
          />
          <PasswordField
            {...fields.passwordConfirm}
            label={<FormattedMessage {...messages.confirmPasswordLabel} />}
            placeholder={formatMessage(messages.confirmPasswordLabel)}
          />
          <Gap defaultHeight={16} />
          <Button loading={isSubmitting} type="submit">
            <FormattedMessage {...messages.submitButton} />
          </Button>
        </FormComponent>
      </Col>
    </Row>
  );
};
