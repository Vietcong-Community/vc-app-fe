import React, { ReactNode } from 'react';

import { Button, Checkbox, Col, Form, Row } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import vojakReg from '../../assets/vojak_reg.png';
import { InputField } from '../../components/Fields/InputField/InputField';

import { fields, IFormData } from './Registration.fields';
import { messages } from './messages';

interface IProps {
  initialValues?: Partial<IFormData>;
  isSubmitting?: boolean;
  onCancel: () => void;
  onSubmit: (values: IFormData) => void;
  title: ReactNode;
}

export const RegistrationForm: React.FC<IProps> = (props: IProps) => {
  {
    /**
    const onSubmitSuccess = (values: object) => {
    console.log('Úspěšná registrace:', values);
  };
  const onSubmitFailed = (errorInfo: object) => {
    console.log('Chyba při registraci:', errorInfo);
  };
        **/
  }
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
              {...fields.name}
              label={<FormattedMessage {...messages.nameLabel} />}
              placeholder={formatMessage(messages.nameLabel)}
            />
            <InputField
              {...fields.surname}
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
            <InputField
              {...fields.password}
              label={<FormattedMessage {...messages.passwordLabel} />}
              placeholder={formatMessage(messages.passwordLabel)}
            />
            <InputField
              {...fields.passwordConfirm}
              label={<FormattedMessage {...messages.confirmPasswordLabel} />}
              placeholder={formatMessage(messages.confirmPasswordLabel)}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue(fields.password) === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Hesla se neshodují!'));
                  },
                }),
              ]}
            />
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Zapamatuj si mě</Checkbox>
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
              style={{ display: 'flex', whiteSpace: 'nowrap' }}
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Musíte souhlasit s podmínkami!')),
                },
              ]}
            >
              <Checkbox>
                Souhlasím s <a href="http://www.basccijebuh.cz">podmínkami používání</a>
              </Checkbox>
            </Form.Item>
            {/**
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button htmlType="submit">Registrovat</Button>
            </Form.Item>
                **/}
            <Button loading={isSubmitting} htmlType="submit">
              <FormattedMessage {...messages.loginButtonLabel} />
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
