import React from 'react';

import { Divider, Flex, Spin } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import { useMatchDetail, useSeasonTeams } from '../../../api/hooks/league/api';
import { useMeTeams } from '../../../api/hooks/teams/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Card } from '../../../components/Card/Card';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { MatchStatus, Role } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapMatchStatusToTranslation } from '../../../utils/mappingLabelUtils';
import { canUserManageMatch } from '../utils';

import { ManageMenu } from './components/ManageMenu/ManageMenu';
import { Rounds } from './components/Rounds/Rounds';
import { Team } from './components/Team/Team';
import { messages } from './messages';

import * as S from './MatchDetail.style';

export const MatchDetail: React.FC = () => {
  const { navigate, query } = useRouter<{ matchId: string }>();

  const userMe = useUserMe('always', [401]);
  const matchDetail = useMatchDetail(query.matchId);
  const myTeams = useMeTeams(undefined, [401]);
  const seasonTeams = useSeasonTeams(matchDetail.data?.season?.id ?? '', [401], 'always');

  const userIsAdmin = !!userMe.data?.roles.includes(Role.ADMIN);
  const scoreExists =
    matchDetail.data?.status === MatchStatus.FINISHED ||
    matchDetail.data?.status === MatchStatus.WAITING_FOR_SCORE_CONFIRMATION;
  const isPossibleToManageMatch =
    myTeams.isFetchedAfterMount &&
    seasonTeams.isFetchedAfterMount &&
    canUserManageMatch(myTeams.data?.items ?? [], seasonTeams.data?.items ?? []);
  const showLoading = matchDetail.isLoading;

  const goToTeamDetail = (id: string) => {
    navigate(Routes.TEAM_DETAIL.replace(':id', id));
  };

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
        {(isPossibleToManageMatch || userIsAdmin) && (
          <ManageMenu
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
                  <S.Score>
                    {scoreExists
                      ? `${matchDetail.data?.challengerScore} - ${matchDetail.data?.opponentScore}`
                      : ' ? - ?'}
                  </S.Score>
                  <div style={{ flex: 1, textAlign: 'end' }}>
                    <S.InformationLabel>
                      <FormattedMessage {...messages.status} />
                    </S.InformationLabel>
                    <br />
                    <S.InformationValue>{mapMatchStatusToTranslation(matchDetail.data?.status)}</S.InformationValue>
                  </div>
                </Flex>
                <br />
                <S.TeamsContainer>
                  <Team goToTeamDetail={goToTeamDetail} team={matchDetail.data?.challenger?.team} />
                  <Team goToTeamDetail={goToTeamDetail} team={matchDetail.data?.opponent?.team} />
                </S.TeamsContainer>
              </Card>
            </S.ContentContainer>
          </>
        </S.MatchInformationContainer>
        <Gap defaultHeight={16} />
        {scoreExists && (
          <Rounds
            challengerTag={matchDetail.data?.challenger.team.tag}
            opponentTag={matchDetail.data?.opponent.team.tag}
            rounds={matchDetail.data?.rounds}
          />
        )}
      </EaseInOutContainer>
      <Gap defaultHeight={48} />
    </ContentLayout>
  );
};
