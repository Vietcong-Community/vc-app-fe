import React from 'react';

import { Flex, Space, Table } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useSeasonLadder, useSeasonMatchList, useSeasonsDetail } from '../../../api/hooks/league/api';
import { IMatchListItem } from '../../../api/hooks/league/interfaces';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Button } from '../../../components/Button/Button';
import { MainButtonVariant } from '../../../components/Button/enums';
import { Card } from '../../../components/Card/Card';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { H2 } from '../../../components/Titles/H2/H2';
import { MatchStatus, SeasonStatus } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../routes/enums';
import { BreakPoints } from '../../../theme/theme';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapMatchStatusToTranslation, mapSeasonStatusToTranslation } from '../../../utils/mappingLabelUtils';
import { MatchRow } from '../components/MatchRow/MatchRow';
import { ILadderTableRow, IMatchesTableRow, LADDER_COLUMNS, MATCH_COLUMNS } from '../types';

import { messages } from './messages';

import * as S from './SeasonDetail.style';

export const SeasonDetailCont: React.FC = () => {
  const { navigate, query } = useRouter<{ seasonId: string }>();
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const season = useSeasonsDetail(query.seasonId);
  const ladder = useSeasonLadder(query.seasonId);
  const matches = useSeasonMatchList(query.seasonId);
  const futureMatches = useSeasonMatchList(query.seasonId, {
    status: [MatchStatus.NEW, MatchStatus.ACCEPTED].join(','),
    limit: 5,
  });
  const finishedMatches = useSeasonMatchList(query.seasonId, {
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
        result:
          item.status === MatchStatus.FINISHED || item.status === MatchStatus.WAITING_FOR_SCORE_CONFIRMATION
            ? `${item.challengerScore} - ${item.opponentScore}`
            : '? - ?',
      };
    }) ?? [];

  const onMatchCreateClick = () => {
    navigate(Routes.MATCH_CREATE.replace(':seasonId', query.seasonId));
  };

  const noUpcomingMatches = futureMatches.data?.total === 0;
  const noFinishedMatches = finishedMatches.data?.total === 0;
  const isSeasonActive = season.data?.status === SeasonStatus.ACTIVE; // TODO AND USER HAVE AUTHORITY

  return (
    <ContentLayout
      breadcrumbItems={[
        {
          key: 'bc-league',
          onClick: () => navigate(Routes.LEAGUE),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.leaguesBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-season',
          title: <FormattedMessage {...messages.seasonDetailBreadcrumb} />,
        },
      ]}
    >
      <Flex align="center" justify="space-between">
        <H1>{season.data?.name}</H1>
      </Flex>
      <S.Divider style={{ marginTop: 0 }} />
      <S.Matches>
        <Card style={{ flex: 0.5 }}>
          <S.CardTitle>
            <FormattedMessage {...messages.seasonInformationTitle} />
          </S.CardTitle>
          <Flex vertical align="flex-start" style={{ textAlign: 'start' }}>
            <S.InformationLabel>
              <FormattedMessage {...messages.seasonStatus} />
            </S.InformationLabel>
            <S.InformationValue>{mapSeasonStatusToTranslation(season.data?.status)}</S.InformationValue>
            <br />
            <S.InformationLabel>
              <FormattedMessage {...messages.seasonBeginDate} />
            </S.InformationLabel>
            <S.InformationValue>
              {season.data?.startDate ? (
                formatDateForUser(season.data.startDate)
              ) : (
                <FormattedMessage {...messages.dateNotSpecified} />
              )}
            </S.InformationValue>
            <br />
            <S.InformationLabel>
              <FormattedMessage {...messages.seasonEndDate} />
            </S.InformationLabel>
            <S.InformationValue>
              {season.data?.endDate ? (
                formatDateForUser(season.data.endDate)
              ) : (
                <FormattedMessage {...messages.dateNotSpecified} />
              )}
            </S.InformationValue>
          </Flex>
        </Card>
        {isSeasonActive && (
          <Card style={{ flex: 1 }}>
            <S.CardTitle>
              <FormattedMessage {...messages.upcomingMatches} />
            </S.CardTitle>
            {noUpcomingMatches && <FormattedMessage {...messages.noUpcomingMatches} />}
            {noUpcomingMatches && (
              <>
                <br />
                TODO MATCH ORGA LINK NA MATCH
              </>
            )}
            <Space direction="vertical" style={{ width: '100%' }}>
              {!noUpcomingMatches &&
                futureMatches.data?.matches.map((item: IMatchListItem) => {
                  return <MatchRow match={item} />;
                })}
            </Space>
          </Card>
        )}
        <Card style={{ flex: 1 }}>
          <S.CardTitle>
            <FormattedMessage {...messages.finishedMatches} />
          </S.CardTitle>
          {noFinishedMatches && <>TODO OBRAZEK SMUTNY PRAZDNY</>}
          {!noFinishedMatches && (
            <>
              <Space direction="vertical" style={{ width: '100%' }}>
                {finishedMatches.data?.matches.map((item: IMatchListItem) => {
                  return <MatchRow match={item} />;
                })}
              </Space>
            </>
          )}
        </Card>
      </S.Matches>
      <Gap defaultHeight={16} />
      {isSeasonActive && (
        <Flex justify="flex-end">
          <Button
            onClick={onMatchCreateClick}
            variant={MainButtonVariant.PRIMARY}
            style={{ color: 'white', fontWeight: 'bold' }}
          >
            <FormattedMessage {...messages.createMatch} />
          </Button>
        </Flex>
      )}
      <S.Divider />
      <Flex vertical align="flex-start">
        <H2>
          <FormattedMessage {...messages.ladderTitle} />
        </H2>
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
      <S.Divider />
      <Flex vertical align="flex-start">
        <H2>
          <FormattedMessage {...messages.allMatchesTitle} />
        </H2>
        <S.TableContainer>
          <Table<IMatchesTableRow>
            columns={MATCH_COLUMNS(isSmallerThanMd)}
            dataSource={allMatchesTableData}
            onRow={(item) => {
              const onClick = () => navigate(Routes.MATCH_DETAIL.replace(':matchId', item.id));

              return {
                onClick,
                style: {
                  cursor: 'pointer',
                },
              };
            }}
            style={{ width: '100%' }}
          />
        </S.TableContainer>
        <S.Divider />
        <Flex vertical align="flex-start">
          <H2>
            <FormattedMessage {...messages.statisticsTitle} />
          </H2>
          <FormattedMessage {...messages.statisticsDescription} />
        </Flex>
      </Flex>
      <Gap defaultHeight={48} />
    </ContentLayout>
  );
};
