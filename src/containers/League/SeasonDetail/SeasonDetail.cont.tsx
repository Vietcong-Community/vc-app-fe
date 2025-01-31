import React, { ReactNode, useState } from 'react';

import { FrownOutlined } from '@ant-design/icons';
import { Flex, Space, Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import { useSeasonLadder, useSeasonMatchList, useSeasonsDetail, useSeasonTeams } from '../../../api/hooks/league/api';
import { IMatchListItem } from '../../../api/hooks/league/interfaces';
import { useMeTeams } from '../../../api/hooks/teams/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Button } from '../../../components/Button/Button';
import { MainButtonVariant } from '../../../components/Button/enums';
import { Card } from '../../../components/Card/Card';
import { DEFAULT_USER_DATE_FORMAT } from '../../../components/Fields/DatePickerField/DatePickerField';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { Table } from '../../../components/Table/Table';
import { TableWithPagination } from '../../../components/TableWithPagination/Table';
import { H1 } from '../../../components/Titles/H1/H1';
import { H2 } from '../../../components/Titles/H2/H2';
import { MatchStatus, Role, SeasonStatus } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../routes/enums';
import { BreakPoints } from '../../../theme/theme';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapMatchStatusToTranslation, mapSeasonStatusToTranslation } from '../../../utils/mappingLabelUtils';
import { MatchRow } from '../components/MatchRow/MatchRow';
import { ILadderTableRow, IMatchesTableRow, LADDER_COLUMNS, MATCH_COLUMNS } from '../types';
import { canUserManageMatch } from '../utils';

import { AdminMenu } from './components/AdminMenu/AdminMenu';
import { messages } from './messages';

import * as S from './SeasonDetail.style';

