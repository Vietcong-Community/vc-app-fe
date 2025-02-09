import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { IMap } from '../../../../../api/hooks/interfaces';
import { useUpdateRound } from '../../../../../api/hooks/league/api';
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
  maps: IMap[];
  matchId: string;
  roundId: string;
}

export const UpdateRoundModal: React.FC<IProps> = (props: IProps) => {
  const { initialValues, isOpen, onClose, maps, matchId, roundId } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const updateMatch = useUpdateRound(roundId);

  const onSubmit = async (values: IFormData) => {
    try {
      await updateMatch.mutateAsync({ ...values });
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      showNotification(messages.updateSuccess);
      onClose();
    } catch {
      showNotification(messages.updateFailed, undefined, NotificationType.ERROR);
    }
  };

  const mapsOptions = maps?.map((item) => ({ id: item.id, value: item.id, label: item.name })) ?? [];

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
          {...fields.mapId}
          label={<FormattedMessage {...messages.map} />}
          placeholder={formatMessage(messages.map)}
          options={mapsOptions}
        />
        <InputNumberField {...fields.round} label={<FormattedMessage {...messages.round} />} />
        <InputNumberField {...fields.scoreChallenger} label={<FormattedMessage {...messages.challengerScore} />} />
        <InputNumberField {...fields.scoreOpponent} label={<FormattedMessage {...messages.opponentScore} />} />
      </FormComponent>
    </Modal>
  );
};
