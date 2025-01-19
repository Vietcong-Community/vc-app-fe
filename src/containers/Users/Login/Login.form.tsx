import React from 'react';

import { Row, Col } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import loginPic from '../../../assets/loginPic.png';
import { Button } from '../../../components/Button/Button';
import { InputField } from '../../../components/Fields/InputField/InputField';
import { PasswordField } from '../../../components/Fields/PasswordField/PasswordField';
import { Form } from '../../../components/Form/Form';
import { Gap } from '../../../components/Gap/Gap';
import { H2 } from '../../../components/Titles/H2/H2';

import { fields, IFormData } from './Login.fields';
import { messages } from './messages';

import * as S from './Login.style';

interface IProps {
  goToRegistration: () => void;
  goToResetPassword: () => void;
  isSubmitting?: boolean;
  onSubmit: (values: IFormData) => void;
}

export const LoginForm: React.FC<IProps> = (props: IProps) => {
  const { goToResetPassword, goToRegistration, isSubmitting = false, onSubmit } = props;
  const { formatMessage } = useIntl();

  return (
    <>
      <Row justify="center">
        <Col sm={0} md={10}>
          <S.Image src={loginPic} alt="" />
        </Col>
        <Col sm={0} md={2} lg={2} />
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form onSubmit={onSubmit}>
            <Gap defaultHeight={48} />
            <H2>
              <FormattedMessage {...messages.title} />
            </H2>
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
            <S.LinkButton onClick={goToResetPassword} style={{ textAlign: 'end' }}>
              <FormattedMessage {...messages.forgottenPasswordButton} />
            </S.LinkButton>
            <Gap defaultHeight={16} />
            <Button loading={isSubmitting} type="submit" style={{ padding: '1.25rem 3rem' }}>
              <FormattedMessage {...messages.loginButtonLabel} />
            </Button>
            <Gap defaultHeight={24} />
            <S.LinkButton onClick={goToRegistration}>
              <FormattedMessage {...messages.registrationButton} values={{ br: <br /> }} />
            </S.LinkButton>
          </Form>
        </Col>
      </Row>
    </>
  );
};
