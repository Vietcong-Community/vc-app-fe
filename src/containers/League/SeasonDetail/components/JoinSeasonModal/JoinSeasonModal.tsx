import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import { sortBy } from 'lodash';
import { FormattedMessage, useIntl } from 'react-intl';

import { useJoinSeason } from '../../../../../api/hooks/league/api';
import { IMeTeams } from '../../../../../api/hooks/teams/interfaces';
import { SelectField } from '../../../../../components/Fields/SelectField/SelectField';
import { FormComponent } from '../../../../../components/Form/FormComponent';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';

import { fields, IFormData } from './JoinSeasonModal.fields';
import { messages } from './messages';

interface IProps {
  closeModal: () => void;
  initialValues?: Partial<IFormData>;
  isOpen: boolean;
  isSubmitting?: boolean;
  seasonId: string;
  userTeams: IMeTeams[];
}

export const JoinSeasonModal: React.FC<IProps> = (props: IProps) => {
  const { closeModal, initialValues, isOpen, isSubmitting = false, seasonId, userTeams } = props;
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();
  const [form] = Form.useForm<IFormData>();
  const { showNotification } = useNotifications();

  const joinSeason = useJoinSeason(seasonId);

  const teamOptions = sortBy(
    userTeams.map((item) => ({ id: item.team.id, value: item.team.id, label: item.team.name })) ?? [],
    'label',
  );

  const onSubmit = async (values: IFormData) => {
    try {
      await joinSeason.mutateAsync({ teamId: values.teamId });
      await queryClient.refetchQueries({ queryKey: ['seasonTeams', seasonId] });
      await queryClient.refetchQueries({ queryKey: ['seasonLadder', seasonId] });
      showNotification(messages.joinSuccess);
    } catch {
      showNotification(messages.joinFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      onCancel={closeModal}
      onOk={closeModal}
      open={isOpen}
      okButtonProps={{ htmlType: 'submit', form: 'match-filter' }}
      confirmLoading={isSubmitting}
    >
      <FormComponent id="match-filter" form={form} initialValues={initialValues} onSubmit={onSubmit}>
        <SelectField
          {...fields.teamId}
          label={<FormattedMessage {...messages.team} />}
          placeholder={formatMessage(messages.team)}
          options={teamOptions}
        />
      </FormComponent>
    </Modal>
  );
};
