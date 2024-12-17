import React, { ReactNode } from 'react';

import { Col, Form, Row } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import vojakReg from '../../assets/vojak_reg.png';
import { Button } from '../../components/Button/Button';
import { CheckboxField } from '../../components/Checkbox/Checkbox';
import { InputField } from '../../components/Fields/InputField/InputField';
import { PasswordField } from '../../components/Fields/PasswordField/PasswordField';

import { fields, IFormData } from './Registration.fields';
import { messages } from './messages';

interface IProps {
  initialValues?: Partial<IFormData>;
  isSubmitting?: boolean;
  onSubmit: (values: IFormData) => void;
  title: ReactNode;
}

export const RegistrationForm: React.FC<IProps> = (props: IProps) => {
  const { initialValues, isSubmitting = false, onSubmit } = props;
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: '80vh',
          marginTop: '-191px',
        }}
      >
        <Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
          <img src={vojakReg} alt="Voják na registraci" style={{ maxWidth: '70%', height: 'auto' }} />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form form={form} initialValues={initialValues} layout="vertical" onFinish={onSubmit}>
            <h2 style={{ marginLeft: '-180px', marginTop: '120px', marginBottom: '30px' }}>Registrace</h2>
            <br />
            <InputField
              {...fields.firstName}
              label={<FormattedMessage {...messages.nameLabel} />}
              placeholder={formatMessage(messages.nameLabel)}
            />
            <InputField
              {...fields.lastName}
              label={<FormattedMessage {...messages.surnameLabel} />}
              placeholder={formatMessage(messages.surnameLabel)}
            />
            <InputField
              {...fields.username}
              label={<FormattedMessage {...messages.usernameLabel} />}
              placeholder={formatMessage(messages.usernameLabel)}
            />
            <InputField
              {...fields.email}
              label={<FormattedMessage {...messages.emailLabel} />}
              placeholder={formatMessage(messages.emailLabel)}
            />
            <PasswordField
              {...fields.password}
              label={<FormattedMessage {...messages.passwordLabel} />}
              placeholder={formatMessage(messages.passwordLabel)}
            />
            <PasswordField
              {...fields.passwordConfirm}
              label={<FormattedMessage {...messages.confirmPasswordLabel} />}
              placeholder={formatMessage(messages.confirmPasswordLabel)}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Hesla se neshodují!'));
                  },
                }),
              ]}
            />
            <CheckboxField
              name="remember"
              label={<FormattedMessage {...messages.rememberCBLabel} />}
              required={false}
              rules={[{ required: false }]}
            />
            <CheckboxField
              name="agreement"
              label={
                <FormattedMessage
                  {...messages.agreementCBLabel}
                  values={{
                    a: (chunks: React.ReactNode) => (
                      <a href="http://www.basccijebuh.cz" target="_blank" rel="noopener noreferrer">
                        {chunks}
                      </a>
                    ),
                  }}
                />
              }
              required={true}
              rules={[{ required: true, message: formatMessage(messages.agreementCBFailed) }]}
            />
            <Button loading={isSubmitting} type="submit">
              <FormattedMessage {...messages.registerButtonLabel} />
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
