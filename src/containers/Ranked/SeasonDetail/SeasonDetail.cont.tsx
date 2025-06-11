import React, { useEffect, useState } from 'react';

import { Flex } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import { useMapsInSeason, useSeasonsDetail } from '../../../api/hooks/league/api';
import { useCanCreateNewMatch } from '../../../api/hooks/ranked/api';
import { Alert } from '../../../components/Alert/Alert';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Button } from '../../../components/Button/Button';
import { MainButtonVariant } from '../../../components/Button/enums';
import { Card } from '../../../components/Card/Card';
import { Divider } from '../../../components/Divider/Divider';
import { DEFAULT_USER_DATE_FORMAT } from '../../../components/Fields/DatePickerField/DatePickerField';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { CreateRankedMatchModal } from '../../../components/Modals/CreateRankedMatchModal/CreateRankedMatchModal';
import { SeasonMapListModal } from '../../../components/Modals/SeasonMapListModal/SeasonMapListModal';
import { SeasonMapsPickerModal } from '../../../components/Modals/SeasonMapsPickerModal/SeasonMapsPickerModal';
import { ResourceNotFound } from '../../../components/ResourceNotFound/ResourceNotFound';
import { AdminMenu } from '../../../components/Season/AdminMenu/AdminMenu';
import { AllMatches } from '../../../components/Season/AllMatches/AllMatches';
import { Statistics } from '../../../components/Season/Statistics/Statistics';
import { H1 } from '../../../components/Titles/H1/H1';
import { H2 } from '../../../components/Titles/H2/H2';
import { Role, SeasonType } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapSeasonStatusToTranslation } from '../../../utils/mappingLabelUtils';
import { TopPlayersOfTheDay } from '../../League/SeasonDetail/components/TopPlayersOfTheDay/TopPlayersOfTheDay';

import { TodayMatches } from './components/TodayMatches/TodayMatches';
import { messages } from './messages';

import * as S from './SeasonDetail.style';

export const RankedSeasonDetailCont: React.FC = () => {
  const { navigate, query } = useRouter<{ seasonId: string; scrollTo?: string }>();
  const [isCreateMatchModalOpen, setIsCreateMatchModalOpen] = useState<boolean>(false);
  const [isMapListModalOpen, setIsMapListModalOpen] = useState<boolean>(false);
  const [isSeasonMapsPickerModalOpen, setIsSeasonMapsPickerModalOpen] = useState<boolean>(false);
  const { formatMessage } = useIntl();

  const userMe = useUserMe('always', [401]);
  const season = useSeasonsDetail(query.seasonId);
  const maps = useMapsInSeason(query.seasonId);
  const canCreateNewMatch = useCanCreateNewMatch(query.seasonId, [401]);

  useEffect(() => {
    if (season.data?.type && season.data?.type === SeasonType.SEASON) {
      navigate(Routes.SEASON_DETAIL.replace(':seasonId', query.seasonId));
    }
    if (season.data?.type && season.data?.type === SeasonType.TOURNAMENT) {
      navigate(Routes.CHAMPIONSHIP_DETAIL.replace(':id', query.seasonId));
    }
  }, [season.data?.type]);

  const userIsAdmin = !!userMe.data?.roles.includes(Role.ADMIN);

  if (season.isError) {
    return (
      <ContentLayout>
        <ResourceNotFound />
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
          title: <FormattedMessage {...messages.competetiveDetailBreadcrumb} />,
        },
      ]}
    >
      <Helmet title={formatMessage(messages.competetiveDetailBreadcrumb)} />
      <EaseInOutContainer isOpen={!season.isLoading}>
        <Flex align="center" justify="space-between">
          <H1>{season.data?.name}</H1>

          <S.ActionButtons>
            {userIsAdmin && (
              <AdminMenu seasonId={query.seasonId} setOpenSeasonMapsModal={setIsSeasonMapsPickerModalOpen} />
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
        <TodayMatches
          canCreateNewMatch={canCreateNewMatch.data?.canCreateMatch || userIsAdmin}
          onMatchCreateClick={() => setIsCreateMatchModalOpen(true)}
          seasonId={query.seasonId}
          userIsAdmin={userIsAdmin}
        />
        <Gap defaultHeight={16} />
        <Flex justify="flex-end" style={{ gap: 8 }}>
          {!!userMe.data && (
            <Button
              onClick={() => setIsCreateMatchModalOpen(true)}
              disabled={!canCreateNewMatch.data?.canCreateMatch}
              variant={MainButtonVariant.SECONDARY}
            >
              <FormattedMessage {...messages.createMatch} />
            </Button>
          )}
          <Button onClick={() => setIsMapListModalOpen(true)} variant={MainButtonVariant.SECONDARY}>
            <FormattedMessage {...messages.openMapListModal} />
          </Button>
        </Flex>
        {canCreateNewMatch.isSuccess && !canCreateNewMatch.data?.canCreateMatch && (
          <>
            <Gap defaultHeight={16} />
            <Alert
              title={formatMessage(messages.createNewMatchIsNotPossible)}
              type="info"
              showIcon
              style={{ textAlign: 'start' }}
            />
          </>
        )}
        <Divider style={{ margin: '16px 0' }} />
        <Statistics
          customTitle={
            <H2>
              <FormattedMessage {...messages.playersLadder} />
            </H2>
          }
          seasonId={query.seasonId}
          showTeamFilter={false}
        />
        <Divider style={{ margin: '16px 0' }} />
        <AllMatches
          matchUrl={Routes.RANKED_MATCH_DETAIL}
          seasonMaps={maps.data?.items ?? []}
          seasonId={query.seasonId}
          showSeasonTeams={false}
          showTeamNames={false}
          showPlayers
          userIsAdmin={userIsAdmin}
        />
      </EaseInOutContainer>
      <Gap defaultHeight={48} />
      <SeasonMapListModal
        closeModal={() => setIsMapListModalOpen(false)}
        isOpen={isMapListModalOpen}
        seasonId={query.seasonId}
      />
      <CreateRankedMatchModal
        isOpen={isCreateMatchModalOpen}
        onClose={() => {
          setIsCreateMatchModalOpen(false);
        }}
        seasonId={query.seasonId}
        maps={maps.data?.items ?? []}
        userIsAdmin={userIsAdmin}
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
