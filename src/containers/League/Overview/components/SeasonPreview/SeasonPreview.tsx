import React from 'react';

import { FrownOutlined } from '@ant-design/icons';
import { Flex, Space, Spin } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useSeasonLadder, useSeasonMatchList, useSeasonTeams } from '../../../../../api/hooks/league/api';
import { IMatchListItem, ISeason } from '../../../../../api/hooks/league/interfaces';
import { useMeTeams } from '../../../../../api/hooks/teams/api';
import { EaseInOutContainer } from '../../../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { Button } from '../../../../../components/Button/Button';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { LinkButton } from '../../../../../components/LinkButton/LinkButton';
import { ILadderTableRow, LADDER_COLUMNS } from '../../../../../components/Season/AllMatches/types';
import { MatchRow } from '../../../../../components/Season/MatchRow/MatchRow';
import { Table } from '../../../../../components/Table/Table';
import { MatchStatus, SeasonStatus } from '../../../../../constants/enums';
import { useRouter } from '../../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { BreakPoints } from '../../../../../theme/theme';
import { canUserManageMatch } from '../../../../../utils/matchUtils';
import { FutureMatches } from '../../../SeasonDetail/components/FutureMatches/FutureMatches';

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

  const myTeams = useMeTeams(undefined, [401]);
  const seasonTeams = useSeasonTeams(seasonDetail.id, [401]);
  const ladder = useSeasonLadder(seasonDetail.id);
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
        eloPoints: item.eloPoints,
        seasonTeamId: item.id,
      };
    }) ?? [];

  const isSeasonActive = seasonDetail.status === SeasonStatus.ACTIVE;
  const isPossibleToCreateMatch = canUserManageMatch(myTeams.data?.items ?? [], seasonTeams.data?.items ?? []);
  const noFinishedMatches = finishedMatches.data?.total === 0;

  return (
    <Flex vertical>
      <S.Matches>
        {isSeasonActive && (
          <Flex justify="center" vertical>
            <FutureMatches canCreateNewMatch={false} seasonId={seasonDetail.id} />
          </Flex>
        )}
        <Flex justify="center" vertical>
          <Card style={{ flex: 1 }}>
            {finishedMatches.isLoading && <Spin size="large" style={{ margin: 'auto', width: '100%' }} />}
            <EaseInOutContainer isOpen={!finishedMatches.isLoading}>
              <S.CardTitle>
                <FormattedMessage {...messages.playedMatches} />
              </S.CardTitle>
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
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {finishedMatches.data?.matches.map((item: IMatchListItem) => {
                      return <MatchRow key={item.id} match={item} />;
                    })}
                  </Space>
                </>
              )}
              <Gap defaultHeight={24} />
              <Flex vertical align="flex-end">
                <LinkButton
                  onClick={() =>
                    navigate(`${Routes.SEASON_DETAIL.replace(':seasonId', seasonDetail.id)}?scrollTo=matches`)
                  }
                >
                  <FormattedMessage {...messages.allMatches} />
                </LinkButton>
              </Flex>
            </EaseInOutContainer>
          </Card>
        </Flex>
      </S.Matches>
      <Gap defaultHeight={16} />
      <Flex justify="flex-end">
        <Button onClick={() => navigate(Routes.SEASON_DETAIL.replace(':seasonId', seasonDetail.id))}>
          <FormattedMessage {...messages.goToDetail} />
        </Button>
      </Flex>
      <Gap defaultHeight={32} />
      <Flex vertical align="flex-start">
        <Table
          columns={LADDER_COLUMNS(
            isSmallerThanLg,
            isPossibleToCreateMatch?.allowed && isSeasonActive,
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
