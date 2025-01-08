import React from 'react';

import { Col, Flex, Form, Row, Space } from 'antd';
import { FormattedMessage } from 'react-intl';

import { IMap } from '../../../../../api/hooks/enums/interfaces';
import { IUser } from '../../../../../api/hooks/users/interfaces';
import { Button } from '../../../../../components/Button/Button';
import { MultiSelectField } from '../../../../../components/Fields/MultiSelectField/MultiSelectField';
import { SelectField } from '../../../../../components/Fields/SelectField/SelectField';
import { H2 } from '../../../../../components/Titles/H2/H2';
import { PLAYERS_COUNT_OPTIONS } from '../../../../../utils/staticEnumsSelectOptions';

import { fields, IFormData } from './BasicInformation.fields';
import { messages } from './messages';

interface IProps {
  goBack: () => void;
  initialValues?: Partial<IFormData>;
  onSubmit: (values: IFormData) => void;
  maps: IMap[];
  players: IUser[];
}

export const BasicInformation: React.FC<IProps> = (props: IProps) => {
  const { goBack, initialValues, maps, onSubmit, players } = props;
  const [form] = Form.useForm();

  const mapSelectOptions = maps.map((item) => ({ id: item.id, value: item.id, label: item.name }));
  const playersSelectOptions = players.map((item) => ({ id: item.id, value: item.id, label: item.username }));

  return (
    <Form form={form} initialValues={initialValues} layout="vertical" onFinish={onSubmit}>
      <Flex>
        <H2>
          <FormattedMessage {...messages.title} />
        </H2>
      </Flex>
      <Row gutter={16}>
        <Col xs={24} sm={8} md={4}>
          <SelectField
            {...fields.numberOfPlayers}
            allowSearch={false}
            label={<FormattedMessage {...messages.numberOfPlayers} />}
            options={PLAYERS_COUNT_OPTIONS}
          />
        </Col>
        <Col xs={24} sm={8} md={4}>
          <SelectField
            {...fields.firstMapId}
            label={<FormattedMessage {...messages.firstMap} />}
            options={mapSelectOptions}
          />
        </Col>
        <Col xs={24} sm={8} md={4}>
          <SelectField
            {...fields.secondMapId}
            label={<FormattedMessage {...messages.secondMap} />}
            options={mapSelectOptions}
          />
        </Col>
        <Col xs={24} md={12}>
          <MultiSelectField
            {...fields.players}
            label={<FormattedMessage {...messages.players} />}
            options={playersSelectOptions}
          />
        </Col>
      </Row>
      <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
        <Button variant="default" onClick={goBack}>
          <FormattedMessage {...messages.goBack} />
        </Button>
        <Button type="submit">
          <FormattedMessage {...messages.continue} />
        </Button>
      </Space>
    </Form>
  );
};
