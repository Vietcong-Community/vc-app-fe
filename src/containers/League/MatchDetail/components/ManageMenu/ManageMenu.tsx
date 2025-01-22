import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Dropdown, MenuProps } from 'antd';
import { FormattedMessage } from 'react-intl';

import { MatchStatus } from '../../../../../constants/enums';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { useRouter } from '../../../../../hooks/RouterHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../../../routes/enums';

import { messages } from './messages';

interface IProps {
  isPossibleToConfirmMatch: boolean;
  leagueId: string;
  matchId: string;
  seasonId: string;
  status?: MatchStatus;
}

export const ManageMenu: React.FC<IProps> = (props: IProps) => {
  const { isPossibleToConfirmMatch, matchId, leagueId, seasonId, status } = props;
  const { navigate, query } = useRouter<{ id: string }>();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();

  const onDeleteMatch = async () => {
    try {
      showNotification(messages.deleteSuccess);
      navigate(Routes.LEAGUE);
    } catch (e) {
      showNotification(messages.deleteFailed, undefined, NotificationType.ERROR);
    }
  };

  const onConfirmMatch = async () => {
    try {
      await queryClient.invalidateQueries({ queryKey: ['matchesById', query.id] });
      showNotification(messages.confirmMatchSuccess);
    } catch (e) {
      showNotification(messages.confirmMatchFailed, undefined, NotificationType.ERROR);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.update} />,
      key: '0',
      disabled: status !== MatchStatus.NEW,
    },
    {
      label: <FormattedMessage {...messages.confirmTheMatch} />,
      key: '1',
      onClick: onConfirmMatch,
      disabled: status !== MatchStatus.NEW || !isPossibleToConfirmMatch,
    },
    {
      label: <FormattedMessage {...messages.enterTheResult} />,
      key: '2',
      onClick: () =>
        navigate(
          Routes.SET_MATCH_SCORE.replace(':leagueId', leagueId)
            .replace(':seasonId', seasonId)
            .replace(':matchId', matchId),
        ),
      disabled: status !== MatchStatus.ACCEPTED,
    },

    {
      label: <FormattedMessage {...messages.confirmTheResult} />,
      key: '3',
      onClick: () => navigate(Routes.SET_MATCH_SCORE),
      disabled: status !== MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
    },
    {
      label: <FormattedMessage {...messages.delete} />,
      key: '4',
      onClick: onDeleteMatch,
      disabled: status !== MatchStatus.NEW && status !== MatchStatus.WAITING_FOR_CONFIRMATION,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button>
        <FormattedMessage {...messages.menuLabel} />
      </Button>
    </Dropdown>
  );
};
