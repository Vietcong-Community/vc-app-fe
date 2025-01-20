import React from 'react';

import { Flex, Space, Table, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useSeasonLadder } from '../../../../../api/hooks/league/api';
import { IMatch, ISeason } from '../../../../../api/hooks/league/interfaces';
import { Button } from '../../../../../components/Button/Button';
import { Gap } from '../../../../../components/Gap/Gap';
import { MatchStatus, SeasonStatus } from '../../../../../constants/enums';
import { useRouter } from '../../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { BreakPoints } from '../../../../../theme/theme';
import { MatchRow } from '../../../components/MatchRow/MatchRow';
import { ILadderTableRow, LADDER_COLUMNS } from '../../../types';

import { messages } from './messages';

import * as S from './SeasonPreview.style';

interface IProps {
  leagueId: string;
  seasonDetail: ISeason;
}

export const SeasonPreview: React.FC<IProps> = (props) => {
  const { leagueId, seasonDetail } = props;
  const { navigate } = useRouter();
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const ladder = useSeasonLadder(leagueId, seasonDetail.id);

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
      };
    }) ?? [];

  const matches: IMatch[] = []; // TODO CONNECT TO MATCHES

  const upcomingMatches = matches?.filter((item) => item.status !== MatchStatus.FINISHED) ?? [];
  const finishedMatches = matches?.filter((item) => item.status === MatchStatus.FINISHED) ?? [];
  const firstFiveUpcomingMatches = upcomingMatches.slice(0, 5);
  const firstFiveFinishedMatches = finishedMatches.slice(0, 5);

  const noUpcomingMatches = upcomingMatches.length === 0;
  const noFinishedMatches = finishedMatches.length === 0;
  const isSeasonActive = seasonDetail.status === SeasonStatus.ACTIVE;

  return (
    <Flex vertical>
      <S.Matches>
        {isSeasonActive && (
          <Flex justify="center" vertical>
            <Typography.Title level={4} style={{ textAlign: isSmallerThanMd ? 'start' : 'center' }}>
              <FormattedMessage {...messages.openMatches} />
            </Typography.Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              {noUpcomingMatches && <>TODO OBRAZEK SMUTNY PRAZDNY</>}
              {!noUpcomingMatches &&
                firstFiveUpcomingMatches.map((item: IMatch) => {
                  return <MatchRow leagueId={leagueId} seasonId={seasonDetail.id} match={item} />;
                })}
            </Space>
          </Flex>
        )}
        <Flex justify="center" vertical>
          <Typography.Title level={4} style={{ textAlign: isSmallerThanMd ? 'start' : 'center' }}>
            <FormattedMessage {...messages.playedMatches} />
          </Typography.Title>
          {noFinishedMatches && <>TODO OBRAZEK SMUTNY PRAZDNY</>}
          {!noFinishedMatches && (
            <>
              <Space direction="vertical" style={{ width: '100%' }}>
                {firstFiveFinishedMatches.map((item: IMatch) => {
                  return <MatchRow leagueId={leagueId} seasonId={seasonDetail.id} match={item} />;
                })}
              </Space>
            </>
          )}
        </Flex>
      </S.Matches>
      <Gap defaultHeight={32} />
      <Flex vertical align="flex-start">
        <S.TableContainer>
          <Table<ILadderTableRow>
            columns={LADDER_COLUMNS(isSmallerThanMd)}
            dataSource={ladderTableData}
            onRow={(item) => {
              return {
                onClick: () => navigate(Routes.TEAM_DETAIL.replace(':id', item.id)),
                style: {
                  cursor: 'pointer',
                },
              };
            }}
            style={{ width: '100%' }}
          />
        </S.TableContainer>
      </Flex>
      <Gap defaultHeight={16} />
      <Flex justify="flex-end">
        <Button
          onClick={() =>
            navigate(Routes.SEASON_DETAIL.replace(':leagueId', leagueId).replace(':seasonId', seasonDetail.id))
          }
        >
          <FormattedMessage {...messages.goToDetail} />
        </Button>
      </Flex>
    </Flex>
  );
};
