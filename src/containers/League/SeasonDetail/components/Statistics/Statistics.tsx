import React, { useState } from 'react';

import { faArrowUpShortWide } from '@fortawesome/free-solid-svg-icons/faArrowUpShortWide';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Flex, MenuProps } from 'antd';
import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { IUser } from '../../../../../api/hooks/interfaces';
import { useSeasonStatsList } from '../../../../../api/hooks/league/api';
import { ILadderItem } from '../../../../../api/hooks/league/interfaces';
import { Gap } from '../../../../../components/Gap/Gap';
import { StatisticsFilterModal } from '../../../../../components/Modals/StatisticsFilterModal/StatisticsFilterModal';
import { TableWithPagination } from '../../../../../components/TableWithPagination/Table';
import { H2 } from '../../../../../components/Titles/H2/H2';
import { StatisticsSortType } from '../../../../../constants/enums';
import { useRouter } from '../../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { BreakPoints } from '../../../../../theme/theme';
import { mapStatisticsSortTypeToTranslation } from '../../../../../utils/mappingLabelUtils';
import { messages as enumTranslationMessages } from '../../../../../utils/messages';

import { messages } from './messages';
import { IStatisticTableRow, STATISTICS_COLUMNS } from './types';

import * as S from './Statistics.style';

interface IProps {
  seasonId: string;
  teams: ILadderItem[];
}

export const Statistics: React.FC<IProps> = (props: IProps) => {
  const { seasonId, teams } = props;
  const { navigate } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [statisticsQuery, setStatisticsQuery] = useState<{
    playerIds?: IUser[];
    teamIds?: string[];
    selectedMatchPage: number;
  }>({ selectedMatchPage: 1 });
  const [selectedSortType, setSelectedSortType] = useState<StatisticsSortType | undefined>(undefined);
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const statsBySeason = useSeasonStatsList(
    seasonId,
    {
      page: statisticsQuery.selectedMatchPage,
      limit: 10,
      sort: selectedSortType,
      playerIds: !isEmpty(statisticsQuery?.playerIds)
        ? statisticsQuery.playerIds?.map((item) => item.id).join(',')
        : undefined,
      teamIds: !isEmpty(statisticsQuery?.teamIds) ? statisticsQuery.teamIds?.join(',') : undefined,
    },
    'always',
  );

  const items: MenuProps['items'] = [
    {
      label: <FormattedMessage {...enumTranslationMessages.statisticsSortTypeFlags} />,
      key: '1',
      onClick: () => setSelectedSortType(StatisticsSortType.FLAGS),
    },
    {
      label: <FormattedMessage {...enumTranslationMessages.statisticsSortTypeKills} />,
      key: '2',
      onClick: () => setSelectedSortType(StatisticsSortType.KILLS),
    },
    {
      label: <FormattedMessage {...enumTranslationMessages.statisticsSortTypeDeaths} />,
      key: '3',
      onClick: () => setSelectedSortType(StatisticsSortType.DEATHS),
    },
    {
      label: <FormattedMessage {...enumTranslationMessages.statisticsSortTypeKD} />,
      key: '4',
      onClick: () => setSelectedSortType(StatisticsSortType.KD),
    },
    {
      label: <FormattedMessage {...enumTranslationMessages.statisticsSortTypeUsage} />,
      key: '5',
      onClick: () => setSelectedSortType(StatisticsSortType.USAGE),
    },
    {
      label: <FormattedMessage {...enumTranslationMessages.statisticsSortTypeAvgKD} />,
      key: '6',
      onClick: () => setSelectedSortType(StatisticsSortType.AVG_KD),
    },
    {
      label: <FormattedMessage {...enumTranslationMessages.statisticsSortTypeAvgUsage} />,
      key: '7',
      onClick: () => setSelectedSortType(StatisticsSortType.AVG_USAGE),
    },
  ];

  const handleModalSubmit = (values: { players?: IUser[]; teamIds?: string[] }) => {
    setStatisticsQuery({ playerIds: values.players, teamIds: values.teamIds, selectedMatchPage: 1 });
  };

  const tableData: IStatisticTableRow[] =
    statsBySeason.data?.seasonPlayers?.map((player, index) => ({
      id: player.user.id,
      position: index + 1 + 10 * (statisticsQuery.selectedMatchPage - 1),
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

  const onMatchPageChange = (pageNumber: number) =>
    setStatisticsQuery({ ...statisticsQuery, selectedMatchPage: pageNumber });

  return (
    <>
      <Flex vertical align="flex-start">
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <H2>
            <FormattedMessage {...messages.title} />
          </H2>
          <div style={{ display: 'flex', gap: 8 }}>
            <Dropdown menu={{ items }} trigger={['click', 'hover']}>
              <S.AvatarIcon shape="square" size={32} icon={<FontAwesomeIcon icon={faArrowUpShortWide} />} />
            </Dropdown>
            <S.AvatarIcon
              shape="square"
              size={32}
              icon={<FontAwesomeIcon icon={faFilter} />}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </Flex>
        <Flex justify="flex-start">
          {selectedSortType && (
            <S.Tag onClose={() => setSelectedSortType(undefined)} closable={true}>
              <FormattedMessage
                {...messages.sort}
                values={{ value: mapStatisticsSortTypeToTranslation(selectedSortType) }}
              />
            </S.Tag>
          )}
          {statisticsQuery.playerIds?.map((item) => {
            return (
              <S.PlayerTag
                closable
                onClose={() => {
                  const newPlayers = statisticsQuery.playerIds?.filter((player) => player.id !== item.id);
                  setStatisticsQuery({ ...statisticsQuery, playerIds: newPlayers });
                }}
              >
                {item.nickname}
              </S.PlayerTag>
            );
          })}
          {statisticsQuery.teamIds?.map((item) => {
            const team = teams.find((team) => team.team.id === item);

            return (
              <S.TeamTag
                closable
                onClose={() => {
                  const newTeams = statisticsQuery.teamIds?.filter((teamId) => item !== teamId);
                  setStatisticsQuery({ ...statisticsQuery, teamIds: newTeams });
                }}
              >
                {team?.team.name}
              </S.TeamTag>
            );
          })}
        </Flex>
        {(selectedSortType || !isEmpty(statisticsQuery.teamIds) || !isEmpty(statisticsQuery.playerIds)) && (
          <Gap defaultHeight={16} />
        )}
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
          selectedPage={statisticsQuery.selectedMatchPage}
          totalItems={statsBySeason.data?.total ?? 0}
        />
      </Flex>
      <StatisticsFilterModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialPlayers={statisticsQuery.playerIds}
        initialTeams={statisticsQuery.teamIds}
        teams={teams}
      />
    </>
  );
};
