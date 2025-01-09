import React from 'react';

import { Flex, Form, Space } from 'antd';
import { FormattedMessage } from 'react-intl';

import { IUser } from '../../../../../api/hooks/users/interfaces';
import { Button } from '../../../../../components/Button/Button';
import { MainButtonVariant } from '../../../../../components/Button/enums';
import { H2 } from '../../../../../components/Titles/H2/H2';

import { IFormData } from './RoundsInformation.fields';
import { messages } from './messages';

interface IProps {
  goBack: () => void;
  initialValues?: Partial<IFormData>;
  onSubmit: (values: IFormData) => void;
  players: IUser[];
}

export const RoundsInformation: React.FC<IProps> = (props: IProps) => {
  const { goBack, initialValues, onSubmit } = props;
  const [form] = Form.useForm();

  return (
    <Form form={form} initialValues={initialValues} layout="vertical" onFinish={onSubmit}>
      <Flex>
        <H2>
          <FormattedMessage {...messages.title} />
        </H2>
      </Flex>
      <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
        <Button onClick={goBack} variant={MainButtonVariant.SECONDARY}>
          <FormattedMessage {...messages.goBack} />
        </Button>
        <Button type="submit">
          <FormattedMessage {...messages.continue} />
        </Button>
      </Space>
    </Form>
  );
};
