import React, { useMemo, useState } from 'react';

import { Divider, Flex, Spin } from 'antd';
import { some } from 'lodash';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import { useMatchDetail, useSeasonLadder, useSeasonTeams } from '../../../api/hooks/league/api';
import { IMatchRound } from '../../../api/hooks/league/interfaces';
import { useMeTeams } from '../../../api/hooks/teams/api';
import { Alert } from '../../../components/Alert/Alert';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Button } from '../../../components/Button/Button';
import { MainButtonVariant } from '../../../components/Button/enums';
import { Card } from '../../../components/Card/Card';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { MatchStatus, Role } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapMatchStatusToTranslation } from '../../../utils/mappingLabelUtils';
import { ExpectedEloPointsModal } from '../components/ExpectedEloPointsModal/ExpectedEloPointsModal';
import { canUserManageMatch } from '../utils';

import { ManageMenu } from './components/ManageMenu/ManageMenu';
import { Rounds } from './components/Rounds/Rounds';
import { Team } from './components/Team/Team';
import { messages } from './messages';

import * as S from './MatchDetail.style';

export const MatchDetail: React.FC = () => {
  const { navigate, query } = useRouter<{ matchId: string }>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { formatMessage } = useIntl();

  const matchDetail = useMatchDetail(query.matchId);

  const matchIsNotFinished = !!matchDetail.data?.status && matchDetail.data.status !== MatchStatus.FINISHED;
  const userMe = useUserMe('always', [401], matchIsNotFinished);
  const myTeams = useMeTeams(undefined, [401], matchIsNotFinished);
  const seasonTeams = useSeasonTeams(matchDetail.data?.season?.id ?? '', [401], 'always', matchIsNotFinished);
  const ladder = useSeasonLadder(matchDetail.data?.season?.id);

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
  const showLoading = matchDetail.isLoading;

  const goToTeamDetail = (id: string) => {
    navigate(Routes.TEAM_DETAIL.replace(':id', id));
  };

  const challengerEloAmountGreaterThanZero = (matchDetail.data?.challengerEloRowAmount ?? 0) > 0;
  const challengerEloAmountLowerThanZero = (matchDetail.data?.challengerEloRowAmount ?? 0) < 0;
  const opponentEloAmountGreaterThanZero = (matchDetail.data?.opponentEloRowAmount ?? 0) > 0;
  const opponentEloAmountLowerThanZero = (matchDetail.data?.opponentEloRowAmount ?? 0) < 0;
  const challengerSeasonTeam = ladder.data?.items.find((item) => item.id === matchDetail.data?.challenger?.id);
  const opponentSeasonTeam = ladder.data?.items.find((item) => item.id === matchDetail.data?.opponent?.id);
  const showUploadRoundImagesAlert =
    matchDetail.data?.status === MatchStatus.WAITING_FOR_SCORE_CONFIRMATION &&
    some(matchDetail.data?.rounds ?? [], (item: IMatchRound) => !item.screenshot);

  const showLineUp = [
    MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
    MatchStatus.FINISHED,
    MatchStatus.CONFIRMED_SCORE_BY_SYSTEM,
  ].includes(matchDetail.data?.status as MatchStatus);

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
          onClick: () => navigate(Routes.SEASON_DETAIL.replace(':seasonId', matchDetail.data?.season.id ?? '')),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.seasonDetailBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-match',
          title: <FormattedMessage {...messages.matchBreadcrumb} />,
        },
      ]}
    >
      <Flex align="center" justify="space-between">
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
        {(isPossibleToManageMatch?.allowed || userIsAdmin) && (
          <ManageMenu
            canConfirmMatch={isPossibleToManageMatch?.myTeamId === matchDetail.data?.opponent?.team?.id}
            canEnterResult={isPossibleToManageMatch?.allowed}
            canConfirmResult={isPossibleToManageMatch?.allowed && !showUploadRoundImagesAlert}
            matchId={query.matchId}
            seasonId={matchDetail.data?.season?.id}
            status={matchDetail.data?.status}
            userIsAdmin={userIsAdmin}
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
          <>
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
                        <>
                          {matchDetail.data?.status === MatchStatus.FINISHED && (
                            <S.EloPoints
                              $isWinning={challengerEloAmountGreaterThanZero}
                              $isLosing={challengerEloAmountLowerThanZero}
                            >
                              ({challengerEloAmountGreaterThanZero && '+'}
                              {matchDetail.data?.challengerEloRowAmount})
                            </S.EloPoints>
                          )}
                          {`${matchDetail.data?.challengerScore} : ${matchDetail.data?.opponentScore}`}

                          {matchDetail.data?.status === MatchStatus.FINISHED && (
                            <S.EloPoints
                              $isWinning={opponentEloAmountGreaterThanZero}
                              $isLosing={opponentEloAmountLowerThanZero}
                            >
                              ({opponentEloAmountGreaterThanZero && '+'}
                              {matchDetail.data?.opponentEloRowAmount})
                            </S.EloPoints>
                          )}
                        </>
                      ) : (
                        ' ? : ?'
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
                      <>
                        {matchDetail.data?.status === MatchStatus.FINISHED && (
                          <S.EloPoints
                            $isWinning={challengerEloAmountGreaterThanZero}
                            $isLosing={challengerEloAmountLowerThanZero}
                          >
                            ({challengerEloAmountGreaterThanZero && '+'}
                            {matchDetail.data?.challengerEloRowAmount})
                          </S.EloPoints>
                        )}
                        {`${matchDetail.data?.challengerScore} : ${matchDetail.data?.opponentScore}`}

                        {matchDetail.data?.status === MatchStatus.FINISHED && (
                          <S.EloPoints
                            $isWinning={opponentEloAmountGreaterThanZero}
                            $isLosing={opponentEloAmountLowerThanZero}
                          >
                            ({opponentEloAmountGreaterThanZero && '+'}
                            {matchDetail.data?.opponentEloRowAmount})
                          </S.EloPoints>
                        )}
                      </>
                    ) : (
                      ' ? : ?'
                    )}
                  </S.MobileScore>
                </S.MobileResultContent>
                <Gap defaultHeight={0} height={{ md: 16 }} />
                <S.TeamsContainer>
                  <Team
                    eloPoints={matchIsNotFinished ? challengerSeasonTeam?.eloPoints : undefined}
                    goToTeamDetail={goToTeamDetail}
                    map={matchDetail.data?.challengerMap}
                    players={matchDetail.data?.challengerMatchPlayers ?? []}
                    showLineUp={showLineUp}
                    team={matchDetail.data?.challenger?.team}
                  />
                  <Team
                    eloPoints={matchIsNotFinished ? opponentSeasonTeam?.eloPoints : undefined}
                    goToTeamDetail={goToTeamDetail}
                    map={matchDetail.data?.opponentMap}
                    players={matchDetail.data?.opponentMatchPlayers ?? []}
                    showLineUp={showLineUp}
                    team={matchDetail.data?.opponent?.team}
                  />
                </S.TeamsContainer>
                <EaseInOutContainer isOpen={matchIsNotFinished}>
                  <Gap defaultHeight={16} />
                  <Flex justify="end">
                    <Button onClick={() => setIsOpen(true)} variant={MainButtonVariant.OUTLINED}>
                      <FormattedMessage {...messages.expectedEloPoints} />
                    </Button>
                  </Flex>
                </EaseInOutContainer>
              </Card>
            </S.ContentContainer>
          </>
        </S.MatchInformationContainer>
        <Gap defaultHeight={16} />
        {scoreExists && !!matchDetail.data?.rounds && matchDetail.data?.rounds.length > 0 && (
          <Rounds
            allowUpload={
              matchDetail.data?.status === MatchStatus.WAITING_FOR_SCORE_CONFIRMATION &&
              (isPossibleToManageMatch.allowed || userIsAdmin)
            }
            challengerMatchPlayers={matchDetail.data?.challengerMatchPlayers ?? []}
            challengerTag={matchDetail.data?.challenger.team.tag}
            opponentTag={matchDetail.data?.opponent.team.tag}
            opponentMatchPlayers={matchDetail.data?.opponentMatchPlayers ?? []}
            matchId={query.matchId}
            rounds={matchDetail.data?.rounds}
          />
        )}
      </EaseInOutContainer>
      <Gap defaultHeight={48} />
      <ExpectedEloPointsModal
        closeModal={() => setIsOpen(false)}
        challengerId={matchDetail?.data?.challenger?.id}
        challengerName={matchDetail.data?.challenger?.team?.tag}
        challengerElo={challengerSeasonTeam?.eloPoints}
        isOpen={isOpen}
        opponentId={matchDetail.data?.opponent?.id}
        opponentName={matchDetail.data?.opponent?.team?.tag}
        opponentElo={opponentSeasonTeam?.eloPoints}
      />
    </ContentLayout>
  );
};
