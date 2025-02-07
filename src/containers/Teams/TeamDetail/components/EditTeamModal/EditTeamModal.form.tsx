import React, { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUpdateTeam } from '../../../../../api/hooks/teams/api';
import { InputAreaField } from '../../../../../components/Fields/InputAreaField/InputAreaField';
import { InputField } from '../../../../../components/Fields/InputField/InputField';
import { FormComponent } from '../../../../../components/Form/FormComponent';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';

import { fields, IFormData } from './EditTeamModal.fields';
import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  initialValues?: Partial<IFormData>;
  onClose: () => void;
  teamId: string;
}

export const EditTeamModalForm: React.FC<IProps> = (props: IProps) => {
  const { initialValues, isOpen, onClose, teamId } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const updateTeam = useUpdateTeam(teamId);

  useEffect(() => {
    if (isOpen) {
      form.resetFields();
    }
  }, [isOpen]);

  const onSubmit = async (values: IFormData) => {
    try {
      await updateTeam.mutateAsync(values);
      await queryClient.refetchQueries({ queryKey: ['team', teamId] });
      showNotification(messages.updateSuccess);
      onClose();
    } catch {
      showNotification(messages.updateFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      okButtonProps={{ htmlType: 'submit', form: 'update-team' }}
      onCancel={onClose}
      confirmLoading={updateTeam.isPending}
      open={isOpen}
    >
      <FormComponent form={form} id="update-team" initialValues={initialValues} onSubmit={onSubmit}>
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
        <InputAreaField
          {...fields.description}
          label={<FormattedMessage {...messages.description} />}
          placeholder={formatMessage(messages.description)}
        />
      </FormComponent>
    </Modal>
  );
};
