import React from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { IMap } from '../../../api/hooks/interfaces';
import { Button } from '../../../components/Button/Button';
import { MainButtonVariant } from '../../../components/Button/enums';
import { Card } from '../../../components/Card/Card';
import { SelectField } from '../../../components/Fields/SelectField/SelectField';
import { Form } from '../../../components/Form/Form';
import { Gap } from '../../../components/Gap/Gap';
import { BreakPoints } from '../../../theme/theme';

import { fields, IFormData } from './AcceptMatchChallenge.fields';
import { messages } from './messages';

interface IProps {
  goBack: () => void;
  isSubmitting: boolean;
  maps: IMap[];
  onReject: () => void;
  onSubmit: (values: IFormData) => void;
}

export const AcceptMatchChallengeForm: React.FC<IProps> = (props: IProps) => {
  const { goBack, isSubmitting, maps, onReject, onSubmit } = props;
  const { formatMessage } = useIntl();

  const mapsOptions = maps?.map((item) => ({ id: item.id, value: item.id, label: item.name })) ?? [];

  return (
    <Card style={{ margin: '1rem auto', maxWidth: BreakPoints.sm }} title={<FormattedMessage {...messages.title} />}>
      <Form onSubmit={onSubmit}>
        <SelectField
          {...fields.opponentMapId}
          label={<FormattedMessage {...messages.mapLabel} />}
          placeholder={formatMessage(messages.mapLabel)}
          options={mapsOptions}
        />
        <Gap defaultHeight={16} />
        <Space>
          <Button onClick={goBack} style={{ padding: '1.25rem 0.5rem' }} variant={MainButtonVariant.OUTLINED}>
            <ArrowLeftOutlined />
          </Button>
          <Button onClick={onReject} variant={MainButtonVariant.SECONDARY}>
            <FormattedMessage {...messages.cancelButton} />
          </Button>
          <Button loading={isSubmitting} type="submit">
            <FormattedMessage {...messages.submitButton} />
          </Button>
        </Space>
      </Form>
    </Card>
  );
};
