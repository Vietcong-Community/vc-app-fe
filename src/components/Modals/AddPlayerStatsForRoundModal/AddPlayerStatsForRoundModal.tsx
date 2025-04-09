import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useCreatePlayerRoundStats } from '../../../api/hooks/league/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { NATION_SELECT_OPTIONS } from '../../../utils/mappingLabelUtils';
import { InputNumberField } from '../../Fields/InputNumberField/InputNumberField';
import { SelectField } from '../../Fields/SelectField/SelectField';
import { FormComponent } from '../../Form/FormComponent';

import { fields, IFormData } from './AddPlayerStatsForRoundModal.fields';
import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: string;
  matchRoundId: string;
  playerOptions: { id: string; value: string; label: string }[];
}

export const AddPlayerStatsForRoundModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, matchId, matchRoundId, playerOptions } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const createRoundStats = useCreatePlayerRoundStats(matchRoundId);

  const onSubmit = async (values: IFormData) => {
    try {
      await createRoundStats.mutateAsync(values);
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      showNotification(messages.createSuccess);
      onClose();
      form.resetFields();
    } catch {
      showNotification(messages.createFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <Modal
      confirmLoading={createRoundStats.isPending}
      title={<FormattedMessage {...messages.title} />}
      okButtonProps={{ htmlType: 'submit', form: 'create-stats' }}
      onCancel={onClose}
      open={isOpen}
    >
      <FormComponent form={form} id="create-stats" onSubmit={onSubmit}>
        <SelectField
          {...fields.playerInMatchId}
          label={<FormattedMessage {...messages.playerId} />}
          placeholder={formatMessage(messages.playerId)}
          options={playerOptions}
        />
        <SelectField
          {...fields.nation}
          label={<FormattedMessage {...messages.nation} />}
          placeholder={formatMessage(messages.nation)}
          options={NATION_SELECT_OPTIONS}
        />
        <InputNumberField {...fields.flags} label={<FormattedMessage {...messages.flags} />} />
        <InputNumberField {...fields.kills} label={<FormattedMessage {...messages.kills} />} />
        <InputNumberField {...fields.deaths} label={<FormattedMessage {...messages.deaths} />} />
      </FormComponent>
    </Modal>
  );
};
