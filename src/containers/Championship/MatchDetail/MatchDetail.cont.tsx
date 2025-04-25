import React, { useEffect, useMemo, useState } from 'react';

import { Divider, Flex, Spin } from 'antd';
import { compact, some } from 'lodash';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import { useMatchDetail, useSeasonLadder, useSeasonTeams } from '../../../api/hooks/league/api';
import { IMatchRound } from '../../../api/hooks/league/interfaces';
import { useMeTeams } from '../../../api/hooks/teams/api';
import { Alert } from '../../../components/Alert/Alert';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Card } from '../../../components/Card/Card';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { Comments } from '../../../components/Match/Comments/Comments';
import { FilesForMatchScore } from '../../../components/Match/FilesForMatchScore/FilesForMatchScore';
import { Rounds } from '../../../components/Match/Rounds/Rounds';
import { Team } from '../../../components/Match/Team/Team';
import { AddPlayerToMatchModal } from '../../../components/Modals/AddPlayerToMatchModal/AddPlayerToMatchModal';
import { CreateRoundModal } from '../../../components/Modals/CreateRoundModal/CreateMatchModal';
import { SortRoundsModal } from '../../../components/Modals/SortRoundsModal/SortRoundsModal';
import { UpdateMatchModal } from '../../../components/Modals/UpdateMatchModal/UpdateMatchModal';
import { H1 } from '../../../components/Titles/H1/H1';
import { UNSET_MAP_NAME } from '../../../constants/constants';
import { MatchStatus, MatchType, Role, SeasonType } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapMatchStatusToTranslation } from '../../../utils/mappingLabelUtils';
import { canUserManageMatch } from '../../../utils/matchUtils';

import { ManageMenu } from './components/ManageMenu/ManageMenu';
import { messages } from './messages';

import * as S from './MatchDetail.style';

