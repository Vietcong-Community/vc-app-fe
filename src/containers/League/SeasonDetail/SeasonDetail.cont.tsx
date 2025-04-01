import React, { ReactNode, useEffect, useState } from 'react';

import { FrownOutlined } from '@ant-design/icons';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightToBracket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Space, Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import {
  useMapsInSeason,
  useSeasonLadder,
  useSeasonMatchList,
  useSeasonsDetail,
  useSeasonTeams,
} from '../../../api/hooks/league/api';
import { IMatchListItem } from '../../../api/hooks/league/interfaces';
import { useMeTeams } from '../../../api/hooks/teams/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Button } from '../../../components/Button/Button';
import { MainButtonVariant } from '../../../components/Button/enums';
import { Card } from '../../../components/Card/Card';
import { Divider } from '../../../components/Divider/Divider';
import { DEFAULT_USER_DATE_FORMAT } from '../../../components/Fields/DatePickerField/DatePickerField';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { LinkButton } from '../../../components/LinkButton/LinkButton';
import { Table } from '../../../components/Table/Table';
import { H1 } from '../../../components/Titles/H1/H1';
import { H2 } from '../../../components/Titles/H2/H2';
import { MatchStatus, Role, SeasonStatus } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../routes/enums';
import { BreakPoints } from '../../../theme/theme';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapSeasonStatusToTranslation } from '../../../utils/mappingLabelUtils';
import { removeURLParameter } from '../../../utils/urlUtils';
import { MatchRow } from '../components/MatchRow/MatchRow';
import { ILadderTableRow, LADDER_COLUMNS } from '../types';
import { canUserJoinSeasonWithTeam, canUserManageMatch } from '../utils';

import { AdminMenu } from './components/AdminMenu/AdminMenu';
import { AllMatches } from './components/AllMatches/AllMatches';
import { FutureMatches } from './components/FutureMatches/FutureMatches';
import { JoinSeasonModal } from './components/JoinSeasonModal/JoinSeasonModal';
import { MapListModal } from './components/MapListModal/MapListModal';
import { SeasonMapsPickerModal } from './components/SeasonMapsPickerModal/SeasonMapsPickerModal';
import { Statistics } from './components/Statistics/Statistics';
import { TopPlayersOfTheDay } from './components/TopPlayersOfTheDay/TopPlayersOfTheDay';
import { messages } from './messages';

import * as S from './SeasonDetail.style';

