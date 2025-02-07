import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useCreateTeam } from '../../../../api/hooks/teams/api';
import { InputField } from '../../../../components/Fields/InputField/InputField';
import { FormComponent } from '../../../../components/Form/FormComponent';
import { useNotifications } from '../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../providers/NotificationsProvider/enums';

import { fields, IFormData } from './CreateTeamModal.fields';
import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTeamModalForm: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const createTeam = useCreateTeam();

  const onSubmit = async (values: IFormData) => {
    try {
      await createTeam.mutateAsync(values);
      await queryClient.refetchQueries({ queryKey: ['loggedUserTeams'] });
      showNotification(messages.createSuccess);
      form.resetFields();
      onClose();
    } catch {
      showNotification(messages.createFailed, messages.createFailedDescription, NotificationType.ERROR);
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      okButtonProps={{ htmlType: 'submit', form: 'create-team' }}
      onCancel={onClose}
      confirmLoading={createTeam.isPending}
      open={isOpen}
    >
      <FormComponent form={form} id="create-team" onSubmit={onSubmit}>
        <InputField
          {...fields.name}
          label={<FormattedMessage {...messages.name} />}
          placeholder={formatMessage(messages.name)}
        />
        <InputField
          {...fields.tag}
          label={<FormattedMessage {...messages.tag} />}
          placeholder={formatMessage(messages.tag)}
        />
      </FormComponent>
    </Modal>
  );
};
