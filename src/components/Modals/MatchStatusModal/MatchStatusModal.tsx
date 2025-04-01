import React, { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUpdateMatchStatus } from '../../../api/hooks/league/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { MATCH_STATUS_SELECT_OPTIONS } from '../../../utils/mappingLabelUtils';
import { SelectField } from '../../Fields/SelectField/SelectField';
import { FormComponent } from '../../Form/FormComponent';

import { fields, IFormData } from './MatchStatusModal.fields';
import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  initialValues?: Partial<IFormData>;
  onClose: () => void;
  matchId: string;
}

export const MatchStatusModal: React.FC<IProps> = (props: IProps) => {
  const { initialValues, isOpen, onClose, matchId } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const updateMatchStatus = useUpdateMatchStatus(matchId);

  useEffect(() => {
    if (isOpen && initialValues?.status) {
      form.setFieldValue('status', initialValues?.status);
    }
  }, [isOpen, initialValues?.status]);

  const onSubmit = async (values: IFormData) => {
    try {
      await updateMatchStatus.mutateAsync(values);
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      showNotification(messages.updateSuccess);
      onClose();
    } catch {
      showNotification(messages.updateFailed, undefined, NotificationType.ERROR);
    }
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      okButtonProps={{ htmlType: 'submit', form: 'update-match-status' }}
      onCancel={onClose}
      confirmLoading={updateMatchStatus.isPending}
      open={isOpen}
    >
      <FormComponent form={form} id="update-match-status" initialValues={initialValues} onSubmit={onSubmit}>
        <SelectField
          {...fields.status}
          options={MATCH_STATUS_SELECT_OPTIONS}
          label={<FormattedMessage {...messages.status} />}
          placeholder={formatMessage(messages.status)}
        />
      </FormComponent>
    </Modal>
  );
};
