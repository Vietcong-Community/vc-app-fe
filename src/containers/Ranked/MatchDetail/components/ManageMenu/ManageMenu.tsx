import React, { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Dropdown, MenuProps } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useAddMatchStatsToOverallStats, useRecalculatePlayerStats } from '../../../../../api/hooks/league/api';
import { DeleteMatchModal } from '../../../../../components/Modals/DeleteMatchModal/DeleteMatchModal';
import { MatchStatusModal } from '../../../../../components/Modals/MatchStatusModal/MatchStatusModal';
import { MatchStatus } from '../../../../../constants/enums';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';

import { messages } from './messages';

interface IProps {
  canEnterResult?: boolean;
  matchId: string;
  seasonId?: string;
  setIsAddPlayerToMatchModalOpen: (value: boolean) => void;
  setIsCreateRoundModalOpen: (value: boolean) => void;
  setIsSortRoundsModalOpen: (value: boolean) => void;
  setIsUpdateMatchModalOpen: (value: boolean) => void;
  status?: MatchStatus;
  userIsStatisticsAdmin: boolean;
  userIsAdmin: boolean;
}

export const ManageMenu: React.FC<IProps> = (props: IProps) => {
  const {
    canEnterResult = false,
    matchId,
    seasonId,
    setIsAddPlayerToMatchModalOpen,
    setIsCreateRoundModalOpen,
    setIsSortRoundsModalOpen,
    setIsUpdateMatchModalOpen,
    status,
    userIsAdmin,
    userIsStatisticsAdmin,
  } = props;
  const [isMatchStatusModalOpen, setIsMatchStatusModalOpen] = useState<boolean>(false);
  const [isDeleteMatchModalOpen, setIsDeleteMatchModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { showNotification } = useNotifications();

  const addMatchStatsToOverallStats = useAddMatchStatsToOverallStats(matchId);
  const recalculatePlayerStats = useRecalculatePlayerStats(matchId);

  const recalculateStats = async () => {
    await recalculatePlayerStats.mutateAsync();
    await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
  };

  const updateOverallStats = async () => {
    try {
      await addMatchStatsToOverallStats.mutateAsync();
      await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
      showNotification(messages.updateStatsSuccess, undefined, NotificationType.INFO);
    } catch {
      showNotification(messages.updateStatsFailed, messages.updateStatsFailedDescription, NotificationType.ERROR);
    }
  };

  const adminItems: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.matchStatusUpdate} />,
      key: '1',
      onClick: () => setIsMatchStatusModalOpen(true),
      disabled: !userIsAdmin,
    },
    {
      label: <FormattedMessage {...messages.updateMatch} />,
      key: '4',
      onClick: () => setIsUpdateMatchModalOpen(true),
      disabled: status === MatchStatus.FINISHED || !userIsAdmin,
    },
    {
      label: <FormattedMessage {...messages.deleteMatch} />,
      key: '2',
      onClick: () => setIsDeleteMatchModalOpen(true),
      disabled: status === MatchStatus.FINISHED || !userIsAdmin,
    },
    {
      label: <FormattedMessage {...messages.sortRounds} />,
      key: '5',
      onClick: () => setIsSortRoundsModalOpen(true),
      disabled: status === MatchStatus.FINISHED || !userIsAdmin,
    },
    {
      label: <FormattedMessage {...messages.recalculatePlayerStats} />,
      key: '3',
      onClick: recalculateStats,
      disabled: status === MatchStatus.FINISHED || !userIsAdmin,
    },
    {
      label: <FormattedMessage {...messages.updateOverallStatistics} />,
      key: '8',
      onClick: updateOverallStats,
      disabled: !(
        (userIsAdmin || userIsStatisticsAdmin) &&
        [MatchStatus.FINISHED, MatchStatus.WAITING_FOR_SCORE_CONFIRMATION].includes(status as MatchStatus)
      ),
    },
    {
      label: <FormattedMessage {...messages.createRound} />,
      key: '6',
      onClick: () => setIsCreateRoundModalOpen(true),
      disabled: status === MatchStatus.FINISHED || !userIsAdmin,
    },
    {
      label: <FormattedMessage {...messages.addPlayer} />,
      key: '7',
      onClick: () => setIsAddPlayerToMatchModalOpen(true),
      disabled: status === MatchStatus.FINISHED || !userIsAdmin,
    },
  ];

  const items: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.enterTheResult} />,
      key: '1',
      onClick: () => {},
      disabled: status !== MatchStatus.ACCEPTED || (!canEnterResult && !userIsAdmin),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', gap: 8 }}>
        {userIsAdmin && (
          <Dropdown menu={{ items: adminItems }}>
            <Button>
              <FormattedMessage {...messages.adminLabel} />
            </Button>
          </Dropdown>
        )}
        <Dropdown menu={{ items }}>
          <Button>
            <FormattedMessage {...messages.menuLabel} />
          </Button>
        </Dropdown>
      </div>
      <MatchStatusModal
        matchId={matchId}
        onClose={() => setIsMatchStatusModalOpen(false)}
        isOpen={isMatchStatusModalOpen}
        initialValues={{ status }}
      />
      <DeleteMatchModal
        isOpen={isDeleteMatchModalOpen}
        onClose={() => setIsDeleteMatchModalOpen(false)}
        matchId={matchId}
        seasonId={seasonId}
      />
    </>
  );
};
