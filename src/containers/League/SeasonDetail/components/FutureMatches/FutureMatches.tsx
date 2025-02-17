import React, { ReactNode } from 'react';

import { Pagination, Space, Spin } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useSeasonMatchList } from '../../../../../api/hooks/league/api';
import { IMatchListItem } from '../../../../../api/hooks/league/interfaces';
import { EaseInOutContainer } from '../../../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { MatchStatus } from '../../../../../constants/enums';
import { MatchRow } from '../../../components/MatchRow/MatchRow';

import { messages } from './messages';

import * as S from '../../SeasonDetail.style';

interface IProps {
  canCreateNewMatch: boolean;
  onMatchCreateClick?: () => void;
  seasonId: string;
}

export const FutureMatches: React.FC<IProps> = (props: IProps) => {
  const { canCreateNewMatch = false, onMatchCreateClick, seasonId } = props;
  const [selectedPage, setSelectedPage] = React.useState<number>(1);
  const futureMatches = useSeasonMatchList(
    seasonId,
    {
      status: [
        MatchStatus.NEW,
        MatchStatus.ACCEPTED,
        MatchStatus.WAITING_FOR_SCORE_CONFIRMATION,
        MatchStatus.CONFIRMED_SCORE_BY_SYSTEM,
      ].join(','),
      limit: 5,
      page: selectedPage,
    },
    'always',
    0,
  );

  const noUpcomingMatches = futureMatches.data?.total === 0;

  return (
    <Card style={{ flex: 1 }}>
      {futureMatches.isLoading && <Spin size="large" style={{ margin: 'auto', width: '100%' }} />}
      <EaseInOutContainer isOpen={!futureMatches.isLoading}>
        <S.CardTitle>
          <FormattedMessage {...messages.upcomingMatches} />{' '}
          {(futureMatches.data?.total ?? 0) > 0 ? (
            <span style={{ fontSize: 12 }}>
              ({futureMatches.data?.matches?.length}/{futureMatches.data?.total})
            </span>
          ) : (
            ''
          )}
        </S.CardTitle>
        {noUpcomingMatches && <FormattedMessage {...messages.noUpcomingMatches} />}
        {noUpcomingMatches && canCreateNewMatch && (
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
          {!noUpcomingMatches &&
            futureMatches.data?.matches.map((item: IMatchListItem) => {
              return <MatchRow key={item.id} match={item} />;
            })}
        </Space>
        <Gap defaultHeight={16} />
        <Pagination
          align={'end'}
          responsive
          current={selectedPage}
          defaultPageSize={5}
          hideOnSinglePage
          total={futureMatches.data?.total ?? 0}
          onChange={(value) => setSelectedPage(value)}
          showQuickJumper
          showSizeChanger={false}
          style={{ width: '100%' }}
        />
      </EaseInOutContainer>
    </Card>
  );
};
