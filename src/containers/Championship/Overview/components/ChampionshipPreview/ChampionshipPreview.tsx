import React from 'react';

import { Flex } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { useSeasonLadder } from '../../../../../api/hooks/league/api';
import { ISeason } from '../../../../../api/hooks/league/interfaces';
import { Button } from '../../../../../components/Button/Button';
import { Card } from '../../../../../components/Card/Card';
import { Divider } from '../../../../../components/Divider/Divider';
import { DEFAULT_USER_DATE_FORMAT } from '../../../../../components/Fields/DatePickerField/DatePickerField';
import { Gap } from '../../../../../components/Gap/Gap';
import { Table } from '../../../../../components/Table/Table';
import { H2 } from '../../../../../components/Titles/H2/H2';
import { useRouter } from '../../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { BreakPoints } from '../../../../../theme/theme';
import { formatDateForUser } from '../../../../../utils/dateUtils';
import { mapSeasonStatusToTranslation } from '../../../../../utils/mappingLabelUtils';
import { ILadderTableRow, LADDER_COLUMNS } from '../../../Detail/types';

import { messages } from './messages';

import * as S from '../../../Detail/Detail.style';

interface IProps {
  seasonDetail: ISeason;
}

export const ChampionshipPreview: React.FC<IProps> = (props: IProps) => {
  const { seasonDetail } = props;
  const { navigate } = useRouter();
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const ladder = useSeasonLadder(seasonDetail.id);

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
    <Card>
      <Flex justify="space-between">
        <H2>{seasonDetail.name}</H2>
        <Link to={Routes.CHAMPIONSHIP_DETAIL.replace(':id', seasonDetail.id)}>
          <Button>
            <FormattedMessage {...messages.goToDetail} />
          </Button>
        </Link>
      </Flex>
      <Gap defaultHeight={0} height={{ md: 16 }} />
      <Card style={{ flex: 0.5 }} bodyStyle={{ padding: '8px 24px' }}>
        <S.SeasonInfoContainer>
          <div>
            <S.InformationLabel>
              <FormattedMessage {...messages.seasonStatus} />
            </S.InformationLabel>
            : <S.InformationValue>{mapSeasonStatusToTranslation(seasonDetail.status)}</S.InformationValue>
          </div>
          <div>
            <S.InformationLabel>
              <FormattedMessage {...messages.seasonBeginDate} />
            </S.InformationLabel>
            :{' '}
            <S.InformationValue>
              {seasonDetail.startDate ? (
                formatDateForUser(seasonDetail.startDate, DEFAULT_USER_DATE_FORMAT)
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
              {seasonDetail.endDate ? (
                formatDateForUser(seasonDetail.endDate, DEFAULT_USER_DATE_FORMAT)
              ) : (
                <FormattedMessage {...messages.dateNotSpecified} />
              )}
            </S.InformationValue>
          </div>
        </S.SeasonInfoContainer>
      </Card>
      <Divider style={{ margin: '16px 0' }} />
      <Flex vertical align="flex-start">
        <H2>
          <FormattedMessage {...messages.group} />
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
    </Card>
  );
};