export const SeasonDetailCont: React.FC = () => {
  const { navigate, query } = useRouter<{ seasonId: string }>();
  const { width } = useWindowDimensions();
  const { formatMessage } = useIntl();
  const [selectedMatchPage, setSelectedMatchPage] = useState<number>(1);
  const isSmallerThanMd = width < BreakPoints.md;

  const userMe = useUserMe('always', [401]);
  const myTeams = useMeTeams(undefined, [401]);
  const season = useSeasonsDetail(query.seasonId);
  const seasonTeams = useSeasonTeams(query.seasonId, [401]);
  const ladder = useSeasonLadder(query.seasonId);
  const matches = useSeasonMatchList(query.seasonId, { page: selectedMatchPage, limit: 10 });
  const futureMatches = useSeasonMatchList(query.seasonId, {
    status: [MatchStatus.NEW, MatchStatus.ACCEPTED, MatchStatus.WAITING_FOR_SCORE_CONFIRMATION].join(','),
    limit: 5,
  });
  const finishedMatches = useSeasonMatchList(query.seasonId, {
    status: [MatchStatus.FINISHED].join(','),
    limit: 5,
  });

  const sortedMatches =
    ladder.data?.items.sort((a, b) => {
      const aWinRate = a.countOfMatches ? (100 / a.countOfMatches) * a.wins : 0;
      const bWinRate = b.countOfMatches ? (100 / b.countOfMatches) * b.wins : 0;

      return bWinRate - aWinRate;
    }) ?? [];

  const ladderTableData: ILadderTableRow[] =
    sortedMatches.map((item, index) => {
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

  const userIsAdmin = !!userMe.data?.roles.includes(Role.ADMIN);
  const noUpcomingMatches = futureMatches.data?.total === 0;
  const noFinishedMatches = finishedMatches.data?.total === 0;
  const isSeasonActive = season.data?.status === SeasonStatus.ACTIVE;
  const isPossibleToCreateMatch = canUserManageMatch(myTeams.data?.items ?? [], seasonTeams.data?.items ?? []);

  const onMatchPageChange = (pageNumber: number) => setSelectedMatchPage(pageNumber);

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
      <Helmet title={`${formatMessage(messages.seasonDetailBreadcrumb)} - ${season.data?.name}`} />
      <EaseInOutContainer isOpen={!season.isLoading}>
        <Flex align="center" justify="space-between">
          <H1>{season.data?.name}</H1>
          {userIsAdmin && <AdminMenu seasonId={query.seasonId} />}
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
                  formatDateForUser(season.data.startDate, DEFAULT_USER_DATE_FORMAT)
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
                  formatDateForUser(season.data.endDate, DEFAULT_USER_DATE_FORMAT)
                ) : (
                  <FormattedMessage {...messages.dateNotSpecified} />
                )}
              </S.InformationValue>
            </Flex>
          </Card>
          {isSeasonActive && (
            <Card style={{ flex: 1 }}>
              {futureMatches.isLoading && <Spin size="large" />}
              <EaseInOutContainer isOpen={!futureMatches.isLoading}>
                <S.CardTitle>
                  <FormattedMessage {...messages.upcomingMatches} />
                </S.CardTitle>
                {noUpcomingMatches && <FormattedMessage {...messages.noUpcomingMatches} />}
                {noUpcomingMatches && isPossibleToCreateMatch?.allowed && (
                  <>
                    <br />
                    <FormattedMessage
                      {...messages.createMatchLink}
                      values={{
                        b: (msg: ReactNode) => (
                          <b onClick={onMatchCreateClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                            {msg}
                          </b>
                        ),
                      }}
                    />
                  </>
                )}
                <Space direction="vertical" style={{ width: '100%' }}>
                  {!noUpcomingMatches &&
                    futureMatches.data?.matches.map((item: IMatchListItem) => {
                      return <MatchRow match={item} />;
                    })}
                </Space>
              </EaseInOutContainer>
            </Card>
          )}
          <Card style={{ flex: 1 }}>
            {finishedMatches.isLoading && <Spin size="large" />}
            <EaseInOutContainer isOpen={!finishedMatches.isLoading}>
              <S.CardTitle>
                <FormattedMessage {...messages.finishedMatches} />
              </S.CardTitle>
              {noFinishedMatches && (
                <S.NoFinishedMatches>
                  <Gap defaultHeight={16} />
                  <FrownOutlined />
                  <Gap defaultHeight={16} />
                  <FormattedMessage {...messages.noFinishedMatches} />
                  <Gap defaultHeight={8} />
                  {isPossibleToCreateMatch?.allowed && (
                    <div>
                      <FormattedMessage
                        {...messages.createMatchLink}
                        values={{
                          b: (msg: ReactNode) => (
                            <b onClick={onMatchCreateClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                              {msg}
                            </b>
                          ),
                        }}
                      />
                    </div>
                  )}
                </S.NoFinishedMatches>
              )}
              {!noFinishedMatches && (
                <>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {finishedMatches.data?.matches.map((item: IMatchListItem) => {
                      return <MatchRow match={item} />;
                    })}
                  </Space>
                </>
              )}
            </EaseInOutContainer>
          </Card>
        </S.Matches>
        <Gap defaultHeight={16} />
        <EaseInOutContainer isOpen={isSeasonActive && isPossibleToCreateMatch?.allowed}>
          <Flex justify="flex-end">
            <Button
              onClick={onMatchCreateClick}
              variant={MainButtonVariant.PRIMARY}
              style={{ color: 'white', fontWeight: 'bold' }}
            >
              <FormattedMessage {...messages.createMatch} />
            </Button>
          </Flex>
        </EaseInOutContainer>
        <S.Divider />
        <Flex vertical align="flex-start">
          <H2>
            <FormattedMessage {...messages.ladderTitle} />
          </H2>
          <Table
            columns={LADDER_COLUMNS(
              isSmallerThanMd,
              isPossibleToCreateMatch?.allowed,
              (id: string) => navigate(`${Routes.MATCH_CREATE.replace(':seasonId', query.seasonId)}?opponentId=${id}`),
              (id: string) => navigate(Routes.TEAM_DETAIL.replace(':id', id)),
              isPossibleToCreateMatch?.myTeamId,
            )}
            data={ladderTableData}
            loading={ladder.isLoading}
            pagination={{ hideOnSinglePage: true, pageSize: 20 }}
            style={{ width: '100%' }}
          />
        </Flex>
        <S.Divider />
        <Flex vertical align="flex-start">
          <H2>
            <FormattedMessage {...messages.allMatchesTitle} />
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
          <S.Divider />
          <Flex vertical align="flex-start">
            <H2>
              <FormattedMessage {...messages.statisticsTitle} />
            </H2>
            <FormattedMessage {...messages.statisticsDescription} />
          </Flex>
        </Flex>
      </EaseInOutContainer>
      <Gap defaultHeight={48} />
    </ContentLayout>
  );
};
