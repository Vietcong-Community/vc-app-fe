import React, { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Dropdown, MenuProps } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useAddMatchStatsToOverallStats, useRecalculatePlayerStats } from '../../../../../api/hooks/league/api';
import { ConfirmRankedMatchResultModal } from '../../../../../components/Modals/ConfirmRankedMatchResultModal/ConfirmRankedMatchResultModal';
import { DeleteMatchModal } from '../../../../../components/Modals/DeleteMatchModal/DeleteMatchModal';
import { LockRankedMatchModal } from '../../../../../components/Modals/LockRankedMatchModal/LockRankedMatchModal';
import { MatchStatusModal } from '../../../../../components/Modals/MatchStatusModal/MatchStatusModal';
import { MatchStatus } from '../../../../../constants/enums';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';

import { messages } from './messages';

interface IProps {
  canEnterResult?: boolean;
  canLockMatch?: boolean;
  matchId: string;
  seasonId?: string;
  setIsAddPlayerToMatchModalOpen: (value: boolean) => void;
  setIsCreateRoundModalOpen: (value: boolean) => void;
  setIsSortRoundsModalOpen: (value: boolean) => void;
  setIsSwitchPlayerTeamModalOpen: (value: boolean) => void;
  setIsUpdateMatchModalOpen: (value: boolean) => void;
  status?: MatchStatus;
  userIsStatisticsAdmin: boolean;
  userIsAdmin: boolean;
}

export const ManageMenu: React.FC<IProps> = (props: IProps) => {
  const {
    canEnterResult = false,
    canLockMatch = false,
    matchId,
    seasonId,
    setIsAddPlayerToMatchModalOpen,
    setIsCreateRoundModalOpen,
    setIsSortRoundsModalOpen,
    setIsSwitchPlayerTeamModalOpen,
    setIsUpdateMatchModalOpen,
    status,
    userIsAdmin,
    userIsStatisticsAdmin,
  } = props;
  const [isLockMatchModalOpen, setIsLockMatchModalOpen] = useState<boolean>(false);
  const [isMatchStatusModalOpen, setIsMatchStatusModalOpen] = useState<boolean>(false);
  const [isDeleteMatchModalOpen, setIsDeleteMatchModalOpen] = useState<boolean>(false);
  const [isConfirmScoreModalOpen, setIsConfirmScoreModalOpen] = useState<boolean>(false);
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
      disabled: status === MatchStatus.FINISHED || !userIsAdmin,
    },
    {
      label: <FormattedMessage {...messages.updateMatch} />,
      key: '2',
      onClick: () => setIsUpdateMatchModalOpen(true),
      disabled: status === MatchStatus.FINISHED || !userIsAdmin,
    },
    {
      label: <FormattedMessage {...messages.lockMatch} />,
      key: '3',
      onClick: () => setIsLockMatchModalOpen(true),
      disabled: status !== MatchStatus.NEW || !userIsAdmin || !canLockMatch,
    },
    {
      label: <FormattedMessage {...messages.deleteMatch} />,
      key: '4',
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
      key: '6',
      onClick: recalculateStats,
      disabled: !userIsAdmin,
    },
    {
      label: <FormattedMessage {...messages.updateOverallStatistics} />,
      key: '7',
      onClick: updateOverallStats,
      disabled: !(
        (userIsAdmin || userIsStatisticsAdmin) &&
        [MatchStatus.FINISHED, MatchStatus.WAITING_FOR_SCORE_CONFIRMATION].includes(status as MatchStatus)
      ),
    },
    {
      label: <FormattedMessage {...messages.createRound} />,
      key: '8',
      onClick: () => setIsCreateRoundModalOpen(true),
      disabled: status === MatchStatus.FINISHED || !userIsAdmin,
    },
    {
      label: <FormattedMessage {...messages.addPlayer} />,
      key: '9',
      onClick: () => setIsAddPlayerToMatchModalOpen(true),
      disabled: !userIsAdmin,
    },
    {
      label: <FormattedMessage {...messages.switchPlayerTeam} />,
      key: '10',
      onClick: () => setIsSwitchPlayerTeamModalOpen(true),
      disabled: !userIsAdmin || status !== MatchStatus.ACCEPTED,
    },
  ];

  const items: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.confirmTheResult} />,
      key: '1',
      onClick: () => setIsConfirmScoreModalOpen(true),
      disabled: status !== MatchStatus.WAITING_FOR_SCORE_CONFIRMATION || (!canEnterResult && !userIsAdmin),
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
      <ConfirmRankedMatchResultModal
        isOpen={isConfirmScoreModalOpen}
        onClose={() => setIsConfirmScoreModalOpen(false)}
        matchId={matchId}
      />
      <LockRankedMatchModal
        isOpen={isLockMatchModalOpen}
        onClose={() => setIsLockMatchModalOpen(false)}
        matchId={matchId}
      />
    </>
  );
};
