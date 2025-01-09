import React, { ReactNode, useMemo } from 'react';

import { Form, Space } from 'antd';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';

import { IMap } from '../../../api/hooks/enums/interfaces';
import { IUser } from '../../../api/hooks/users/interfaces';
import { Button } from '../../../components/Button/Button';
import { MainButtonVariant } from '../../../components/Button/enums';
import { Card } from '../../../components/Card/Card';
import { DatePickerField } from '../../../components/Fields/DatePickerField/DatePickerField';
import { SelectField } from '../../../components/Fields/SelectField/SelectField';
import { BreakPoints } from '../../../theme/theme';

import { fields, IFormData } from './MixedMatch.fields';
import { messages } from './messages';

interface IProps {
  initialValues?: Partial<IFormData>;
  isSubmitting?: boolean;
  maps: IMap[];
  onCancel: () => void;
  onSubmit: (values: IFormData) => void;
  players: IUser[];
  title: ReactNode;
}

export const MixedMatchForm: React.FC<IProps> = (props: IProps) => {
  const { initialValues, isSubmitting = false, maps, onCancel, onSubmit, players, title } = props;
  const [form] = Form.useForm();
  const formValues = Form.useWatch([], form) as Partial<IFormData>;
  const { formatMessage } = useIntl();

  const minimalStartDate = dayjs();

  const firstCaptainOptions = useMemo(() => {
    return players.filter((item) => item.id !== formValues?.secondCaptainId);
  }, [formValues?.secondCaptainId, players]);
  const secondCaptainOptions = useMemo(() => {
    return players.filter((item) => item.id !== formValues?.firstCaptainId);
  }, [formValues?.firstCaptainId, players]);

  const mapSelectOptions = maps.map((item) => ({ id: item.id, value: item.id, label: item.name }));

  return (
    <Card style={{ margin: '1rem auto', maxWidth: BreakPoints.sm }} title={title}>
      <Form form={form} initialValues={initialValues} layout="vertical" onFinish={onSubmit}>
        <DatePickerField
          {...fields.date}
          minimalDate={minimalStartDate}
          label={<FormattedMessage {...messages.dateLabel} />}
          placeholder={formatMessage(messages.dateLabel)}
        />
        <SelectField
          {...fields.firstCaptainId}
          label={<FormattedMessage {...messages.firstCaptainLabel} />}
          placeholder={formatMessage(messages.firstCaptainLabel)}
          options={firstCaptainOptions.map((item) => ({ id: item.id, value: item.id, label: item.username }))}
        />
        <SelectField
          {...fields.secondCaptainId}
          label={<FormattedMessage {...messages.secondCaptainLabel} />}
          placeholder={formatMessage(messages.secondCaptainLabel)}
          options={secondCaptainOptions.map((item) => ({ id: item.id, value: item.id, label: item.username }))}
        />
        <SelectField
          {...fields.firstMapId}
          label={<FormattedMessage {...messages.firstMapLabel} />}
          placeholder={formatMessage(messages.firstMapLabel)}
          options={mapSelectOptions}
        />
        <SelectField
          {...fields.secondMapId}
          label={<FormattedMessage {...messages.secondMapLabel} />}
          placeholder={formatMessage(messages.secondMapLabel)}
          options={mapSelectOptions}
        />
        <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
          <Button onClick={onCancel} variant={MainButtonVariant.SECONDARY}>
            <FormattedMessage {...messages.cancelButtonLabel} />
          </Button>
          <Button loading={isSubmitting} type="submit">
            <FormattedMessage {...messages.saveButtonLabel} />
          </Button>
        </Space>
      </Form>
    </Card>
  );
};
