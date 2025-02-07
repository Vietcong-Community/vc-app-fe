import React, { useState } from 'react';

import { Flex } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useSeasonMatchList } from '../../../../../api/hooks/league/api';
import { TableWithPagination } from '../../../../../components/TableWithPagination/Table';
import { H2 } from '../../../../../components/Titles/H2/H2';
import { MatchStatus } from '../../../../../constants/enums';
import { useRouter } from '../../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { BreakPoints } from '../../../../../theme/theme';
import { formatDateForUser } from '../../../../../utils/dateUtils';
import { mapMatchStatusToTranslation } from '../../../../../utils/mappingLabelUtils';
import { IMatchesTableRow, MATCH_COLUMNS } from '../../../types';

import { messages } from './messages';

interface IProps {
  seasonId: string;
}

export const AllMatches: React.FC<IProps> = (props: IProps) => {
  const { seasonId } = props;
  const { width } = useWindowDimensions();
  const { navigate } = useRouter();
  const [selectedMatchPage, setSelectedMatchPage] = useState<number>(1);

  const isSmallerThanMd = width < BreakPoints.md;

  const matches = useSeasonMatchList(seasonId, { page: selectedMatchPage, limit: 10 }, 'always');

  const allMatchesTableData: IMatchesTableRow[] =
    matches.data?.matches?.map((item) => {
      const getOpponentTeamName = () => {
        if (!item.opponent?.team.name) {
          return '-';
        }

        return isSmallerThanMd ? item.opponent?.team.tag : item.opponent?.team.name;
      };

      return {
        id: item.id,
        date: formatDateForUser(item.startDate) ?? '',
        status: mapMatchStatusToTranslation(item.status),
        challengerTeamName: isSmallerThanMd ? item.challenger?.team.tag : item.challenger.team.name,
        opponentTeamName: getOpponentTeamName(),
        result: [
          MatchStatus.FINISHED,
          MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
          MatchStatus.CONFIRMED_SCORE_BY_SYSTEM,
        ].includes(item.status as MatchStatus)
          ? `${item.challengerScore} - ${item.opponentScore}`
          : '? - ?',
      };
    }) ?? [];

  const onMatchPageChange = (pageNumber: number) => setSelectedMatchPage(pageNumber);

  return (
    <Flex vertical align="flex-start">
      <H2 id="all-matches">
        <FormattedMessage {...messages.title} /> {matches.data?.total !== undefined ? <>({matches.data?.total})</> : ''}
      </H2>
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
    </Flex>
  );
};
