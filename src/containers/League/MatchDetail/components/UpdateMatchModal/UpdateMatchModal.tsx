import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';

import { useMapsInSeason, useUpdateMatch } from '../../../../../api/hooks/league/api';
import {
  DatePickerField,
  DEFAULT_SYSTEM_DATE_TIME_FORMAT,
} from '../../../../../components/Fields/DatePickerField/DatePickerField';
import { InputNumberField } from '../../../../../components/Fields/InputNumberField/InputNumberField';
import { SelectField } from '../../../../../components/Fields/SelectField/SelectField';
import { FormComponent } from '../../../../../components/Form/FormComponent';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';

import { fields, IFormData } from './UpdateMatchModal.fields';
import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  initialValues?: Partial<IFormData>;
  onClose: () => void;
  matchId: string;
  seasonId?: string;
}

export const UpdateMatchModal: React.FC<IProps> = (props: IProps) => {
  const { initialValues, isOpen, onClose, matchId, seasonId } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const maps = useMapsInSeason(seasonId);
  const updateMatch = useUpdateMatch(matchId);

  const onSubmit = async (values: IFormData) => {
    try {
      const endDate = dayjs(values.startDate).add(1, 'hour').format(DEFAULT_SYSTEM_DATE_TIME_FORMAT);
      await updateMatch.mutateAsync({ ...values, endDate });
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      showNotification(messages.updateSuccess);
      onClose();
    } catch {
      showNotification(messages.updateFailed, undefined, NotificationType.ERROR);
    }
  };

  const mapsOptions = maps.data?.items?.map((item) => ({ id: item.id, value: item.id, label: item.name })) ?? [];

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      okButtonProps={{ htmlType: 'submit', form: 'update-match' }}
      onCancel={onClose}
      confirmLoading={updateMatch.isPending}
      open={isOpen}
    >
      <FormComponent form={form} id="update-match" initialValues={initialValues} onSubmit={onSubmit}>
        <SelectField
          {...fields.challengerMapId}
          label={<FormattedMessage {...messages.challengerMap} />}
          placeholder={formatMessage(messages.challengerMap)}
          options={mapsOptions}
        />
        <SelectField
          {...fields.opponentMapId}
          label={<FormattedMessage {...messages.opponentMap} />}
          placeholder={formatMessage(messages.opponentMap)}
          options={mapsOptions}
        />
        <DatePickerField
          {...fields.startDate}
          label={<FormattedMessage {...messages.startDate} />}
          placeholder={formatMessage(messages.startDate)}
          showTime
        />
        <InputNumberField {...fields.challengerScore} label={<FormattedMessage {...messages.challengerScore} />} />
        <InputNumberField {...fields.opponentScore} label={<FormattedMessage {...messages.opponentScore} />} />
      </FormComponent>
    </Modal>
  );
};
