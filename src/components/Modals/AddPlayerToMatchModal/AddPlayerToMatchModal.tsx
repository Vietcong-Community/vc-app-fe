import React, { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { AutoComplete, Form, Modal, Spin, Tag } from 'antd';
import { isEmpty, uniq } from 'lodash';
import isNil from 'lodash/isNil';
import { FormattedMessage, useIntl } from 'react-intl';

import { IUser } from '../../../api/hooks/interfaces';
import { useAddPlayerToMatch } from '../../../api/hooks/league/api';
import { useTeamPlayers } from '../../../api/hooks/teams/api';
import { useUserList } from '../../../api/hooks/users/api';
import { useNotifications } from '../../../hooks/NotificationsHook';
import { NotificationType } from '../../../providers/NotificationsProvider/enums';
import { SelectField } from '../../Fields/SelectField/SelectField';
import { FormComponent } from '../../Form/FormComponent';
import { Gap } from '../../Gap/Gap';

import { fields, IFormData } from './AddPlayerToMatchModal.fields';
import { messages } from './messages';

interface IProps {
  challengerTeamId?: string;
  isOpen: boolean;
  onClose: () => void;
  opponentTeamId?: string;
  matchId: string;
}

export const AddPlayerToMatchModal: React.FC<IProps> = (props: IProps) => {
  const { challengerTeamId, isOpen, onClose, opponentTeamId, matchId } = props;
  const { formatMessage } = useIntl();
  const { showNotification } = useNotifications();
  const [userQuery, setUserQuery] = useState<{ nickname?: string }>({});
  const [hostPlayers, setHostPlayers] = useState<IUser[]>([]);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const challengerUserIds = Form.useWatch('challengerUserIds', form);
  const opponentUserIds = Form.useWatch('opponentUserIds', form);
  const hostPlayerFormValue = Form.useWatch('hostPlayer', form);

  const users = useUserList(userQuery, true, !!userQuery?.nickname && userQuery.nickname.length >= 3);
  const challengerPlayers = useTeamPlayers(challengerTeamId, undefined, isOpen);
  const opponentPlayers = useTeamPlayers(opponentTeamId, undefined, isOpen);
  const addPlayerToMatch = useAddPlayerToMatch(matchId);

  useEffect(() => {
    if (hostPlayerFormValue?.length >= 3) {
      setUserQuery({ nickname: hostPlayerFormValue });
    }
  }, [hostPlayerFormValue?.length]);

  const onSubmit = async (values: IFormData) => {
    setSubmitting(true);
    const userIds = uniq([
      ...(values.challengerUserIds ?? []),
      ...(values.opponentUserIds ?? []),
      ...hostPlayers.map((item) => item.id),
    ]);

    try {
      await Promise.all(userIds.map(async (item) => await addPlayerToMatch.mutateAsync(item)));
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      showNotification(messages.createSuccess);
      onClose();
      form.resetFields();
      setHostPlayers([]);
      setUserQuery({});
    } catch {
      showNotification(messages.createFailed, undefined, NotificationType.ERROR);
      setSubmitting(false);
    }
  };

  const challengerPlayersOptions =
    challengerPlayers.data?.items?.map((item) => {
      return { id: item.user.id, value: item.user.id, label: item.user.nickname };
    }) ?? [];

  const opponentPlayersOptions =
    opponentPlayers.data?.items?.map((item) => {
      return { id: item.user.id, value: item.user.id, label: item.user.nickname };
    }) ?? [];

  const getHostOptions = () => {
    if (hostPlayerFormValue?.length < 3) {
      return [];
    }

    return users.data?.users?.map((item) => ({ label: item.nickname, value: item.id })) ?? [];
  };

  const handleOnHostPlayerClick = (value: string) => {
    const user = users.data?.users.find((user) => user.id === value);
    if (user) {
      setHostPlayers([...hostPlayers, user]);
    }
    form.resetFields(['hostPlayer']);
  };

  const isLoading = challengerPlayers.isLoading || opponentPlayers.isLoading;
  const submitDisabled =
    (isNil(challengerUserIds) || isEmpty(challengerUserIds)) &&
    (isNil(opponentUserIds) || isEmpty(opponentUserIds)) &&
    isEmpty(hostPlayers);

  return (
    <Modal
      confirmLoading={isSubmitting}
      title={<FormattedMessage {...messages.title} />}
      okButtonProps={{ htmlType: 'submit', form: 'create-match', disabled: submitDisabled }}
      onCancel={onClose}
      open={isOpen}
    >
      {isLoading && (
        <>
          <Gap defaultHeight={16} />
          <Spin />
        </>
      )}
      {!isLoading && (
        <FormComponent form={form} id="create-match" onSubmit={onSubmit}>
          <SelectField
            {...fields.challengerUserIds}
            label={<FormattedMessage {...messages.challengerUserId} />}
            placeholder={formatMessage(messages.challengerUserId)}
            options={challengerPlayersOptions}
            mode="multiple"
          />
          <SelectField
            {...fields.opponentUserIds}
            label={<FormattedMessage {...messages.opponentUserId} />}
            placeholder={formatMessage(messages.opponentUserId)}
            options={opponentPlayersOptions}
            mode="multiple"
          />
          <Form.Item
            name={fields.hostPlayer.name}
            label={<FormattedMessage {...messages.allPlayers} />}
            style={{ marginBottom: 0, width: '100%' }}
          >
            <AutoComplete
              allowClear
              placeholder={formatMessage(messages.findPlayers)}
              options={getHostOptions()}
              onSelect={handleOnHostPlayerClick}
            />
          </Form.Item>
          <Gap defaultHeight={16} />
          {hostPlayers.map((item) => {
            return (
              <Tag
                closable
                onClose={() => {
                  const newHostPlayers = hostPlayers.filter((player) => player.id !== item.id);
                  setHostPlayers(newHostPlayers);
                }}
              >
                {item.nickname}
              </Tag>
            );
          })}
        </FormComponent>
      )}
    </Modal>
  );
};
