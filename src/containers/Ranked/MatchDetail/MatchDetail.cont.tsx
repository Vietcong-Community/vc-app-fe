import React, { useEffect, useState } from 'react';

import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, Flex, Spin } from 'antd';
import dayjs from 'dayjs';
import { compact, some } from 'lodash';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import { IUser } from '../../../api/hooks/interfaces';
import { useMapsInSeason, useMatchDetail } from '../../../api/hooks/league/api';
import { IMatchRound } from '../../../api/hooks/league/interfaces';
import { useMapVoteState } from '../../../api/hooks/ranked/api';
import { Alert } from '../../../components/Alert/Alert';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Button } from '../../../components/Button/Button';
import { MainButtonVariant } from '../../../components/Button/enums';
import { Card } from '../../../components/Card/Card';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { Comments } from '../../../components/Match/Comments/Comments';
import { FilesForMatchScore } from '../../../components/Match/FilesForMatchScore/FilesForMatchScore';
import { Rounds } from '../../../components/Match/Rounds/Rounds';
import { Team } from '../../../components/Match/Team/Team';
import { AddPlayerToMatchModal } from '../../../components/Modals/AddPlayerToMatchModal/AddPlayerToMatchModal';
import { CreateRoundModal } from '../../../components/Modals/CreateRoundModal/CreateMatchModal';
import { JoinRankedMatchModal } from '../../../components/Modals/JoinRankedMatchModal/JoinRankedMatchModal';
import { LeaveRankedMatchModal } from '../../../components/Modals/LeaveRankedMatchModal/LeaveRankedMatchModal';
import { SortRoundsModal } from '../../../components/Modals/SortRoundsModal/SortRoundsModal';
import { UpdateMatchModal } from '../../../components/Modals/UpdateMatchModal/UpdateMatchModal';
import { ResourceNotFound } from '../../../components/ResourceNotFound/ResourceNotFound';
import { H1 } from '../../../components/Titles/H1/H1';
import { MatchStatus, Role, SeasonType } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapMatchStatusToTranslation } from '../../../utils/mappingLabelUtils';

import { LoggedPlayers } from './components/LoggedPlayers/LoggedPlayers';
import { ManageMenu } from './components/ManageMenu/ManageMenu';
import { MapVoteResult } from './components/MapVoteResult/MapVoteResult';
import { messages } from './messages';

import * as S from './MatchDetail.style';