export const ChampionshipMatchDetailCont: React.FC = () => {
  const { navigate, query } = useRouter<{ matchId: string }>();
  const [isAddPlayerToMatchModalOpen, setIsAddPlayerToMatchModalOpen] = useState<boolean>(false);
  const [isCreateRoundModalOpen, setIsCreateRoundModalOpen] = useState<boolean>(false);
  const [isSortRoundsModalOpen, setIsSortRoundsModalOpen] = useState<boolean>(false);
  const [isUpdateMatchModalOpen, setIsUpdateMatchModalOpen] = useState<boolean>(false);
  const { formatMessage } = useIntl();

  const matchDetail = useMatchDetail(query.matchId);

  const matchIsNotFinished = !!matchDetail.data?.status && matchDetail.data.status !== MatchStatus.FINISHED;
  const userMe = useUserMe('always', [401], matchIsNotFinished);
  const myTeams = useMeTeams(undefined, [401], matchIsNotFinished);
  const seasonTeams = useSeasonTeams(matchDetail.data?.season?.id ?? '', [401], 'always', matchIsNotFinished);
  const ladder = useSeasonLadder(matchDetail.data?.season?.id);

  const showLoading = matchDetail.isLoading;
  const userIsStatisticsAdmin = !!userMe.data?.roles.includes(Role.STATS_ADMIN);
  const userIsAdmin = !!userMe.data?.roles.includes(Role.ADMIN);

  const scoreExists = [
    MatchStatus.FINISHED,
    MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
    MatchStatus.CONFIRMED_SCORE_BY_SYSTEM,
  ].includes(matchDetail.data?.status as MatchStatus);
  const isPossibleToManageMatch = useMemo(() => {
    return canUserManageMatch(
      myTeams.data?.items ?? [],
      seasonTeams.data?.items ?? [],
      matchDetail.data?.challenger.team?.id,
      matchDetail.data?.opponent?.team?.id,
    );
  }, [
    !!myTeams?.data?.items,
    !!seasonTeams?.data?.items,
    matchDetail.data?.challenger.team?.id,
    matchDetail.data?.opponent.team?.id,
  ]);

  useEffect(() => {
    if (matchDetail.data?.season.type && matchDetail.data?.season.type !== SeasonType.TOURNAMENT) {
      navigate(Routes.MATCH_DETAIL.replace(':matchId', query.matchId));
    }
  }, [matchDetail.data?.season.type]);

  const goToTeamDetail = (id: string) => {
    navigate(Routes.TEAM_DETAIL.replace(':id', id));
  };

  const goToPlayerDetail = (id: string) => {
    navigate(Routes.USER_PROFILE.replace(':id', id));
  };

  const showUploadRoundImagesAlert =
    matchDetail.data?.status === MatchStatus.WAITING_FOR_SCORE_CONFIRMATION &&
    some(matchDetail.data?.rounds ?? [], (item: IMatchRound) => !item.screenshot && !item.scoreFile);
  const showFilesForMatchScore =
    userIsAdmin &&
    [MatchStatus.ACCEPTED, MatchStatus.CONFIRMED_SCORE_BY_SYSTEM, MatchStatus.WAITING_FOR_SCORE_CONFIRMATION].includes(
      matchDetail.data?.status as MatchStatus,
    );

  const showLineUp = [
    MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
    MatchStatus.FINISHED,
    MatchStatus.CONFIRMED_SCORE_BY_SYSTEM,
  ].includes(matchDetail.data?.status as MatchStatus);
  const matchMaps = compact([matchDetail.data?.challengerMap, matchDetail.data?.opponentMap]);

  const showMapLabel = matchDetail.data?.challengerMap?.name !== UNSET_MAP_NAME;

  const getMatchTypeTitle = () => {
    if (matchDetail.data?.type === MatchType.GROUP) {
      return <FormattedMessage {...messages.groupRound} values={{ value: matchDetail.data?.round ?? '' }} />;
    }

    if (matchDetail.data?.type === MatchType.PLAYOFF_FINAL) {
      return <FormattedMessage {...messages.playOffFinal} />;
    }

    if (matchDetail.data?.type === MatchType.PLAYOFF_SMALL_FINAL) {
      return <FormattedMessage {...messages.playOffSmallFinal} />;
    }

    if (matchDetail.data?.type === MatchType.PLAYOFF && matchDetail.data?.round === 1) {
      return <FormattedMessage {...messages.preRound} />;
    }

    if (matchDetail.data?.type === MatchType.PLAYOFF && matchDetail.data?.round === 2) {
      return <FormattedMessage {...messages.quarterFinal} />;
    }

    if (matchDetail.data?.type === MatchType.PLAYOFF && matchDetail.data?.round === 3) {
      return <FormattedMessage {...messages.semifinal} />;
    }
  };

  const challengerTeamIsUnknown = !ladder.data?.items?.find((item) => item.id === matchDetail.data?.challenger?.id);
  const opponentTeamIsUnknown = !ladder.data?.items?.find((item) => item.id === matchDetail.data?.challenger?.id);

  return (
    <ContentLayout
      breadcrumbItems={[
        {
          key: 'bc-league',
          onClick: () => navigate(Routes.CHAMPIONSHIP),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.overviewBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-season',
          onClick: () => navigate(Routes.CHAMPIONSHIP_DETAIL.replace(':id', matchDetail.data?.season.id ?? '')),
          title: (
            <BreadcrumbItem>
              {matchDetail.data?.season?.name ?? <FormattedMessage {...messages.championshipDetailBreadcrumb} />}
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-match',
          title: <FormattedMessage {...messages.matchBreadcrumb} />,
        },
      ]}
    >
      <Helmet title={formatMessage(messages.title)} />
      <Flex align="center" justify="space-between">
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
        {(isPossibleToManageMatch?.allowed || userIsAdmin || userIsStatisticsAdmin) && (
          <ManageMenu
            canEnterResult={isPossibleToManageMatch?.allowed}
            canConfirmResult={isPossibleToManageMatch?.allowed && !showUploadRoundImagesAlert}
            canMapPick={[MatchType.PLAYOFF, MatchType.PLAYOFF_SMALL_FINAL, MatchType.PLAYOFF_FINAL].includes(
              matchDetail.data?.type as MatchType,
            )}
            matchId={query.matchId}
            seasonId={matchDetail.data?.season?.id}
            setIsAddPlayerToMatchModalOpen={setIsAddPlayerToMatchModalOpen}
            setIsCreateRoundModalOpen={setIsCreateRoundModalOpen}
            setIsSortRoundsModalOpen={setIsSortRoundsModalOpen}
            setIsUpdateMatchModalOpen={setIsUpdateMatchModalOpen}
            startDate={matchDetail.data?.startDate}
            status={matchDetail.data?.status}
            userIsAdmin={userIsAdmin}
            userIsStatisticsAdmin={userIsStatisticsAdmin}
          />
        )}
      </Flex>
      <Divider style={{ marginTop: 0 }} />
      {showLoading && <Spin size="large" />}
      <EaseInOutContainer isOpen={!showLoading}>
        {showUploadRoundImagesAlert && (
          <>
            <Alert
              title={formatMessage(messages.uploadScreensForAllRoundsAlert)}
              type="info"
              showIcon
              style={{ textAlign: 'start' }}
            />
            <Gap defaultHeight={16} />
          </>
        )}
        <S.MatchInformationContainer>
          <S.ContentContainer>
            <Card>
              <Flex justify="space-between">
                <div style={{ flex: 1, textAlign: 'start' }}>
                  <S.InformationLabel>
                    <FormattedMessage {...messages.date} />
                  </S.InformationLabel>
                  <br />
                  <S.InformationValue>{formatDateForUser(matchDetail.data?.startDate)}</S.InformationValue>
                </div>
                <S.MiddleContent>
                  {getMatchTypeTitle()}
                  {showMapLabel && <S.InformationValue>{matchDetail.data?.challengerMap?.name}</S.InformationValue>}
                  <S.DesktopScore>
                    {scoreExists ? (
                      <>{`${matchDetail.data?.challengerScore ?? '?'} : ${matchDetail.data?.opponentScore ?? '?'}`}</>
                    ) : (
                      '? : ?'
                    )}
                  </S.DesktopScore>
                </S.MiddleContent>
                <div style={{ flex: 1, textAlign: 'end' }}>
                  <S.InformationLabel>
                    <FormattedMessage {...messages.status} />
                  </S.InformationLabel>
                  <br />
                  <S.InformationValue>{mapMatchStatusToTranslation(matchDetail.data?.status)}</S.InformationValue>
                </div>
              </Flex>
              <Gap defaultHeight={8} />
              <S.MobileResultContent>
                {getMatchTypeTitle()}
                {showMapLabel && <S.InformationValue>{matchDetail.data?.challengerMap?.name}</S.InformationValue>}
                <S.MobileScore>
                  {scoreExists ? (
                    <>{`${matchDetail.data?.challengerScore} : ${matchDetail.data?.opponentScore}`}</>
                  ) : (
                    ' ? : ?'
                  )}
                </S.MobileScore>
              </S.MobileResultContent>
              <Gap defaultHeight={0} height={{ md: 16 }} />
              <S.TeamsContainer>
                <Team
                  goToPlayerDetail={goToPlayerDetail}
                  goToTeamDetail={goToTeamDetail}
                  map={matchDetail.data?.challengerMap}
                  matchId={query.matchId}
                  matchStatus={matchDetail.data?.status}
                  playerInMatchIdsAddedToSeasonStatistics={
                    matchDetail.data?.playerInMatchIdsAddedToSeasonStatistics ?? []
                  }
                  players={matchDetail.data?.challengerMatchPlayers ?? []}
                  showLineUp={showLineUp}
                  showMap={false}
                  team={matchDetail.data?.challenger?.team}
                />
                <Team
                  goToPlayerDetail={goToPlayerDetail}
                  goToTeamDetail={goToTeamDetail}
                  map={matchDetail.data?.opponentMap}
                  matchId={query.matchId}
                  matchStatus={matchDetail.data?.status}
                  playerInMatchIdsAddedToSeasonStatistics={
                    matchDetail.data?.playerInMatchIdsAddedToSeasonStatistics ?? []
                  }
                  players={matchDetail.data?.opponentMatchPlayers ?? []}
                  showLineUp={showLineUp}
                  showMap={false}
                  team={matchDetail.data?.opponent?.team}
                />
              </S.TeamsContainer>
            </Card>
          </S.ContentContainer>
        </S.MatchInformationContainer>
        {showFilesForMatchScore && (
          <>
            <Gap defaultHeight={16} />
            <FilesForMatchScore matchId={query.matchId} />
          </>
        )}
        {!!matchDetail.data?.rounds && matchDetail.data?.rounds.length > 0 && (
          <>
            <Gap defaultHeight={16} />
            <Rounds
              allowUpload={
                (matchDetail.data?.status === MatchStatus.WAITING_FOR_SCORE_CONFIRMATION ||
                  matchDetail.data?.status === MatchStatus.CONFIRMED_SCORE_BY_SYSTEM) &&
                (isPossibleToManageMatch.allowed || userIsAdmin)
              }
              hostMatchPlayers={matchDetail.data?.hostMatchPlayers ?? []}
              challengerMatchPlayers={matchDetail.data?.challengerMatchPlayers ?? []}
              challengerTag={matchDetail.data?.challenger.team.tag}
              opponentTag={matchDetail.data?.opponent.team.tag}
              opponentMatchPlayers={matchDetail.data?.opponentMatchPlayers ?? []}
              matchId={query.matchId}
              matchMaps={matchMaps}
              matchStatus={matchDetail.data?.status}
              rounds={matchDetail.data?.rounds}
              seasonId={matchDetail.data?.season?.id}
              userIsAdmin={userIsAdmin}
            />
          </>
        )}
        <Gap defaultHeight={16} />
        <Comments matchId={query.matchId} />
      </EaseInOutContainer>
      <Gap defaultHeight={16} />
      <AddPlayerToMatchModal
        challengerTeamId={matchDetail.data?.challenger?.team?.id}
        isOpen={isAddPlayerToMatchModalOpen}
        onClose={() => setIsAddPlayerToMatchModalOpen(false)}
        opponentTeamId={matchDetail.data?.opponent?.team?.id}
        matchId={query.matchId}
      />
      <CreateRoundModal
        isOpen={isCreateRoundModalOpen}
        maps={matchMaps}
        matchId={query.matchId}
        onClose={() => setIsCreateRoundModalOpen(false)}
      />
      <SortRoundsModal
        challengerTag={matchDetail.data?.challenger.team.tag}
        isOpen={isSortRoundsModalOpen}
        matchId={query.matchId}
        onClose={() => setIsSortRoundsModalOpen(false)}
        opponentTag={matchDetail.data?.opponent.team?.tag}
        rounds={matchDetail.data?.rounds ?? []}
      />
      <UpdateMatchModal
        disableTeamChange={false}
        isOpen={isUpdateMatchModalOpen}
        initialValues={{
          challengerSeasonId: challengerTeamIsUnknown ? undefined : matchDetail.data?.challenger?.id,
          opponentSeasonId: opponentTeamIsUnknown ? undefined : matchDetail.data?.opponent?.id,
          challengerMapId: matchDetail.data?.challengerMap?.id,
          challengerScore: matchDetail.data?.challengerScore,
          opponentScore: matchDetail.data?.opponentScore,
        }}
        onClose={() => setIsUpdateMatchModalOpen(false)}
        matchId={query.matchId}
        seasonId={matchDetail.data?.season?.id}
        seasonTeams={ladder.data?.items ?? []}
        showDate={false}
        showOpponentMap={false}
      />
    </ContentLayout>
  );
};
