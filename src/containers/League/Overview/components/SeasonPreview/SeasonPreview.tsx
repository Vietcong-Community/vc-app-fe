import React from 'react';

import { RightOutlined } from '@ant-design/icons';
import { Flex, Space, Table, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import { IMatch } from '../../../../../api/hooks/league/interfaces';
import { Button } from '../../../../../components/Button/Button';
import { MainButtonVariant } from '../../../../../components/Button/enums';
import { MatchStatus, SeasonStatus } from '../../../../../constants/enums';
import { useRouter } from '../../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { BreakPoints } from '../../../../../theme/theme';
import { MatchRow } from '../../../components/MatchRow/MatchRow';
import { players } from '../../../mock';
import { IPlayersTable, PLAYERS_COLUMNS } from '../../../types';

import { messages } from './messages';

import * as S from './SeasonPreview.style';

interface IProps {
  isOpen: boolean;
  seasonId: string;
  status: SeasonStatus;
}

export const SeasonPreview: React.FC<IProps> = (props) => {
  const { seasonId, status } = props;
  const { navigate } = useRouter();
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const matches: IMatch[] = [];

  const playersTableData = players.map((item) => {
    return { ...item, ratio: Number((item.kills / item.deaths).toFixed(2)) };
  });

  const upcomingMatches = matches?.filter((item) => item.status !== MatchStatus.FINISHED) ?? [];
  const finishedMatches = matches?.filter((item) => item.status === MatchStatus.FINISHED) ?? [];
  const firstFiveUpcomingMatches = upcomingMatches.slice(0, 5);
  const firstFiveFinishedMatches = finishedMatches.slice(0, 5);

  const noUpcomingMatches = upcomingMatches.length === 0;
  const noFinishedMatches = finishedMatches.length === 0;
  const isSeasonActive = status === SeasonStatus.ACTIVE;

  return (
    <Flex vertical>
      <S.Matches>
        {isSeasonActive && (
          <Flex justify="center" vertical>
            <Typography.Title level={4} style={{ textAlign: isSmallerThanMd ? 'start' : 'center' }}>
              <FormattedMessage {...messages.openMatches} />
            </Typography.Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              {!noUpcomingMatches &&
                firstFiveUpcomingMatches.map((item: IMatch) => {
                  return <MatchRow match={item} />;
                })}
            </Space>
          </Flex>
        )}
        <Flex justify="center" vertical>
          <Typography.Title level={4} style={{ textAlign: isSmallerThanMd ? 'start' : 'center' }}>
            <FormattedMessage {...messages.playedMatches} />
          </Typography.Title>
          {noFinishedMatches && <>TODO OBRAZEK SMUTNY PRAZDNY</>}
          {!noFinishedMatches && (
            <>
              <Space direction="vertical" style={{ width: '100%' }}>
                {firstFiveFinishedMatches.map((item: IMatch) => {
                  return <MatchRow match={item} />;
                })}
              </Space>
            </>
          )}
        </Flex>
      </S.Matches>
      <br />
      <Flex justify="space-between" align="center">
        <Typography.Title level={4} style={{ margin: 'auto 0' }}>
          <FormattedMessage {...messages.bestPlayers} />
        </Typography.Title>
        <Button icon={<RightOutlined />} iconPosition={'end'} onClick={() => {}} variant={MainButtonVariant.SECONDARY}>
          <FormattedMessage {...messages.goToStats} />
        </Button>
      </Flex>
      <br />
      <Table<IPlayersTable>
        columns={PLAYERS_COLUMNS(isSmallerThanMd)}
        dataSource={playersTableData as unknown as IPlayersTable[]}
        pagination={false}
      />
      <br />
      <Flex justify="flex-end">
        <Button onClick={() => navigate(Routes.SEASON_DETAIL.replace(':id', seasonId))}>
          <FormattedMessage {...messages.goToDetail} />
        </Button>
      </Flex>
    </Flex>
  );
};
