import React, { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUpdateUserInTeam } from '../../../../../api/hooks/teams/api';
import { SelectField } from '../../../../../components/Fields/SelectField/SelectField';
import { FormComponent } from '../../../../../components/Form/FormComponent';
import { Gap } from '../../../../../components/Gap/Gap';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { TEAM_ROLE_SELECT_OPTIONS } from '../../../../../utils/mappingLabelUtils';

import { fields, IFormData } from './SetUserRoleModal.fields';
import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  initialValues?: Partial<IFormData>;
  onClose: () => void;
  nickname?: string;
  teamId: string;
  userInTeamId?: string;
}

export const SetUserRoleModalForm: React.FC<IProps> = (props: IProps) => {
  const { initialValues, isOpen, onClose, nickname, teamId, userInTeamId } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const updateUserRole = useUpdateUserInTeam(userInTeamId ?? '');

  useEffect(() => {
    if (isOpen && initialValues?.role) {
      form.setFieldValue('role', initialValues?.role);
    }
  }, [isOpen, initialValues?.role]);

  const onSubmit = async (values: IFormData) => {
    try {
      await updateUserRole.mutateAsync(values);
      await queryClient.refetchQueries({ queryKey: ['teamPlayers', teamId] });
      showNotification(messages.updateSuccess);
      onClose();
    } catch {
      showNotification(messages.updateFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      okButtonProps={{ htmlType: 'submit', form: 'user-role-update' }}
      onCancel={onClose}
      confirmLoading={updateUserRole.isPending}
      open={isOpen}
    >
      <FormComponent form={form} id="user-role-update" initialValues={initialValues} onSubmit={onSubmit}>
        <Gap defaultHeight={8} />
        <FormattedMessage {...messages.player} values={{ player: nickname ?? '' }} />
        <Gap defaultHeight={16} />
        <SelectField
          {...fields.role}
          options={TEAM_ROLE_SELECT_OPTIONS}
          label={<FormattedMessage {...messages.role} />}
          placeholder={formatMessage(messages.role)}
        />
      </FormComponent>
    </Modal>
  );
};
