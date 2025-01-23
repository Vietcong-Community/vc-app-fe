import React from 'react';

import { Button, Dropdown, MenuProps } from 'antd';
import { FormattedMessage } from 'react-intl';

import { MatchStatus } from '../../../../../constants/enums';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { useRouter } from '../../../../../hooks/RouterHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../../../routes/enums';

import { messages } from './messages';

interface IProps {
  leagueId: string;
  matchId: string;
  seasonId: string;
  status?: MatchStatus;
}

export const ManageMenu: React.FC<IProps> = (props: IProps) => {
  const { matchId, leagueId, seasonId, status } = props;
  const { navigate } = useRouter<{ id: string }>();
  const { showNotification } = useNotifications();

  const onDeleteMatch = async () => {
    try {
      showNotification(messages.deleteSuccess);
      navigate(Routes.LEAGUE);
    } catch (e) {
      showNotification(messages.deleteFailed, undefined, NotificationType.ERROR);
    }
  };

  const onConfirmMatch = async () => {
    navigate(
      Routes.MATCH_CHALLENGE.replace(':leagueId', leagueId).replace(':seasonId', seasonId).replace(':matchId', matchId),
    );
  };

  const items: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.confirmTheMatch} />,
      key: '1',
      onClick: onConfirmMatch,
      disabled: status !== MatchStatus.NEW,
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
      onClick: () =>
        navigate(
          Routes.CONFIRM_MATCH_SCORE.replace(':leagueId', leagueId)
            .replace(':seasonId', seasonId)
            .replace(':matchId', matchId),
        ),
      disabled: status !== MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
    },
    {
      label: <FormattedMessage {...messages.delete} />,
      key: '4',
      onClick: onDeleteMatch,
      disabled: status !== MatchStatus.NEW,
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
