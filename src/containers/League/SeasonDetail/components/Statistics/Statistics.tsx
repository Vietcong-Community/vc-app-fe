import React, { useState } from 'react';

import { Flex } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useSeasonStatsList } from '../../../../../api/hooks/league/api';
import { TableWithPagination } from '../../../../../components/TableWithPagination/Table';
import { H2 } from '../../../../../components/Titles/H2/H2';
import { useRouter } from '../../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { BreakPoints } from '../../../../../theme/theme';

import { messages } from './messages';
import { IStatisticTableRow, STATISTICS_COLUMNS } from './types';

interface IProps {
  seasonId: string;
}

export const Statistics: React.FC<IProps> = (props: IProps) => {
  const { seasonId } = props;
  const { navigate } = useRouter();
  const [selectedMatchPage, setSelectedMatchPage] = useState<number>(1);
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const statsBySeason = useSeasonStatsList(seasonId, { page: selectedMatchPage, limit: 10 }, 'always');

  const tableData: IStatisticTableRow[] =
    statsBySeason.data?.seasonPlayers?.map((player, index) => ({
      id: player.user.id,
      position: index + 1 + 10 * (selectedMatchPage - 1),
      nickname: player.user.nickname,
      totalMatches: player.totalMatches,
      flags: player.flags,
      kills: player.kills,
      deaths: player.deaths,
      kd: player.kd,
      usefulness: player.usefulness,
      averageFlags: player.averageFlags,
      averageUsefulness: player.averageUsefulness,
    })) ?? [];

  const onMatchPageChange = (pageNumber: number) => setSelectedMatchPage(pageNumber);

  return (
    <Flex vertical align="flex-start">
      <H2>
        <FormattedMessage {...messages.title} />
      </H2>
      <TableWithPagination<IStatisticTableRow>
        columns={STATISTICS_COLUMNS(isSmallerThanMd)}
        data={tableData}
        loading={statsBySeason.isLoading}
        onPageChange={onMatchPageChange}
        onRow={(item) => {
          const onClick = () => navigate(Routes.USER_PROFILE.replace(':id', item.id));

          return {
            onClick,
            style: {
              cursor: 'pointer',
            },
          };
        }}
        selectedPage={selectedMatchPage}
        totalItems={statsBySeason.data?.total ?? 0}
      />
    </Flex>
  );
};