export const MatchDetail: React.FC = () => {
  const { navigate, query } = useRouter<{ matchId: string }>();
  const [isJoinMatchModalOpen, setIsJoinMatchModalOpen] = useState<boolean>(false);
  const [isLeaveMatchModalOpen, setIsLeaveMatchModalOpen] = useState<boolean>(false);
  const [isSortRoundsModalOpen, setIsSortRoundsModalOpen] = useState<boolean>(false);
  const [isUpdateMatchModalOpen, setIsUpdateMatchModalOpen] = useState<boolean>(false);
  const [isCreateRoundModalOpen, setIsCreateRoundModalOpen] = useState<boolean>(false);
  const [isAddPlayerToMatchModalOpen, setIsAddPlayerToMatchModalOpen] = useState<boolean>(false);
  const [playerToRemoveFromMatch, setPlayerToRemoveFromMatch] = useState<IUser | undefined>();
  const { formatMessage } = useIntl();

  const matchDetail = useMatchDetail(query.matchId);
  const votedMaps = useMapVoteState(query.matchId);
  const maps = useMapsInSeason(matchDetail.data?.season?.id);

  const matchIsNotFinished = !!matchDetail.data?.status && matchDetail.data.status !== MatchStatus.FINISHED;
  const userMe = useUserMe('always', [401], matchIsNotFinished);

  const userIsStatisticsAdmin = !!userMe.data?.roles.includes(Role.STATS_ADMIN);
  const userIsAdmin = !!userMe.data?.roles.includes(Role.ADMIN);
  const scoreExists = [
    MatchStatus.FINISHED,
    MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
    MatchStatus.CONFIRMED_SCORE_BY_SYSTEM,
  ].includes(matchDetail.data?.status as MatchStatus);
  const showLoading = matchDetail.isLoading;

  useEffect(() => {
    if (matchDetail.data?.season?.type && matchDetail.data?.season.type === SeasonType.TOURNAMENT) {
      navigate(Routes.CHAMPIONSHIP_MATCH_DETAIL.replace(':matchId', query.matchId));
    }
    if (matchDetail.data?.season?.type && matchDetail.data?.season.type === SeasonType.SEASON) {
      navigate(Routes.MATCH_DETAIL.replace(':matchId', query.matchId));
    }
  }, [matchDetail.data?.season?.type]);

  const goToPlayerDetail = (id: string) => {
    navigate(Routes.USER_PROFILE.replace(':id', id));
  };

  const matchStatusIsNew = matchDetail.data?.status === MatchStatus.NEW;
  const matchIsFull = (matchDetail.data?.hostMatchPlayers?.length ?? 0) >= (matchDetail.data?.maximalPlayers ?? 0);
  const currentUserIsInMatch =
    !!userMe.data?.id &&
    matchDetail.isFetched &&
    matchDetail.data?.hostMatchPlayers?.find((item) => item.user.id === userMe.data?.id);
  const canCurrentUserLeave = currentUserIsInMatch && matchStatusIsNew;
  const canCurrentUserJoin = !currentUserIsInMatch && matchStatusIsNew;
  const isCurrentUserOwnerOfMatch = userMe.data?.id === matchDetail.data?.createdBy?.id;
  const showUploadRoundImagesAlert =
    matchDetail.data?.status === MatchStatus.WAITING_FOR_SCORE_CONFIRMATION &&
    some(matchDetail.data?.rounds ?? [], (item: IMatchRound) => !item.screenshot && !item.scoreFile);
  const showFilesForMatchScore =
    userIsAdmin &&
    [MatchStatus.ACCEPTED, MatchStatus.CONFIRMED_SCORE_BY_SYSTEM, MatchStatus.WAITING_FOR_SCORE_CONFIRMATION].includes(
      matchDetail.data?.status as MatchStatus,
    ) &&
    matchDetail.data?.rounds?.length !== 4;
  const matchMaps = compact([matchDetail.data?.challengerMap, matchDetail.data?.opponentMap]);

  if (matchDetail.isError) {
    return (
      <ContentLayout>
        <ResourceNotFound name={formatMessage(messages.title)} />
      </ContentLayout>
    );
  }

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
          onClick: () => navigate(Routes.RANKED_SEASON_DETAIL.replace(':seasonId', matchDetail.data?.season.id ?? '')),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.competitiveDetailBreadcrumb} />
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
        {(userIsAdmin || isCurrentUserOwnerOfMatch) && (
          <ManageMenu
            canEnterResult={isCurrentUserOwnerOfMatch}
            canLockMatch={(matchDetail.data?.hostMatchPlayers?.length ?? 0) >= (matchDetail.data?.minimalPlayers ?? 0)}
            matchId={query.matchId}
            seasonId={matchDetail.data?.season?.id}
            setIsAddPlayerToMatchModalOpen={setIsAddPlayerToMatchModalOpen}
            setIsCreateRoundModalOpen={setIsCreateRoundModalOpen}
            setIsSortRoundsModalOpen={setIsSortRoundsModalOpen}
            setIsUpdateMatchModalOpen={setIsUpdateMatchModalOpen}
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
                  <FormattedMessage {...messages.result} />
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
              <br />
              <S.MobileResultContent>
                <FormattedMessage {...messages.result} />
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
                {matchStatusIsNew && (
                  <LoggedPlayers
                    isCurrentUserOwnerOfMatch={isCurrentUserOwnerOfMatch}
                    matchOwner={matchDetail.data?.createdBy}
                    players={matchDetail.data?.hostMatchPlayers ?? []}
                    setRemovePlayerFromMatch={(user) => {
                      setPlayerToRemoveFromMatch(user);
                      setIsLeaveMatchModalOpen(true);
                    }}
                    userId={userMe.data?.id}
                  />
                )}
                {!matchStatusIsNew && (
                  <>
                    <Team
                      defaultLineUpOpen
                      goToPlayerDetail={goToPlayerDetail}
                      map={matchDetail.data?.challengerMap}
                      matchId={query.matchId}
                      matchStatus={matchDetail.data?.status}
                      playerInMatchIdsAddedToSeasonStatistics={
                        matchDetail.data?.playerInMatchIdsAddedToSeasonStatistics ?? []
                      }
                      players={matchDetail.data?.challengerMatchPlayers ?? []}
                      showLineUp
                      showTeamName={false}
                      team={matchDetail.data?.challenger?.team}
                    />
                    <Team
                      defaultLineUpOpen
                      goToPlayerDetail={goToPlayerDetail}
                      map={matchDetail.data?.opponentMap}
                      matchId={query.matchId}
                      matchStatus={matchDetail.data?.status}
                      playerInMatchIdsAddedToSeasonStatistics={
                        matchDetail.data?.playerInMatchIdsAddedToSeasonStatistics ?? []
                      }
                      players={matchDetail.data?.opponentMatchPlayers ?? []}
                      showLineUp
                      showTeamName={false}
                      team={matchDetail.data?.opponent?.team}
                    />
                  </>
                )}
              </S.TeamsContainer>
              {matchStatusIsNew && (
                <>
                  <Gap defaultHeight={32} height={{ md: 16 }} />
                  <MapVoteResult
                    maps={maps.data?.items ?? []}
                    mapVotes={votedMaps.data?.mapPickList.items ?? []}
                    totalVotes={votedMaps.data?.mapPickList.total ?? 0}
                  />
                </>
              )}
            </Card>
          </S.ContentContainer>
        </S.MatchInformationContainer>
        {(canCurrentUserJoin || canCurrentUserLeave) && (
          <>
            <Gap defaultHeight={16} />
            <Flex justify="flex-end" style={{ gap: 8 }}>
              {canCurrentUserJoin && !matchIsFull && (
                <Button
                  onClick={() => setIsJoinMatchModalOpen(true)}
                  variant={MainButtonVariant.PRIMARY}
                  style={{ color: 'white', fontWeight: 'bold' }}
                >
                  <FormattedMessage {...messages.joinMatch} />
                </Button>
              )}
              {canCurrentUserLeave && (
                <Button
                  onClick={() => setIsLeaveMatchModalOpen(true)}
                  variant={MainButtonVariant.PRIMARY}
                  style={{ color: 'white', fontWeight: 'bold' }}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <FormattedMessage {...messages.leaveMatch} />
                </Button>
              )}
            </Flex>
          </>
        )}
        {showFilesForMatchScore && (
          <>
            <Gap defaultHeight={16} />
            <FilesForMatchScore matchId={query.matchId} />
          </>
        )}
        <Gap defaultHeight={16} />
        {!!matchDetail.data?.rounds && matchDetail.data?.rounds.length > 0 && (
          <Rounds
            allowUpload={
              matchDetail.data?.status === MatchStatus.WAITING_FOR_SCORE_CONFIRMATION ||
              matchDetail.data?.status === MatchStatus.CONFIRMED_SCORE_BY_SYSTEM
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
        )}
        <Gap defaultHeight={16} />
        <Comments matchId={query.matchId} />
      </EaseInOutContainer>
      <Gap defaultHeight={48} />
      <UpdateMatchModal
        isOpen={isUpdateMatchModalOpen}
        initialValues={{
          challengerSeasonId: matchDetail.data?.challenger?.id,
          opponentSeasonId: matchDetail.data?.opponent?.id,
          challengerMapId: matchDetail.data?.challengerMap?.id,
          opponentMapId: matchDetail.data?.opponentMap?.id,
          startDate: dayjs(matchDetail.data?.startDate) as unknown as string,
          challengerScore: matchDetail.data?.challengerScore,
          opponentScore: matchDetail.data?.opponentScore,
        }}
        onClose={() => setIsUpdateMatchModalOpen(false)}
        matchId={query.matchId}
        seasonId={matchDetail.data?.season?.id}
        showChallengerField={false}
        showOpponentField={false}
      />
      <SortRoundsModal
        challengerTag={matchDetail.data?.challenger.team.tag}
        isOpen={isSortRoundsModalOpen}
        matchId={query.matchId}
        onClose={() => setIsSortRoundsModalOpen(false)}
        opponentTag={matchDetail.data?.opponent.team?.tag}
        rounds={matchDetail.data?.rounds ?? []}
      />
      <CreateRoundModal
        isOpen={isCreateRoundModalOpen}
        maps={matchMaps}
        matchId={query.matchId}
        onClose={() => setIsCreateRoundModalOpen(false)}
      />
      <AddPlayerToMatchModal
        challengerTeamId={matchDetail.data?.challenger?.team?.id}
        isOpen={isAddPlayerToMatchModalOpen}
        onClose={() => setIsAddPlayerToMatchModalOpen(false)}
        opponentTeamId={matchDetail.data?.opponent?.team?.id}
        matchId={query.matchId}
        showChallengerTeamPlayers={false}
        showOpponentTeamPlayers={false}
      />
      {userMe.data?.id && (
        <JoinRankedMatchModal
          isOpen={isJoinMatchModalOpen}
          onClose={() => setIsJoinMatchModalOpen(false)}
          maps={maps.data?.items ?? []}
          matchId={query.matchId}
          userId={userMe.data.id}
        />
      )}
      {userMe.data?.id && (
        <LeaveRankedMatchModal
          isOpen={isLeaveMatchModalOpen}
          onClose={() => {
            setPlayerToRemoveFromMatch(undefined);
            setIsLeaveMatchModalOpen(false);
          }}
          matchId={query.matchId}
          user={playerToRemoveFromMatch ?? userMe.data}
          userId={userMe.data?.id}
        />
      )}
    </ContentLayout>
  );
};
