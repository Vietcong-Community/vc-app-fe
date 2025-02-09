import React, { useState } from 'react';

import { useSeasonMatchList } from '../../../../../api/hooks/league/api';
import { TableWithPagination } from '../../../../../components/TableWithPagination/Table';
import { MatchResult, MatchStatus } from '../../../../../constants/enums';
import { useRouter } from '../../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { BreakPoints } from '../../../../../theme/theme';
import { formatDateForUser } from '../../../../../utils/dateUtils';
import { mapMatchStatusToTranslation } from '../../../../../utils/mappingLabelUtils';

import { IMatchesTableRow, MATCH_COLUMNS } from './types';

interface IProps {
  teamId: string;
  seasonId: string;
}

export const Matches: React.FC<IProps> = (props: IProps) => {
  const { teamId, seasonId } = props;
  const { navigate } = useRouter();
  const [selectedMatchPage, setSelectedMatchPage] = useState<number>(1);
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const matches = useSeasonMatchList(seasonId, { page: selectedMatchPage, teamId, limit: 10 }, 'always');
  const onMatchPageChange = (pageNumber: number) => setSelectedMatchPage(pageNumber);

  const allMatchesTableData: IMatchesTableRow[] =
    matches.data?.matches?.map((item) => {
      const getOpponentTeamName = () => {
        if (item.opponent?.team?.id === teamId) {
          return isSmallerThanMd ? item.challenger?.team.tag : item.challenger?.team.name;
        }

        return isSmallerThanMd ? item.opponent?.team.tag : item.opponent?.team.name;
      };

      const getMatchResult = () => {
        if (
          ![
            MatchStatus.FINISHED,
            MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
            MatchStatus.CONFIRMED_SCORE_BY_SYSTEM,
          ].includes(item.status)
        ) {
          return undefined;
        }

        if ((item.opponentScore ?? 0) === (item.challengerScore ?? 0)) {
          return MatchResult.DRAW;
        }

        if (item.opponent?.team?.id === teamId) {
          return (item.opponentScore ?? 0) > (item.challengerScore ?? 0) ? MatchResult.WIN : MatchResult.DEFEAT;
        }

        return (item.challengerScore ?? 0) > (item.opponentScore ?? 0) ? MatchResult.WIN : MatchResult.DEFEAT;
      };

      const getScore = () => {
        if (item.opponent?.team?.id === teamId) {
          return `${item.opponentScore ?? '?'} - ${item.challengerScore ?? '?'}`;
        }

        return `${item.challengerScore ?? '?'} - ${item.opponentScore ?? '?'}`;
      };

      const getPoints = () => {
        if (item.opponent?.team?.id === teamId) {
          return item.opponentEloRowAmount ?? 0;
        }

        return item.challengerEloRowAmount ?? 0;
      };

      return {
        id: item.id,
        date: formatDateForUser(item.startDate) ?? '',
        status: mapMatchStatusToTranslation(item.status),
        opponentTeamName: getOpponentTeamName(),
        result: getMatchResult(),
        matchStatus: item.status,
        points: getPoints(),
        score: getScore(),
      };
    }) ?? [];

  return (
    <>
      <TableWithPagination
        columns={MATCH_COLUMNS(isSmallerThanMd)}
        data={allMatchesTableData}
        loading={matches.isLoading}
        onPageChange={onMatchPageChange}
        onRow={(item) => {
          const onClick = () => navigate(Routes.MATCH_DETAIL.replace(':matchId', item.id));

          return {
            onClick,
            style: {
              cursor: 'pointer',
            },
          };
        }}
        selectedPage={selectedMatchPage}
        style={{ width: '100%' }}
        totalItems={matches.data?.total}
      />
    </>
  );
};
