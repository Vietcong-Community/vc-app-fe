import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRemovePlayerRoundStats } from '../../../api/hooks/league/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { ISelectOptionType, SelectField } from '../../Fields/SelectField/SelectField';
import { FormComponent } from '../../Form/FormComponent';

import { IFormData, fields } from './RemoveRoundStatsModal.fields';
import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: string;
  roundStatsOptions: ISelectOptionType[];
}

export const RemoveRoundStatsModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, matchId, roundStatsOptions } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const removeRoundStats = useRemovePlayerRoundStats();

  const onDeleteRoundStats = async (values: IFormData) => {
    try {
      await removeRoundStats.mutateAsync(values.roundStatsId);
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      showNotification(messages.deleteSuccess);
    } catch {
      showNotification(messages.deleteFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      cancelButtonProps={{ title: formatMessage(messages.cancel) }}
      okButtonProps={{ title: formatMessage(messages.confirm), htmlType: 'submit', form: 'remove-stats' }}
      onCancel={onClose}
      confirmLoading={removeRoundStats.isPending}
      open={isOpen}
    >
      <FormComponent form={form} id="remove-stats" onSubmit={onDeleteRoundStats}>
        <SelectField
          {...fields.roundStatsId}
          label={<FormattedMessage {...messages.roundStatsId} />}
          placeholder={formatMessage(messages.roundStatsId)}
          options={roundStatsOptions}
        />
      </FormComponent>
    </Modal>
  );
};
