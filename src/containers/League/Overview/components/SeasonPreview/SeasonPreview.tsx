import React from 'react';

import { Flex, Table, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useSeasonLadder, useSeasonMatchList } from '../../../../../api/hooks/league/api';
import { IMatchListItem, ISeason } from '../../../../../api/hooks/league/interfaces';
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
  seasonDetail: ISeason;
}

export const SeasonPreview: React.FC<IProps> = (props) => {
  const { seasonDetail } = props;
  const { navigate } = useRouter();
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const ladder = useSeasonLadder(seasonDetail.id);
  const futureMatches = useSeasonMatchList(seasonDetail.id, {
    status: [MatchStatus.NEW, MatchStatus.ACCEPTED].join(','),
    limit: 5,
  });
  const finishedMatches = useSeasonMatchList(seasonDetail.id, {
    status: [MatchStatus.FINISHED, MatchStatus.WAITING_FOR_SCORE_CONFIRMATION].join(','),
    limit: 5,
  });

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

  const noUpcomingMatches = futureMatches.data?.total === 0;
  const noFinishedMatches = finishedMatches.data?.total === 0;
  const isSeasonActive = seasonDetail.status === SeasonStatus.ACTIVE;

  return (
    <Flex vertical>
      <S.Matches>
        {isSeasonActive && (
          <Flex justify="center" vertical>
            <Typography.Title level={4} style={{ textAlign: isSmallerThanMd ? 'start' : 'center' }}>
              <FormattedMessage {...messages.openMatches} />
            </Typography.Title>
            <S.LastMatchesContainer>
              {noUpcomingMatches && <>TODO OBRAZEK SMUTNY PRAZDNY</>}
              {!noUpcomingMatches &&
                futureMatches.data?.matches.map((item: IMatchListItem) => {
                  return <MatchRow match={item} />;
                })}
            </S.LastMatchesContainer>
          </Flex>
        )}
        <Flex justify="center" vertical>
          <Typography.Title level={4} style={{ textAlign: isSmallerThanMd ? 'start' : 'center' }}>
            <FormattedMessage {...messages.playedMatches} />
          </Typography.Title>
          {noFinishedMatches && <>TODO OBRAZEK SMUTNY PRAZDNY</>}
          {!noFinishedMatches && (
            <>
              <S.LastMatchesContainer>
                {finishedMatches.data?.matches?.map((item: IMatchListItem) => {
                  return <MatchRow match={item} />;
                })}
              </S.LastMatchesContainer>
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
            pagination={{ hideOnSinglePage: true, pageSize: 20 }}
            style={{ width: '100%' }}
          />
        </S.TableContainer>
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