export const SeasonDetailCont: React.FC = () => {
  const { navigate, query } = useRouter<{ seasonId: string; scrollTo?: string }>();
  const { width } = useWindowDimensions();
  const { formatMessage } = useIntl();
  const isSmallerThanMd = width < BreakPoints.md;
  const [isMapListModalOpen, setIsMapListModalOpen] = useState<boolean>(false);
  const [isJoinSeasonModalOpen, setIsJoinSeasonModalOpen] = useState<boolean>(false);
  const [isSeasonMapsPickerModalOpen, setIsSeasonMapsPickerModalOpen] = useState<boolean>(false);

  const userMe = useUserMe('always', [401]);
  const myTeams = useMeTeams(undefined, [401], userMe.isSuccess);
  const season = useSeasonsDetail(query.seasonId);
  const seasonTeams = useSeasonTeams(query.seasonId, [401], 'always', userMe.isSuccess);
  const ladder = useSeasonLadder(query.seasonId);
  const maps = useMapsInSeason(query.seasonId);
  const finishedMatches = useSeasonMatchList(
    query.seasonId,
    {
      status: [MatchStatus.FINISHED].join(','),
      limit: 5,
    },
    'always',
    0,
  );

  const scrollToAllMatches = () => {
    const element = document.getElementById('all-matches');
    if (element) {
      const yOffset = -100;
      const y = element?.getBoundingClientRect().top + window.scrollY + yOffset;

      setTimeout(() => window.scrollTo({ top: y, behavior: 'smooth' }), 200);
    }
  };

  useEffect(() => {
    if (query.scrollTo && query.scrollTo === 'matches' && !season.isLoading) {
      scrollToAllMatches();
      navigate(removeURLParameter(window.location.search, 'scrollTo'), { replace: true });
    }
  }, [query.scrollTo, season.isLoading]);

  const ladderTableData: ILadderTableRow[] =
    ladder.data?.items?.map((item, index) => {
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

  const onMatchCreateClick = () => {
    navigate(Routes.MATCH_CREATE.replace(':seasonId', query.seasonId));
  };

  const userIsAdmin = !!userMe.data?.roles.includes(Role.ADMIN);
  const noFinishedMatches = finishedMatches.data?.total === 0;
  const isSeasonActive = season.data?.status === SeasonStatus.ACTIVE;
  const isPossibleToCreateMatch = canUserManageMatch(myTeams.data?.items ?? [], seasonTeams.data?.items ?? []);
  const teamsToJoinSeason = canUserJoinSeasonWithTeam(myTeams.data?.items ?? [], seasonTeams.data?.items ?? []);

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
      <Helmet
        title={`${formatMessage(messages.seasonDetailBreadcrumb)}${season.data?.name ? ` - ${season.data?.name}` : ''}`}
      />
      <EaseInOutContainer isOpen={!season.isLoading}>
        <Flex align="center" justify="space-between">
          <H1>{season.data?.name}</H1>
          <S.ActionButtons>
            {userIsAdmin && (
              <AdminMenu seasonId={query.seasonId} setOpenSeasonMapsModal={setIsSeasonMapsPickerModalOpen} />
            )}
            {teamsToJoinSeason.length > 0 && (
              <Button onClick={() => setIsJoinSeasonModalOpen(true)} style={{ padding: '0.25rem 1rem' }}>
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                <FormattedMessage {...messages.joinSeason} />
              </Button>
            )}
          </S.ActionButtons>
        </Flex>
        <Divider style={{ marginBottom: 16 }} />
        <Card style={{ flex: 0.5 }} bodyStyle={{ padding: '8px 24px' }}>
          <S.SeasonInfoContainer>
            <div>
              <S.InformationLabel>
                <FormattedMessage {...messages.seasonStatus} />
              </S.InformationLabel>
              : <S.InformationValue>{mapSeasonStatusToTranslation(season.data?.status)}</S.InformationValue>
            </div>
            <div>
              <S.InformationLabel>
                <FormattedMessage {...messages.seasonBeginDate} />
              </S.InformationLabel>
              :{' '}
              <S.InformationValue>
                {season.data?.startDate ? (
                  formatDateForUser(season.data.startDate, DEFAULT_USER_DATE_FORMAT)
                ) : (
                  <FormattedMessage {...messages.dateNotSpecified} />
                )}
              </S.InformationValue>
            </div>
            <div>
              <S.InformationLabel>
                <FormattedMessage {...messages.seasonEndDate} />
              </S.InformationLabel>
              :{' '}
              <S.InformationValue>
                {season.data?.endDate ? (
                  formatDateForUser(season.data.endDate, DEFAULT_USER_DATE_FORMAT)
                ) : (
                  <FormattedMessage {...messages.dateNotSpecified} />
                )}
              </S.InformationValue>
            </div>
          </S.SeasonInfoContainer>
        </Card>
        <Gap defaultHeight={16} />
        <TopPlayersOfTheDay seasonId={query.seasonId} />
        <Gap defaultHeight={16} />
        {isSeasonActive && (
          <S.Matches>
            <FutureMatches
              canCreateNewMatch={isPossibleToCreateMatch?.allowed && isSeasonActive}
              onMatchCreateClick={onMatchCreateClick}
              seasonId={query.seasonId}
            />
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
                    {isPossibleToCreateMatch?.allowed && isSeasonActive && (
                      <div>
                        <FormattedMessage
                          {...messages.createMatchLink}
                          values={{
                            b: (msg: ReactNode) => (
                              <b
                                onClick={onMatchCreateClick}
                                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                              >
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
                <Gap defaultHeight={24} />
                <Flex vertical align="flex-end">
                  <LinkButton onClick={scrollToAllMatches}>
                    <FormattedMessage {...messages.allMatches} />
                  </LinkButton>
                </Flex>
              </EaseInOutContainer>
            </Card>
          </S.Matches>
        )}
        <Gap defaultHeight={16} />
        <Flex justify="flex-end" style={{ gap: 8 }}>
          <Button onClick={() => setIsMapListModalOpen(true)} variant={MainButtonVariant.SECONDARY}>
            <FormattedMessage {...messages.openMapListModal} />
          </Button>
          {isPossibleToCreateMatch?.allowed && isSeasonActive && (
            <Button
              onClick={onMatchCreateClick}
              variant={MainButtonVariant.PRIMARY}
              style={{ color: 'white', fontWeight: 'bold' }}
            >
              <FormattedMessage {...messages.createMatch} />
            </Button>
          )}
        </Flex>
        <Divider style={{ margin: '16px 0' }} />
        <Flex vertical align="flex-start">
          <H2>
            <FormattedMessage {...messages.ladderTitle} />
          </H2>
          <Table
            columns={LADDER_COLUMNS(
              isSmallerThanMd,
              isPossibleToCreateMatch?.allowed && isSeasonActive,
              (id: string) => navigate(`${Routes.MATCH_CREATE.replace(':seasonId', query.seasonId)}?opponentId=${id}`),
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
        <Divider style={{ margin: '16px 0' }} />
        <AllMatches
          seasonLadder={ladder.data?.items ?? []}
          seasonMaps={maps.data?.items ?? []}
          seasonId={query.seasonId}
        />
        <Divider style={{ margin: '16px 0' }} />
        {!userIsAdmin && (
          <Flex vertical align="flex-start">
            <H2>
              <FormattedMessage {...messages.statisticsTitle} />
            </H2>
            <FormattedMessage {...messages.statisticsDescription} />
          </Flex>
        )}
        {userIsAdmin && <Statistics seasonId={query.seasonId} />}
      </EaseInOutContainer>
      <Gap defaultHeight={48} />
      <MapListModal
        closeModal={() => setIsMapListModalOpen(false)}
        isOpen={isMapListModalOpen}
        seasonId={query.seasonId}
      />
      <JoinSeasonModal
        closeModal={() => setIsJoinSeasonModalOpen(false)}
        isOpen={isJoinSeasonModalOpen}
        seasonId={query.seasonId}
        userTeams={teamsToJoinSeason}
      />
      <SeasonMapsPickerModal
        closeModal={() => setIsSeasonMapsPickerModalOpen(false)}
        isOpen={isSeasonMapsPickerModalOpen}
        seasonMaps={maps.data?.items ?? []}
        seasonId={query.seasonId}
      />
    </ContentLayout>
  );
};
