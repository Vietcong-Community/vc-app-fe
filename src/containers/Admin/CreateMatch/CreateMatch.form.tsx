import React from 'react';

import { Form, Space } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { IMap } from '../../../api/hooks/interfaces';
import { ISeasonTeamItem } from '../../../api/hooks/league/interfaces';
import { Button } from '../../../components/Button/Button';
import { MainButtonVariant } from '../../../components/Button/enums';
import { Card } from '../../../components/Card/Card';
import { DatePickerField } from '../../../components/Fields/DatePickerField/DatePickerField';
import { SelectField } from '../../../components/Fields/SelectField/SelectField';
import { FormComponent } from '../../../components/Form/FormComponent';
import { Gap } from '../../../components/Gap/Gap';
import { BreakPoints } from '../../../theme/theme';

import { fields, IFormData } from './CreateMatch.fields';
import { messages } from './messages';

interface IProps {
  isSubmitting: boolean;
  maps: IMap[];
  onCancel: () => void;
  onSubmit: (values: IFormData) => void;
  teams: ISeasonTeamItem[];
}

export const CreateMatchForm: React.FC<IProps> = (props: IProps) => {
  const { isSubmitting, maps, onCancel, onSubmit, teams } = props;
  const { formatMessage } = useIntl();
  const [form] = Form.useForm<IFormData>();
  const challengerId = Form.useWatch('challengerId', form);
  const opponentId = Form.useWatch('opponentId', form);

  const challengerOptions =
    teams
      ?.filter((item) => item.team.id !== opponentId)
      .map((item) => ({ id: item.team.id, value: item.team.id, label: item.team.team.name })) ?? [];
  const opponentOptions =
    teams
      ?.filter((item) => item.team.id !== challengerId)
      .map((item) => ({ id: item.team.id, value: item.team.id, label: item.team.team.name })) ?? [];
  const mapsOptions = maps?.map((item) => ({ id: item.id, value: item.id, label: item.name })) ?? [];

  return (
    <Card style={{ margin: '1rem auto', maxWidth: BreakPoints.sm }} title={<FormattedMessage {...messages.title} />}>
      <FormComponent form={form} onSubmit={onSubmit}>
        <SelectField
          {...fields.challengerId}
          label={<FormattedMessage {...messages.challengerId} />}
          placeholder={formatMessage(messages.challengerId)}
          options={challengerOptions}
        />
        <SelectField
          {...fields.opponentId}
          label={<FormattedMessage {...messages.opponentId} />}
          placeholder={formatMessage(messages.opponentId)}
          options={opponentOptions}
        />
        <SelectField
          {...fields.challengerMapId}
          label={<FormattedMessage {...messages.challengerMapLabel} />}
          placeholder={formatMessage(messages.challengerMapLabel)}
          options={mapsOptions}
        />
        <SelectField
          {...fields.opponentMapId}
          label={<FormattedMessage {...messages.opponentMapLabel} />}
          placeholder={formatMessage(messages.opponentMapLabel)}
          options={mapsOptions}
        />
        <DatePickerField
          {...fields.startDate}
          label={<FormattedMessage {...messages.startDate} />}
          placeholder={formatMessage(messages.startDate)}
          showTime
        />
        <Gap defaultHeight={16} />
        <Space>
          <Button onClick={onCancel} variant={MainButtonVariant.OUTLINED}>
            <FormattedMessage {...messages.cancelButton} />
          </Button>
          <Button loading={isSubmitting} type="submit">
            <FormattedMessage {...messages.submitButton} />
          </Button>
        </Space>
      </FormComponent>
    </Card>
  );
};
