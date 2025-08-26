import React, { useEffect, useState } from 'react';

import { Flex } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import { useMapsInSeason, useSeasonLadder, useSeasonsDetail } from '../../../api/hooks/league/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { Articles } from '../../../components/Articles/Articles';
import { BreadcrumbItem } from '../../../components/BreadcrumbItem/BreadcrumbItem';
import { Button } from '../../../components/Button/Button';
import { MainButtonVariant } from '../../../components/Button/enums';
import { Card } from '../../../components/Card/Card';
import { Divider } from '../../../components/Divider/Divider';
import { DEFAULT_USER_DATE_FORMAT } from '../../../components/Fields/DatePickerField/DatePickerField';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { SeasonMapListModal } from '../../../components/Modals/SeasonMapListModal/SeasonMapListModal';
import { SeasonMapsPickerModal } from '../../../components/Modals/SeasonMapsPickerModal/SeasonMapsPickerModal';
import { ResourceNotFound } from '../../../components/ResourceNotFound/ResourceNotFound';
import { AdminMenu } from '../../../components/Season/AdminMenu/AdminMenu';
import { H1 } from '../../../components/Titles/H1/H1';
import { Role, SeasonType } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapSeasonTypeToTranslation } from '../../../utils/mappingLabelUtils';

import { Groups } from './components/Groups/Groups';
import { PlayOff } from './components/PlayOff/PlayOff';
import { Statistics } from './components/Statistics/Statistics';
import { messages } from './messages';

import * as S from './Detail.style';

export const ChampionshipDetailCont: React.FC = () => {
  const { navigate, query } = useRouter<{ id: string }>();
  const { formatMessage } = useIntl();
  const [isMapListModalOpen, setIsMapListModalOpen] = useState<boolean>(false);
  const [isSeasonMapsPickerModalOpen, setIsSeasonMapsPickerModalOpen] = useState<boolean>(false);

  const userMe = useUserMe('always', [401]);
  const season = useSeasonsDetail(query.id);
  const ladder = useSeasonLadder(query.id);
  const maps = useMapsInSeason(query.id);

  useEffect(() => {
    if (season.data?.type && season.data?.type === SeasonType.SEASON) {
      navigate(Routes.SEASON_DETAIL.replace(':seasonId', query.id));
    }
    if (season.data?.type && season.data?.type === SeasonType.FACEIT) {
      navigate(Routes.RANKED_SEASON_DETAIL.replace(':seasonId', query.id));
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
          onClick: () => navigate(Routes.CHAMPIONSHIP),
          title: (
            <BreadcrumbItem>
              <FormattedMessage {...messages.leaguesBreadcrumb} />
            </BreadcrumbItem>
          ),
        },
        {
          key: 'bc-season',
          title: season.data?.name ?? <FormattedMessage {...messages.seasonDetailBreadcrumb} />,
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
            {userIsAdmin && <AdminMenu seasonId={query.id} setOpenSeasonMapsModal={setIsSeasonMapsPickerModalOpen} />}
          </S.ActionButtons>
        </Flex>
        <Divider style={{ marginBottom: 16 }} />
        <Card style={{ flex: 0.5 }} bodyStyle={{ padding: '8px 24px' }}>
          <S.SeasonInfoContainer>
            <div>
              <S.InformationLabel>
                <FormattedMessage {...messages.seasonType} />
              </S.InformationLabel>
              <br />
              <S.InformationValue>{mapSeasonTypeToTranslation(season.data?.type)}</S.InformationValue>
            </div>
            <div>
              <S.InformationLabel>
                <FormattedMessage {...messages.seasonDate} />
              </S.InformationLabel>
              <br />
              <S.InformationValue>
                {season.data?.startDate && season.data?.endDate ? (
                  <>
                    {formatDateForUser(season.data.startDate, DEFAULT_USER_DATE_FORMAT)} -{' '}
                    {formatDateForUser(season.data.endDate, DEFAULT_USER_DATE_FORMAT)}
                  </>
                ) : (
                  <FormattedMessage {...messages.dateNotSpecified} />
                )}
              </S.InformationValue>
            </div>
          </S.SeasonInfoContainer>
        </Card>
        <Gap defaultHeight={16} />
        <Flex justify="flex-end" style={{ gap: 8 }}>
          <Button onClick={() => setIsMapListModalOpen(true)} variant={MainButtonVariant.SECONDARY}>
            <FormattedMessage {...messages.openMapListModal} />
          </Button>
        </Flex>
        <Divider style={{ margin: '16px 0' }} />
        <Groups ladder={ladder.data?.items ?? []} ladderIsLoading={ladder.isLoading} />
        <Divider style={{ margin: '16px 0' }} />
        <PlayOff seasonId={query.id} />
        <Statistics seasonId={query.id} teams={ladder.data?.items ?? []} />
        <Gap defaultHeight={64} height={{ sm: 32 }} />
        <Articles categoryId="02c0ca14-15c4-44ec-ad59-1cf474c7916b" newestArticleAlone={false} />
        <Gap defaultHeight={32} />
      </EaseInOutContainer>
      <SeasonMapsPickerModal
        closeModal={() => setIsSeasonMapsPickerModalOpen(false)}
        isOpen={isSeasonMapsPickerModalOpen}
        seasonMaps={maps.data?.items ?? []}
        seasonId={query.id}
      />
      <SeasonMapListModal
        closeModal={() => setIsMapListModalOpen(false)}
        isOpen={isMapListModalOpen}
        seasonId={query.id}
      />
    </ContentLayout>
  );
};
