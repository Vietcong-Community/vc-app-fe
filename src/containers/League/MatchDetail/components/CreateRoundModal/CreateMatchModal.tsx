import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { IMap } from '../../../../../api/hooks/interfaces';
import { useCreateRound } from '../../../../../api/hooks/league/api';
import { InputNumberField } from '../../../../../components/Fields/InputNumberField/InputNumberField';
import { SelectField } from '../../../../../components/Fields/SelectField/SelectField';
import { FormComponent } from '../../../../../components/Form/FormComponent';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { NATION_SELECT_OPTIONS } from '../../../../../utils/mappingLabelUtils';

import { fields, IFormData } from './CreateMatchModal.fields';
import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  maps: IMap[];
  matchId: string;
}

export const CreateRoundModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, maps, matchId } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const createRound = useCreateRound(matchId);

  const onSubmit = async (values: IFormData) => {
    try {
      await createRound.mutateAsync({ ...values });
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      showNotification(messages.createSuccess);
      onClose();
      form.resetFields();
    } catch {
      showNotification(messages.createFailed, undefined, NotificationType.ERROR);
    }
  };

  const mapsOptions = maps?.map((item) => ({ id: item.id, value: item.id, label: item.name })) ?? [];

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      okButtonProps={{ htmlType: 'submit', form: 'create-match' }}
      onCancel={onClose}
      confirmLoading={createRound.isPending}
      open={isOpen}
    >
      <FormComponent form={form} id="create-match" onSubmit={onSubmit}>
        <SelectField
          {...fields.mapId}
          label={<FormattedMessage {...messages.map} />}
          placeholder={formatMessage(messages.map)}
          options={mapsOptions}
        />
        <SelectField
          {...fields.challengerNation}
          label={<FormattedMessage {...messages.challengerNation} />}
          placeholder={formatMessage(messages.challengerNation)}
          options={NATION_SELECT_OPTIONS}
        />
        <InputNumberField
          {...fields.roundNumber}
          label={<FormattedMessage {...messages.round} />}
          placeholder={formatMessage(messages.round)}
        />
        <InputNumberField
          {...fields.scoreChallenger}
          label={<FormattedMessage {...messages.challengerScore} />}
          placeholder={formatMessage(messages.challengerScore)}
        />
        <InputNumberField
          {...fields.scoreOpponent}
          label={<FormattedMessage {...messages.opponentScore} />}
          placeholder={formatMessage(messages.opponentScore)}
        />
      </FormComponent>
    </Modal>
  );
};
