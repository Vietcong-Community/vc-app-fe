import React, { ReactNode } from 'react';

import { Form, Row, Col } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import loginPic from '../../assets/loginPic.png';
import { Button } from '../../components/Button/Button';
import { CheckboxField } from '../../components/Checkbox/Checkbox';
import { InputField } from '../../components/Fields/InputField/InputField';
import { PasswordField } from '../../components/Fields/PasswordField/PasswordField';

import { fields, IFormData } from './Login.fields';
import { messages } from './messages';

import * as S from './Login.style';

interface IProps {
  initialValues?: Partial<IFormData>;
  isSubmitting?: boolean;
  onSubmit: (values: IFormData) => void;
  title: ReactNode;
}

export const LoginForm: React.FC<IProps> = (props: IProps) => {
  const { initialValues, isSubmitting = false, onSubmit } = props;
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  return (
    <>
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
          <img src={loginPic} alt="Voják na loginu" style={{ maxWidth: '100%', height: 'auto', marginTop: '35px' }} />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form form={form} initialValues={initialValues} layout="vertical" onFinish={onSubmit}>
            <S.Highlight2>
              <FormattedMessage {...messages.title} />
            </S.Highlight2>
            <br />
            <InputField
              {...fields.username}
              label={<FormattedMessage {...messages.usernameLabel} />}
              placeholder={formatMessage(messages.usernameLabel)}
            />

            <PasswordField
              {...fields.password}
              label={<FormattedMessage {...messages.passwordLabel} />}
              placeholder={formatMessage(messages.passwordLabel)}
            />

            <CheckboxField
              name="remember"
              label={<FormattedMessage {...messages.rememberCBLabel} />}
              required={false}
              rules={[{ required: false }]}
            />
            <Button loading={isSubmitting} type="submit">
              <FormattedMessage {...messages.loginButtonLabel} />
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
