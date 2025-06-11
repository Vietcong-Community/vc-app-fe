import React, { useEffect, useState } from 'react';

import { AutoComplete, Form, Modal, Tag } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { IUser } from '../../../api/hooks/interfaces';
import { ILadderItem } from '../../../api/hooks/league/interfaces';
import { useUserList } from '../../../api/hooks/users/api';
import { SelectField } from '../../Fields/SelectField/SelectField';
import { FormComponent } from '../../Form/FormComponent';
import { Gap } from '../../Gap/Gap';

import { fields, IFormData } from './StatisticsFilterModal.fields';
import { messages } from './messages';

interface IProps {
  closeModal: () => void;
  initialTeams?: string[];
  initialPlayers?: IUser[];
  isOpen: boolean;
  isSubmitting?: boolean;
  onSubmit: (values: { players?: IUser[]; teamIds?: string[] }) => void;
  teams?: ILadderItem[];
  showPlayersFilter?: boolean;
  showTeamFilter?: boolean;
}

export const StatisticsFilterModal: React.FC<IProps> = (props: IProps) => {
  const {
    closeModal,
    initialTeams = [],
    initialPlayers = [],
    isOpen,
    isSubmitting = false,
    onSubmit,
    teams,
    showPlayersFilter = true,
    showTeamFilter = true,
  } = props;
  const [playersQuery, setPlayersQuery] = useState<{ nickname?: string }>({});
  const [players, setPlayers] = useState<IUser[]>(initialPlayers);
  const [form] = Form.useForm<IFormData>();
  const { formatMessage } = useIntl();
  const playersFormValue = Form.useWatch('players', form);

  const users = useUserList(playersQuery, true, !!playersQuery?.nickname && playersQuery.nickname.length >= 3);

  const teamOptions =
    teams?.map((item) => {
      return { id: item.team.id, value: item.team.id, label: item.team.name };
    }) ?? [];

  useEffect(() => {
    if (isOpen) {
      setPlayers(initialPlayers);
      form.setFieldValue('teams', initialTeams);
    }
  }, [isOpen]);

  useEffect(() => {
    if (playersFormValue && playersFormValue?.length >= 3) {
      setPlayersQuery({ nickname: playersFormValue });
    }
  }, [playersFormValue?.length]);

  const getPlayerOptions = () => {
    if (playersFormValue && playersFormValue?.length < 3) {
      return [];
    }

    return users.data?.users?.map((item) => ({ label: item.nickname, value: item.id })) ?? [];
  };

  const handleOnPlayerClick = (value: string) => {
    const user = users.data?.users.find((user) => user.id === value);
    if (user) {
      setPlayers([...players, user]);
    }
    form.resetFields(['players']);
  };

  const handleSubmit = (values: IFormData) => {
    onSubmit({ players, teamIds: values.teams });
  };

  return (
    <Modal
      title={<FormattedMessage {...messages.title} />}
      onCancel={closeModal}
      onOk={closeModal}
      open={isOpen}
      okButtonProps={{ htmlType: 'submit', form: 'statistics-filter' }}
      confirmLoading={isSubmitting}
    >
      <FormComponent id="statistics-filter" form={form} initialValues={{ teams: initialTeams }} onSubmit={handleSubmit}>
        {showTeamFilter && (
          <SelectField
            {...fields.teams}
            label={<FormattedMessage {...messages.teams} />}
            placeholder={formatMessage(messages.findTeams)}
            options={teamOptions}
            mode="multiple"
          />
        )}
        {showPlayersFilter && (
          <Form.Item
            name={fields.players.name}
            label={<FormattedMessage {...messages.players} />}
            style={{ marginBottom: 0, width: '100%' }}
          >
            <AutoComplete
              allowClear
              placeholder={formatMessage(messages.findPlayers)}
              options={getPlayerOptions()}
              onSelect={handleOnPlayerClick}
            />
          </Form.Item>
        )}
        <Gap defaultHeight={16} />
        {players.map((item) => {
          return (
            <Tag
              closable
              onClose={() => {
                const newHostPlayers = players.filter((player) => player.id !== item.id);
                setPlayers(newHostPlayers);
              }}
            >
              {item.nickname}
            </Tag>
          );
        })}
      </FormComponent>
    </Modal>
  );
};
