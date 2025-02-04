import React from 'react';

import { Col, Form, Row } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import vojakReg from '../../../assets/registration/soldier.png';
import { Button } from '../../../components/Button/Button';
import { InputField } from '../../../components/Fields/InputField/InputField';
import { PasswordField } from '../../../components/Fields/PasswordField/PasswordField';
import { Gap } from '../../../components/Gap/Gap';
import { LinkButton } from '../../../components/LinkButton/LinkButton';
import { H2 } from '../../../components/Titles/H2/H2';
import { parseToLowerCase, removeWhiteSpaces } from '../../../utils/formUtils';

import { fields, IFormData } from './Registration.fields';
import { messages } from './messages';

import * as S from './Registration.style';

interface IProps {
  goToLogin: () => void;
  initialValues?: Partial<IFormData>;
  isSubmitting?: boolean;
  onSubmit: (values: IFormData) => void;
}

export const RegistrationForm: React.FC<IProps> = (props: IProps) => {
  const { goToLogin, initialValues, isSubmitting = false, onSubmit } = props;
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  return (
    <>
      <Row justify="center" align="middle">
        <Col xs={0} sm={0} md={12} lg={6} style={{ textAlign: 'center' }}>
          <S.Image src={vojakReg} alt="Voják na registraci" />
        </Col>
        <Col md={0} lg={2} />
        <Col xs={24} sm={12} md={12} lg={6}>
          <Form
            form={form}
            initialValues={initialValues}
            layout="vertical"
            onFinish={onSubmit}
            scrollToFirstError
            validateTrigger="onBlur"
          >
            <H2>
              <FormattedMessage {...messages.title} />
            </H2>
            <InputField
              {...fields.nickname}
              label={<FormattedMessage {...messages.nicknameLabel} />}
              placeholder={formatMessage(messages.nicknameLabel)}
            />
            <InputField
              {...fields.email}
              label={<FormattedMessage {...messages.emailLabel} />}
              placeholder={formatMessage(messages.emailLabel)}
              normalize={(value) => parseToLowerCase(removeWhiteSpaces(value))}
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
            />
            <Button loading={isSubmitting} type="submit">
              <FormattedMessage {...messages.registerButtonLabel} />
            </Button>
            <Gap defaultHeight={24} />
            <LinkButton onClick={goToLogin} withScale={false}>
              <FormattedMessage {...messages.goToLogin} values={{ br: <br /> }} />
            </LinkButton>
          </Form>
        </Col>
      </Row>
    </>
  );
};
