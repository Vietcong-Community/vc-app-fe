import React, { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Dropdown, MenuProps } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useRecalculatePlayerStats } from '../../../../../api/hooks/league/api';
import { MatchStatus } from '../../../../../constants/enums';
import { useRouter } from '../../../../../hooks/RouterHook';
import { Routes } from '../../../../../routes/enums';
import { DeleteMatchModal } from '../DeleteMatchModal/DeleteMatchModal';
import { MatchStatusModal } from '../MatchStatusModal/MatchStatusModal';

import { messages } from './messages';

interface IProps {
  canConfirmMatch?: boolean;
  canConfirmResult?: boolean;
  canEnterResult?: boolean;
  matchId: string;
  seasonId?: string;
  setIsAddPlayerToMatchModalOpen: (value: boolean) => void;
  setIsCreateRoundModalOpen: (value: boolean) => void;
  setIsSortRoundsModalOpen: (value: boolean) => void;
  setIsUpdateMatchModalOpen: (value: boolean) => void;
  status?: MatchStatus;
  userIsAdmin: boolean;
}

export const ManageMenu: React.FC<IProps> = (props: IProps) => {
  const {
    canConfirmMatch = false,
    canEnterResult = false,
    canConfirmResult = false,
    matchId,
    seasonId,
    setIsAddPlayerToMatchModalOpen,
    setIsCreateRoundModalOpen,
    setIsSortRoundsModalOpen,
    setIsUpdateMatchModalOpen,
    status,
    userIsAdmin,
  } = props;
  const [isMatchStatusModalOpen, setIsMatchStatusModalOpen] = useState<boolean>(false);
  const [isDeleteMatchModalOpen, setIsDeleteMatchModalOpen] = useState<boolean>(false);
  const { navigate } = useRouter<{ id: string }>();
  const queryClient = useQueryClient();

  const recalculatePlayerStats = useRecalculatePlayerStats(matchId);

  const onConfirmMatch = async () => {
    navigate(Routes.MATCH_CHALLENGE.replace(':matchId', matchId));
  };

  const recalculateStats = async () => {
    await recalculatePlayerStats.mutateAsync();
    await queryClient.refetchQueries({ queryKey: ['matchDetail', matchId] });
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
  ];

  const items: MenuProps['items'] = [
    {
      label: <FormattedMessage {...messages.confirmTheMatch} />,
      key: '1',
      onClick: onConfirmMatch,
      disabled: status !== MatchStatus.NEW || (!canConfirmMatch && !userIsAdmin),
    },
    {
      label: <FormattedMessage {...messages.enterTheResult} />,
      key: '2',
      onClick: () => navigate(Routes.SET_MATCH_SCORE.replace(':matchId', matchId)),
      disabled: status !== MatchStatus.ACCEPTED || (!canEnterResult && !userIsAdmin),
    },
    {
      label: <FormattedMessage {...messages.confirmTheResult} />,
      key: '3',
      onClick: () => navigate(Routes.CONFIRM_MATCH_SCORE.replace(':matchId', matchId)),
      disabled: status !== MatchStatus.WAITING_FOR_SCORE_CONFIRMATION || (!canConfirmResult && !userIsAdmin),
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
