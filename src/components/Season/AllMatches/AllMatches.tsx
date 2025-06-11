import React, { useState } from 'react';

import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { FormattedMessage } from 'react-intl';

import { IMap } from '../../../api/hooks/interfaces';
import { useSeasonMatchList } from '../../../api/hooks/league/api';
import { ILadderItem } from '../../../api/hooks/league/interfaces';
import { MatchStatus, PlayersCount } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../routes/enums';
import { BreakPoints } from '../../../theme/theme';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapMatchStatusToTranslation } from '../../../utils/mappingLabelUtils';
import { Gap } from '../../Gap/Gap';
import { TableWithPagination } from '../../TableWithPagination/Table';
import { H2 } from '../../Titles/H2/H2';
import { MatchFilterModal } from '../MatchFilterModal/MatchFilterModal';
import { IFormData } from '../MatchFilterModal/MatchFilterModal.fields';

import { messages } from './messages';
import { IMatchesTableRow, MATCH_COLUMNS } from './types';

import * as S from './AllMatches.style';

interface IProps {
  matchUrl?: string;
  seasonLadder?: ILadderItem[];
  seasonMaps: IMap[];
  seasonId: string;
  showSeasonTeams?: boolean;
  showTeamNames?: boolean;
  showPlayers?: boolean;
  userIsAdmin?: boolean;
}

export const AllMatches: React.FC<IProps> = (props: IProps) => {
  const {
    matchUrl = Routes.MATCH_DETAIL,
    seasonId,
    seasonMaps,
    seasonLadder,
    showSeasonTeams = true,
    showTeamNames = true,
    showPlayers = false,
    userIsAdmin = false,
  } = props;
  const { width } = useWindowDimensions();
  const { navigate } = useRouter();
  const [selectedMatchPage, setSelectedMatchPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<Partial<IFormData>>({});

  const isSmallerThanMd = width < BreakPoints.md;

  const matches = useSeasonMatchList(
    seasonId,
    { page: selectedMatchPage, limit: 10, ...filterValues, status: filterValues.status?.join(',') },
    'always',
  );

  const allMatchesTableData: IMatchesTableRow[] =
    matches.data?.matches?.map((item) => {
      const getOpponentTeamName = () => {
        if (!item.opponent?.team.name) {
          return '-';
        }

        return isSmallerThanMd ? item.opponent?.team.tag : item.opponent?.team.name;
      };

      const getMatchPlayerCountOptions = () => {
        if (!showPlayers || !item.maximalPlayers) {
          return [];
        }

        if (item.maximalPlayers === 12) {
          return [PlayersCount.FOUR, PlayersCount.FIVE, PlayersCount.SIX];
        }

        if (item.maximalPlayers === 10) {
          return [PlayersCount.FOUR, PlayersCount.FIVE];
        }

        if (item.maximalPlayers === 8) {
          return [PlayersCount.FOUR];
        }
      };

      return {
        id: item.id,
        date: formatDateForUser(item.startDate) ?? '',
        status: mapMatchStatusToTranslation(item.status),
        challengerTeamName: isSmallerThanMd ? item.challenger?.team.tag : item.challenger.team.name,
        opponentTeamName: getOpponentTeamName(),
        challengerElo: item.challengerEloRowAmount,
        opponentElo: item.opponentEloRowAmount,
        matchStatus: item.status,
        matchPlayerCountOptions: getMatchPlayerCountOptions(),
        maximalPlayers: item.maximalPlayers,
        result: [
          MatchStatus.FINISHED,
          MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
          MatchStatus.CONFIRMED_SCORE_BY_SYSTEM,
        ].includes(item.status as MatchStatus)
          ? `${item.challengerScore} - ${item.opponentScore}`
          : '? - ?',
        hostPlayers: item.hostMatchPlayers ?? [],
        challengerPlayers: item.challengerMatchPlayers ?? [],
        opponentPlayers: item.opponentMatchPlayers ?? [],
        joinPlayersCount:
          (item.hostMatchPlayers?.length ?? 0) +
          (item.challengerMatchPlayers?.length ?? 0) +
          (item.opponentMatchPlayers?.length ?? 0),
        isLoggedToMatch: item?.isLoggedToMatch,
      };
    }) ?? [];

  const onFilterSubmit = (values: IFormData) => {
    setFilterValues(values);
    setIsModalOpen(false);
  };

  const onMatchPageChange = (pageNumber: number) => setSelectedMatchPage(pageNumber);
  const filteredMap = seasonMaps?.find((item) => item.id === filterValues.mapId);
  const filteredTeam = seasonLadder?.find((item) => item.team.id === filterValues.teamId);

  return (
    <>
      <Flex vertical align="flex-start">
        <Flex align="center" justify="space-between" style={{ width: '100%' }}>
          <H2 id="all-matches">
            <FormattedMessage {...messages.title} />{' '}
            {matches.data?.total !== undefined ? <>({matches.data?.total})</> : ''}
          </H2>
          <S.AvatarIcon
            shape="square"
            size={32}
            icon={<FontAwesomeIcon icon={faFilter} />}
            onClick={() => setIsModalOpen(true)}
          />
        </Flex>
        {!isEmpty(filterValues) && (
          <>
            <Gap defaultHeight={8} />
            <Flex>
              {!!filteredMap && <S.Tag>{filteredMap.name}</S.Tag>}
              {!!filteredTeam && <S.Tag>{filteredTeam.team.name}</S.Tag>}
              {filterValues.status?.map((item) => <S.Tag>{mapMatchStatusToTranslation(item)}</S.Tag>)}
              {!!filterValues.startDateFrom && (
                <S.Tag>
                  <FormattedMessage {...messages.from} /> {formatDateForUser(filterValues.startDateFrom)}
                </S.Tag>
              )}
              {!!filterValues.startDateTo && (
                <S.Tag>
                  <FormattedMessage {...messages.to} /> {formatDateForUser(filterValues.startDateTo)}
                </S.Tag>
              )}
            </Flex>
            <Gap defaultHeight={8} />
          </>
        )}
        <TableWithPagination
          columns={MATCH_COLUMNS(isSmallerThanMd, showTeamNames, showPlayers, userIsAdmin)}
          data={allMatchesTableData}
          loading={matches.isLoading}
          onPageChange={onMatchPageChange}
          onRow={(item) => {
            const onClick = () => navigate(matchUrl.replace(':matchId', item.id));

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
      <MatchFilterModal
        closeModal={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        isSubmitting={matches.isLoading || matches.isFetching}
        maps={seasonMaps}
        onSubmit={onFilterSubmit}
        seasonLadder={seasonLadder}
        showSeasonTeams={showSeasonTeams}
      />
    </>
  );
};
