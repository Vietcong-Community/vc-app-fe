import React, { useState } from 'react';

import { Flex } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import { useMapsInSeason, useSeasonLadder, useSeasonsDetail } from '../../../api/hooks/league/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
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
import { Table } from '../../../components/Table/Table';
import { H1 } from '../../../components/Titles/H1/H1';
import { H2 } from '../../../components/Titles/H2/H2';
import { Role } from '../../../constants/enums';
import { useRouter } from '../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../routes/enums';
import { BreakPoints } from '../../../theme/theme';
import { formatDateForUser } from '../../../utils/dateUtils';
import { mapSeasonStatusToTranslation } from '../../../utils/mappingLabelUtils';

import { AdminMenu } from './components/AdminMenu/AdminMenu';
import { GroupMatches } from './components/GroupMatches/GroupMatches';
import { messages } from './messages';
import { LADDER_COLUMNS, ILadderTableRow } from './types';

import * as S from './Detail.style';

export const ChampionshipDetailCont: React.FC = () => {
  const { navigate, query } = useRouter<{ id: string }>();
  const { width } = useWindowDimensions();
  const { formatMessage } = useIntl();
  const isSmallerThanMd = width < BreakPoints.md;
  const [isMapListModalOpen, setIsMapListModalOpen] = useState<boolean>(false);
  const [isSeasonMapsPickerModalOpen, setIsSeasonMapsPickerModalOpen] = useState<boolean>(false);

  const userMe = useUserMe('always', [401]);
  const season = useSeasonsDetail(query.id);
  const ladder = useSeasonLadder(query.id);
  const maps = useMapsInSeason(query.id);

  const userIsAdmin = !!userMe.data?.roles.includes(Role.ADMIN);

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
        points: item.points ?? 0,
        seasonTeamId: item.id,
      };
    }) ?? [];

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
        <Flex justify="flex-end" style={{ gap: 8 }}>
          <Button onClick={() => setIsMapListModalOpen(true)} variant={MainButtonVariant.SECONDARY}>
            <FormattedMessage {...messages.openMapListModal} />
          </Button>
        </Flex>
        <Divider style={{ margin: '16px 0' }} />
        <Flex vertical align="flex-start">
          <H2>
            <FormattedMessage {...messages.ladderTitle} />
          </H2>
          <Table
            columns={LADDER_COLUMNS(isSmallerThanMd)}
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
        {!!ladder.data && <GroupMatches championshipId={query.id} roundsCount={ladder.data?.items?.length - 1} />}
        <Gap defaultHeight={64} height={{ sm: 32 }} />
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
