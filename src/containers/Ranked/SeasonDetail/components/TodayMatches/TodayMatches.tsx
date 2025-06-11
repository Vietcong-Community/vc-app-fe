import React, { ReactNode } from 'react';

import { Pagination, Space, Spin } from 'antd';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';

import { useSeasonMatchList } from '../../../../../api/hooks/league/api';
import { IMatchListItem } from '../../../../../api/hooks/league/interfaces';
import { EaseInOutContainer } from '../../../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { Card } from '../../../../../components/Card/Card';
import { DEFAULT_SYSTEM_DATE_FORMAT } from '../../../../../components/Fields/DatePickerField/DatePickerField';
import { Gap } from '../../../../../components/Gap/Gap';
import { MatchRow } from '../../../../../components/Season/MatchRow/MatchRow';
import { Routes } from '../../../../../routes/enums';

import { messages } from './messages';

import * as S from './TodayMatches.style';

interface IProps {
  canCreateNewMatch: boolean;
  onMatchCreateClick?: () => void;
  seasonId: string;
  userIsAdmin?: boolean;
}

export const TodayMatches: React.FC<IProps> = (props: IProps) => {
  const { canCreateNewMatch, onMatchCreateClick, seasonId, userIsAdmin } = props;
  const [selectedPage, setSelectedPage] = React.useState<number>(1);
  const todayMatches = useSeasonMatchList(
    seasonId,
    {
      startDateFrom: dayjs().startOf('d')?.format(DEFAULT_SYSTEM_DATE_FORMAT),
      startDateTo: dayjs().add(1, 'd').startOf('d')?.format(DEFAULT_SYSTEM_DATE_FORMAT),
      limit: 5,
      page: selectedPage,
    },
    'always',
    0,
  );

  const noMatches = todayMatches.data?.total === 0;

  return (
    <>
      <Card style={{ flex: 1 }}>
        {todayMatches.isLoading && <Spin size="large" style={{ margin: 'auto', width: '100%' }} />}

        <EaseInOutContainer isOpen={!todayMatches.isLoading}>
          <S.CardTitle>
            <FormattedMessage {...messages.upcomingMatches} />{' '}
            {(todayMatches.data?.total ?? 0) > 0 ? (
              <span style={{ fontSize: 12 }}>
                ({todayMatches.data?.matches?.length}/{todayMatches.data?.total})
              </span>
            ) : (
              ''
            )}
          </S.CardTitle>
          {noMatches && <FormattedMessage {...messages.noUpcomingMatches} />}
          {noMatches && canCreateNewMatch && (
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
            {!noMatches &&
              todayMatches.data?.matches.map((item: IMatchListItem) => {
                return (
                  <MatchRow
                    detailUrl={Routes.RANKED_MATCH_DETAIL}
                    key={item.id}
                    isRanked
                    match={item}
                    showPlayers
                    showTeams={false}
                    userIsAdmin={userIsAdmin}
                  />
                );
              })}
          </Space>
          <Gap defaultHeight={16} />
          <Pagination
            align={'end'}
            responsive
            current={selectedPage}
            defaultPageSize={5}
            hideOnSinglePage
            total={todayMatches.data?.total ?? 0}
            onChange={(value) => setSelectedPage(value)}
            showQuickJumper
            showSizeChanger={false}
            style={{ width: '100%' }}
          />
        </EaseInOutContainer>
      </Card>
    </>
  );
};
