import React from 'react';

import { Button, Dropdown, MenuProps } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useDeleteMatch } from '../../../../../api/hooks/admin/api';
import { MatchStatus } from '../../../../../constants/enums';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { useRouter } from '../../../../../hooks/RouterHook';
import { Routes } from '../../../../../routes/enums';

import { messages } from './messages';

interface IProps {
  matchId: string;
  seasonId?: string;
  status?: MatchStatus;
  userIsAdmin: boolean;
}

export const ManageMenu: React.FC<IProps> = (props: IProps) => {
  const { matchId, seasonId, status, userIsAdmin } = props;
  const { navigate } = useRouter<{ id: string }>();
  const { showNotification } = useNotifications();

  const deleteMatch = useDeleteMatch();

  const onConfirmMatch = async () => {
    navigate(Routes.MATCH_CHALLENGE.replace(':matchId', matchId));
  };

  const onDeleteMatch = async () => {
    try {
      await deleteMatch.mutateAsync(matchId);
      showNotification(messages.deleteSuccess);
      navigate(Routes.SEASON_DETAIL.replace(':seasonId', seasonId ?? ''));
    } catch {
      showNotification(messages.deleteFailed);
    }
  };

  const adminItems: MenuProps['items'] = userIsAdmin
    ? [
        {
          label: <FormattedMessage {...messages.deleteMatch} />,
          key: '4',
          onClick: onDeleteMatch,
          disabled: status !== MatchStatus.FINISHED,
        },
      ]
    : [];

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
      onClick: () => navigate(Routes.SET_MATCH_SCORE.replace(':matchId', matchId)),
      disabled: status !== MatchStatus.ACCEPTED,
    },

    {
      label: <FormattedMessage {...messages.confirmTheResult} />,
      key: '3',
      onClick: () => navigate(Routes.CONFIRM_MATCH_SCORE.replace(':matchId', matchId)),
      disabled: status !== MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
    },
    ...adminItems,
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button>
        <FormattedMessage {...messages.menuLabel} />
      </Button>
    </Dropdown>
  );
};
