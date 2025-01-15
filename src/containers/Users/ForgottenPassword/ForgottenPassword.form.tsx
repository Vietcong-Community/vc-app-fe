import React from 'react';

import { Col, Form, Row } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import vojakReg from '../../../assets/vojak_reg.png';
import { Button } from '../../../components/Button/Button';
import { InputField } from '../../../components/Fields/InputField/InputField';
import { Gap } from '../../../components/Gap/Gap';
import { H2 } from '../../../components/Titles/H2/H2';

import { fields, IFormData } from './ForgottenPassword.fields';
import { messages } from './messages';

import * as S from './ForgottenPassword.style';

interface IProps {
  goBackToLogin: () => void;
  isSubmitting: boolean;
  onSubmit: (values: IFormData) => void;
}

export const ForgottenPasswordForm: React.FC<IProps> = (props: IProps) => {
  const { goBackToLogin, isSubmitting, onSubmit } = props;
  const [form] = Form.useForm();
  const { formatMessage } = useIntl();

  return (
    <Row justify="center" align="middle">
      <Col xs={0} sm={0} md={12} style={{ textAlign: 'center' }}>
        <S.Image src={vojakReg} alt="Voják na registraci" />
      </Col>
      <Col xs={24} sm={12} md={12} lg={6}>
        <Form form={form} layout="vertical" onFinish={onSubmit} scrollToFirstError validateTrigger="onBlur">
          <H2>
            <FormattedMessage {...messages.title} />
          </H2>
          <p>
            <FormattedMessage {...messages.description} />
          </p>
          <InputField
            {...fields.email}
            label={<FormattedMessage {...messages.emailLabel} />}
            placeholder={formatMessage(messages.emailLabel)}
          />
          <Gap defaultHeight={16} />
          <Button loading={isSubmitting} type="submit">
            <FormattedMessage {...messages.submitButton} />
          </Button>
        </Form>
        <Gap defaultHeight={32} />
        <S.LinkButton onClick={goBackToLogin}>
          <FormattedMessage {...messages.backToLogin} />
        </S.LinkButton>
      </Col>
    </Row>
  );
};
