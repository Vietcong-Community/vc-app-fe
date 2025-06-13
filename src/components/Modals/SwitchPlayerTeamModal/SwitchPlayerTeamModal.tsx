import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { IMatchPlayer } from '../../../api/hooks/league/interfaces';
import { useSwitchPlayerTeams } from '../../../api/hooks/ranked/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { SelectField } from '../../Fields/SelectField/SelectField';
import { FormComponent } from '../../Form/FormComponent';

import { fields, IFormData } from './SwitchPlayerTeamModal.fields';
import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: string;
  players?: IMatchPlayer[];
}

export const SwitchPlayerTeamModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, matchId, players = [] } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const switchPlayerTeams = useSwitchPlayerTeams(matchId);

  const onSubmit = async (values: IFormData) => {
    try {
      await switchPlayerTeams.mutateAsync(values.playerId);
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      showNotification(messages.updateSuccess);
      form.resetFields();
      onClose();
    } catch {
      showNotification(messages.updateFailed, undefined, NotificationType.ERROR);
    }
  };

  const options = players.map((item) => ({ value: item.user.id, label: item.user.nickname }));

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      okButtonProps={{ htmlType: 'submit', form: 'switch-player-team' }}
      onCancel={onClose}
      confirmLoading={switchPlayerTeams.isPending}
      open={isOpen}
    >
      <FormComponent form={form} id="switch-player-team" onSubmit={onSubmit}>
        <SelectField
          {...fields.playerId}
          options={options}
          label={<FormattedMessage {...messages.player} />}
          placeholder={formatMessage(messages.player)}
        />
      </FormComponent>
    </Modal>
  );
};
