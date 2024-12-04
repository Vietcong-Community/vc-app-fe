import React, { ReactNode } from 'react';

import { Divider, Flex, Space, Table } from 'antd';
import { FormattedMessage } from 'react-intl';

import { IMixedMatch, MixedMatchStatus, SeasonStatus } from '../../../api/hooks/mixedLeague/interfaces';
import { useMatchesBySeason, useSeasonDetail } from '../../../api/hooks/mixedLeague/seasons/api';
import { Button } from '../../../components/Button/Button';
import { Card } from '../../../components/Card/Card';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { H2 } from '../../../components/Titles/H2/H2';
import { useRouter } from '../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../routes/enums';
import { BreakPoints } from '../../../theme/theme';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapMatchStatusToTranslation, mapSeasonStatusToTranslation } from '../../../utils/mappingLabelUtils';
import { MatchRow } from '../components/MatchRow/MatchRow';
import { players } from '../mock';
import { IMixedMatchesTable, IPlayersTable, MATCH_COLUMNS, PLAYERS_COLUMNS } from '../types';

import { ManageMenu } from './components/ManageMenu/ManageMenu';
import { messages } from './messages';

import * as S from './SeasonDetail.style';

export const SeasonDetailCont: React.FC = () => {
  const { navigate, query } = useRouter<{ id: string }>();
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const season = useSeasonDetail(query.id);
  const matches = useMatchesBySeason(query.id);

  const playersTableData =
    players.map((item, index) => {
      return { ...item, order: index + 1, ratio: Number((item.kills / item.deaths).toFixed(2)) };
    }) ?? [];

  const allMatchesTableData =
    matches.data?.map((item) => {
      return {
        id: item.id,
        date: formatDateForUser(item.date) ?? '',
        status: mapMatchStatusToTranslation(item.status),
        firstCaptain: item.firstCaptain?.nickname ?? '-',
        secondCaptain: item.secondCaptain?.nickname ?? '-',
        result:
          item.status !== MixedMatchStatus.NEW && item.status !== MixedMatchStatus.READY
            ? `${item.firstTeamScore} - ${item.secondTeamScore}`
            : '? - ?',
      };
    }) ?? [];

  const onMatchCreateClick = () => navigate(Routes.MIXED_MATCH_CREATE.replace(':id', query.id));

  const upcomingMatches = matches.data?.filter((item) => item.status !== MixedMatchStatus.FINISHED) ?? [];
  const finishedMatches = matches.data?.filter((item) => item.status === MixedMatchStatus.FINISHED) ?? [];
  const firstFiveUpcomingMatches = upcomingMatches.slice(0, 5);
  const firstFiveFinishedMatches = finishedMatches.slice(0, 5);

  const noUpcomingMatches = upcomingMatches.length === 0;
  const noFinishedMatches = finishedMatches.length === 0;
  const isSeasonActive = season.data?.status === SeasonStatus.ACTIVE;

  return (
    <ContentLayout>
      <Flex align="center" justify="space-between">
        <H1>{season.data?.name}</H1>
        <ManageMenu />
      </Flex>
      <Divider style={{ marginTop: 0 }} />
      <S.Matches>
        <Card style={{ flex: 0.5 }}>
          <S.CardTitle>
            <FormattedMessage {...messages.seasonInformationTitle} />
          </S.CardTitle>
          <Flex vertical align="flex-start">
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
            {noUpcomingMatches && (
              <FormattedMessage
                {...messages.noUpcomingMatches}
                values={{
                  b: (msg: ReactNode) => (
                    <b onClick={onMatchCreateClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                      {msg}
                    </b>
                  ),
                }}
              />
            )}
            <Space direction="vertical" style={{ width: '100%' }}>
              {!noUpcomingMatches &&
                firstFiveUpcomingMatches.map((item: IMixedMatch) => {
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
                {firstFiveFinishedMatches.map((item: IMixedMatch) => {
                  return <MatchRow match={item} />;
                })}
              </Space>
            </>
          )}
        </Card>
      </S.Matches>
      <br />
      {isSeasonActive && (
        <Flex justify="flex-end">
          <Button onClick={onMatchCreateClick}>
            <FormattedMessage {...messages.createMatch} />
          </Button>
        </Flex>
      )}
      <Divider style={{ marginBottom: 0 }} />
      <Flex vertical align="flex-start">
        <H2>
          <FormattedMessage {...messages.playersRankingTitle} />
        </H2>
        <Table<IPlayersTable>
          columns={PLAYERS_COLUMNS(isSmallerThanMd)}
          dataSource={playersTableData as unknown as IPlayersTable[]}
          pagination={false}
          style={{ width: '100%' }}
        />
      </Flex>
      <Divider style={{ marginBottom: 0 }} />
      <Flex vertical align="flex-start">
        <H2>
          <FormattedMessage {...messages.allMatchesTitle} />
        </H2>
        <Table<IMixedMatchesTable>
          columns={MATCH_COLUMNS(isSmallerThanMd)}
          dataSource={allMatchesTableData}
          onRow={(item) => {
            return {
              onClick: () => navigate(Routes.MIXED_MATCH_DETAIL.replace(':id', item.id)),
              style: {
                cursor: 'pointer',
              },
            };
          }}
          style={{ width: '100%' }}
        />
      </Flex>
    </ContentLayout>
  );
};
