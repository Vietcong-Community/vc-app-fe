import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';

import { useMapsInSeason, useUpdateMatch } from '../../../api/hooks/league/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { DatePickerField, DEFAULT_SYSTEM_DATE_TIME_FORMAT } from '../../Fields/DatePickerField/DatePickerField';
import { InputNumberField } from '../../Fields/InputNumberField/InputNumberField';
import { SelectField } from '../../Fields/SelectField/SelectField';
import { FormComponent } from '../../Form/FormComponent';

import { fields, IFormData } from './UpdateMatchModal.fields';
import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  initialValues?: Partial<IFormData>;
  onClose: () => void;
  matchId: string;
  seasonId?: string;
  showDate?: boolean;
  showOpponentMap?: boolean;
}

export const UpdateMatchModal: React.FC<IProps> = (props: IProps) => {
  const { initialValues, isOpen, onClose, matchId, seasonId, showDate = true, showOpponentMap = true } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const maps = useMapsInSeason(seasonId);
  const updateMatch = useUpdateMatch(matchId);

  const onSubmit = async (values: IFormData) => {
    try {
      if (showDate) {
        const endDate = dayjs(values.startDate).add(1, 'hour').format(DEFAULT_SYSTEM_DATE_TIME_FORMAT);
        await updateMatch.mutateAsync({ ...values, endDate });
      } else {
        await updateMatch.mutateAsync(values);
      }
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
        {showOpponentMap && (
          <SelectField
            {...fields.opponentMapId}
            label={<FormattedMessage {...messages.opponentMap} />}
            placeholder={formatMessage(messages.opponentMap)}
            options={mapsOptions}
          />
        )}
        {showDate && (
          <DatePickerField
            {...fields.startDate}
            label={<FormattedMessage {...messages.startDate} />}
            placeholder={formatMessage(messages.startDate)}
            showTime
          />
        )}
        <InputNumberField {...fields.challengerScore} label={<FormattedMessage {...messages.challengerScore} />} />
        <InputNumberField {...fields.opponentScore} label={<FormattedMessage {...messages.opponentScore} />} />
      </FormComponent>
    </Modal>
  );
};
