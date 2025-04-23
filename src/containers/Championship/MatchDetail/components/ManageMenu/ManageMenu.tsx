import React, { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Dropdown, MenuProps } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useAddMatchStatsToOverallStats, useRecalculatePlayerStats } from '../../../../../api/hooks/league/api';
import { DeleteMatchModal } from '../../../../../components/Modals/DeleteMatchModal/DeleteMatchModal';
import { MatchStatusModal } from '../../../../../components/Modals/MatchStatusModal/MatchStatusModal';
import { MatchStatus } from '../../../../../constants/enums';
import { useNotifications } from '../../../../../hooks/NotificationsHook';
import { useRouter } from '../../../../../hooks/RouterHook';
import { NotificationType } from '../../../../../providers/NotificationsProvider/enums';
import { Routes } from '../../../../../routes/enums';

import { messages } from './messages';

interface IProps {
  canConfirmResult?: boolean;
  canEnterResult?: boolean;
  canMapPick?: boolean;
  matchId: string;
  seasonId?: string;
  setIsAddPlayerToMatchModalOpen: (value: boolean) => void;
  setIsCreateRoundModalOpen: (value: boolean) => void;
  setIsSortRoundsModalOpen: (value: boolean) => void;
  setIsUpdateMatchModalOpen: (value: boolean) => void;
  startDate?: string;
  status?: MatchStatus;
  userIsStatisticsAdmin: boolean;
  userIsAdmin: boolean;
}

export const ManageMenu: React.FC<IProps> = (props: IProps) => {
  const {
    canMapPick = false,
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
  const { navigate } = useRouter<{ id: string }>();
  const queryClient = useQueryClient();
  const { showNotification } = useNotifications();

  // const nowDate = dayjs();
  // const matchStarted = nowDate.isAfter(dayjs(startDate));
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
    },
    {
      label: <FormattedMessage {...messages.deleteMatch} />,
      key: '2',
      onClick: () => setIsDeleteMatchModalOpen(true),
      disabled: status === MatchStatus.FINISHED,
    },
    {
      label: <FormattedMessage {...messages.recalculatePlayerStats} />,
      key: '3',
      onClick: recalculateStats,
      disabled: status === MatchStatus.FINISHED,
    },
    {
      label: <FormattedMessage {...messages.updateMatch} />,
      key: '4',
      onClick: () => setIsUpdateMatchModalOpen(true),
      disabled: status === MatchStatus.FINISHED,
    },
    {
      label: <FormattedMessage {...messages.sortRounds} />,
      key: '5',
      onClick: () => setIsSortRoundsModalOpen(true),
      disabled: status === MatchStatus.FINISHED,
    },
    {
      label: <FormattedMessage {...messages.createRound} />,
      key: '6',
      onClick: () => setIsCreateRoundModalOpen(true),
      disabled: status === MatchStatus.FINISHED,
    },
    {
      label: <FormattedMessage {...messages.addPlayer} />,
      key: '7',
      onClick: () => setIsAddPlayerToMatchModalOpen(true),
      disabled: status === MatchStatus.FINISHED,
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
  ];

  const items: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.enterTheResult} />,
      key: '1',
      onClick: () => navigate(Routes.SET_CHAMPIONSHIP_MATCH_DETAIL.replace(':matchId', matchId)),
      // disabled: !matchStarted || status !== MatchStatus.ACCEPTED || !userIsAdmin, //(!canEnterResult && !userIsAdmin),
      disabled: status !== MatchStatus.ACCEPTED || !userIsAdmin, //(!canEnterResult && !userIsAdmin),
    },
    {
      label: <FormattedMessage {...messages.confirmTheResult} />,
      key: '2',
      onClick: () => navigate(Routes.CONFIRM_MATCH_SCORE.replace(':matchId', matchId)),
      // disabled: !matchStarted || status !== MatchStatus.WAITING_FOR_SCORE_CONFIRMATION || !userIsAdmin, //(!canConfirmResult && !userIsAdmin),
      disabled: status !== MatchStatus.WAITING_FOR_SCORE_CONFIRMATION || !userIsAdmin,
    },
    {
      label: <FormattedMessage {...messages.mapRemoving} />,
      key: '3',
      onClick: () => navigate(Routes.TOURNAMENT_MAP_PICK.replace(':matchId', matchId)),
      disabled: !(canMapPick && status === MatchStatus.ACCEPTED),
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
