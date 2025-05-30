import React, { useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { IMap } from '../../../api/hooks/interfaces';
import { useAddPlayerToMatch } from '../../../api/hooks/league/api';
import { usePickMapForRankedMatch } from '../../../api/hooks/ranked/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { SelectField } from '../../Fields/SelectField/SelectField';
import { FormComponent } from '../../Form/FormComponent';

import { fields, IFormData } from './JoinRankedMatchModal.fields';
import { messages } from './messages';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  maps: IMap[];
  matchId: string;
  userId: string;
}

export const JoinRankedMatchModal: React.FC<IProps> = (props: IProps) => {
  const { isOpen, onClose, maps, matchId, userId } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const firstPickedMapId = Form.useWatch('firstMapId', form);
  const secondPickedMapId = Form.useWatch('secondMapId', form);

  const joinRankedMatch = useAddPlayerToMatch(matchId);
  const voteForMap = usePickMapForRankedMatch();

  const onSubmit = async (values: IFormData) => {
    try {
      setIsSubmitting(true);
      await joinRankedMatch.mutateAsync(userId);
      await voteForMap.mutateAsync({ mapId: values.firstMapId, matchId });
      await voteForMap.mutateAsync({ mapId: values.secondMapId, matchId });
      showNotification(messages.joinSuccess, messages.joinSuccessDescription);
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      await queryClient.refetchQueries({ queryKey: ['mapVoteState', matchId] });
      onClose();
      form.resetFields();
    } catch {
      showNotification(messages.joinFailed, undefined, NotificationType.ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  const firstMapsOptions = useMemo(() => {
    return (
      maps
        ?.filter((item) => item.id !== secondPickedMapId)
        ?.map((item) => ({ id: item.id, value: item.id, label: item.name })) ?? []
    );
  }, [secondPickedMapId, isOpen, JSON.stringify(maps)]);

  const secondMapsOptions = useMemo(() => {
    return (
      maps
        ?.filter((item) => item.id !== firstPickedMapId)
        ?.map((item) => ({ id: item.id, value: item.id, label: item.name })) ?? []
    );
  }, [firstPickedMapId, isOpen, JSON.stringify(maps)]);

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      okButtonProps={{ htmlType: 'submit', form: 'create-match' }}
      onCancel={onClose}
      confirmLoading={isSubmitting}
      open={isOpen}
    >
      <FormComponent form={form} id="create-match" onSubmit={onSubmit}>
        <SelectField
          {...fields.firstMapId}
          label={<FormattedMessage {...messages.firstPreferredMap} />}
          placeholder={formatMessage(messages.firstPreferredMap)}
          options={firstMapsOptions}
        />
        <SelectField
          {...fields.secondMapId}
          label={<FormattedMessage {...messages.secondPreferredMap} />}
          placeholder={formatMessage(messages.secondPreferredMap)}
          options={secondMapsOptions}
        />
      </FormComponent>
    </Modal>
  );
};
