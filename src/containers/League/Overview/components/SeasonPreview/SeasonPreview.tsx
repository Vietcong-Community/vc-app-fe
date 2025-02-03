import React from 'react';

import { FrownOutlined } from '@ant-design/icons';
import { Flex, Spin, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useSeasonLadder, useSeasonMatchList, useSeasonTeams } from '../../../../../api/hooks/league/api';
import { IMatchListItem, ISeason } from '../../../../../api/hooks/league/interfaces';
import { useMeTeams } from '../../../../../api/hooks/teams/api';
import { EaseInOutContainer } from '../../../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { Button } from '../../../../../components/Button/Button';
import { Gap } from '../../../../../components/Gap/Gap';
import { Table } from '../../../../../components/Table/Table';
import { MatchStatus, SeasonStatus } from '../../../../../constants/enums';
import { useRouter } from '../../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { BreakPoints } from '../../../../../theme/theme';
import { MatchRow } from '../../../components/MatchRow/MatchRow';
import { ILadderTableRow, LADDER_COLUMNS } from '../../../types';
import { canUserManageMatch } from '../../../utils';

import { messages } from './messages';

import * as S from './SeasonPreview.style';

interface IProps {
  seasonDetail: ISeason;
}

export const SeasonPreview: React.FC<IProps> = (props) => {
  const { seasonDetail } = props;
  const { navigate } = useRouter();
  const { width } = useWindowDimensions();
  const isSmallerThanLg = width < BreakPoints.lg;
  const isSmallerThanMd = width < BreakPoints.md;

  const myTeams = useMeTeams(undefined, [401]);
  const seasonTeams = useSeasonTeams(seasonDetail.id, [401]);
  const ladder = useSeasonLadder(seasonDetail.id);
  const futureMatches = useSeasonMatchList(
    seasonDetail.id,
    {
      status: [MatchStatus.NEW, MatchStatus.ACCEPTED, MatchStatus.WAITING_FOR_SCORE_CONFIRMATION].join(','),
      limit: 5,
    },
    'always',
    0,
  );
  const finishedMatches = useSeasonMatchList(
    seasonDetail.id,
    {
      status: [MatchStatus.FINISHED].join(','),
      limit: 5,
    },
    'always',
    0,
  );

  const ladderTableData: ILadderTableRow[] =
    ladder.data?.items.map((item, index) => {
      return {
        id: item.team.id,
        position: index + 1,
        name: item.team.name,
        countOfMatches: item.countOfMatches,
        wins: item.wins,
        draws: item.draws,
        loses: item.loses,
        winRate: item.countOfMatches ? `${((100 / item.countOfMatches) * item.wins).toFixed(2)} %` : '0 %',
        eloPoints: item.eloPoints,
        seasonTeamId: item.id,
      };
    }) ?? [];

  const isPossibleToCreateMatch = canUserManageMatch(myTeams.data?.items ?? [], seasonTeams.data?.items ?? []);
  const noUpcomingMatches = futureMatches.data?.total === 0;
  const noFinishedMatches = finishedMatches.data?.total === 0;
  const isSeasonActive = seasonDetail.status === SeasonStatus.ACTIVE;

  return (
    <Flex vertical>
      <S.Matches>
        {isSeasonActive && (
          <>
            <Flex justify="center" vertical>
              <Typography.Title level={4} style={{ textAlign: isSmallerThanMd ? 'start' : 'center' }}>
                <FormattedMessage {...messages.openMatches} />
              </Typography.Title>
              {futureMatches.isLoading && <Spin size="large" />}
              <EaseInOutContainer isOpen={!futureMatches.isLoading}>
                <S.LastMatchesContainer>
                  {noUpcomingMatches && (
                    <S.NoMatches>
                      <FormattedMessage {...messages.noUpcomingMatches} />
                    </S.NoMatches>
                  )}
                  {!noUpcomingMatches &&
                    futureMatches.data?.matches.map((item: IMatchListItem) => {
                      return <MatchRow match={item} />;
                    })}
                </S.LastMatchesContainer>
              </EaseInOutContainer>
            </Flex>
            {isSmallerThanMd && (
              <>
                <Gap defaultHeight={16} />
                <S.Divider />
                <Gap defaultHeight={16} />
              </>
            )}
          </>
        )}
        <Flex justify="center" vertical>
          <Typography.Title level={4} style={{ textAlign: isSmallerThanMd ? 'start' : 'center' }}>
            <FormattedMessage {...messages.playedMatches} />
          </Typography.Title>
          {finishedMatches.isLoading && <Spin size="large" />}
          <EaseInOutContainer isOpen={!finishedMatches.isLoading}>
            {noFinishedMatches && (
              <S.NoMatches>
                <Gap defaultHeight={16} />
                <FrownOutlined />
                <Gap defaultHeight={16} />
                <FormattedMessage {...messages.noFinishedMatches} />
              </S.NoMatches>
            )}
            {!noFinishedMatches && (
              <>
                <S.LastMatchesContainer>
                  {finishedMatches.data?.matches?.map((item: IMatchListItem) => {
                    return <MatchRow match={item} />;
                  })}
                </S.LastMatchesContainer>
              </>
            )}
          </EaseInOutContainer>
        </Flex>
      </S.Matches>
      <Gap defaultHeight={32} />
      <Flex vertical align="flex-start">
        <Table
          columns={LADDER_COLUMNS(
            isSmallerThanLg,
            isPossibleToCreateMatch?.allowed,
            (id: string) => navigate(`${Routes.MATCH_CREATE.replace(':seasonId', seasonDetail?.id)}?opponentId=${id}`),
            isPossibleToCreateMatch?.myTeamId,
          )}
          onRow={(item) => {
            return {
              onClick: () => navigate(Routes.TEAM_DETAIL.replace(':id', item.id)),
              style: {
                cursor: 'pointer',
              },
            };
          }}
          data={ladderTableData}
          loading={ladder.isLoading}
          pagination={{ hideOnSinglePage: true, pageSize: 20 }}
          style={{ width: '100%' }}
        />
      </Flex>
      <Gap defaultHeight={16} />
      <Flex justify="flex-end">
        <Button onClick={() => navigate(Routes.SEASON_DETAIL.replace(':seasonId', seasonDetail.id))}>
          <FormattedMessage {...messages.goToDetail} />
        </Button>
      </Flex>
    </Flex>
  );
};
