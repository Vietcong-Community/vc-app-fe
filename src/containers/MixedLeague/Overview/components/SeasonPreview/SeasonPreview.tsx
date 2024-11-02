import React from 'react';

import { RightOutlined } from '@ant-design/icons';
import { Flex, Table, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import { Button } from '../../../../../components/Button/Button';
import { useRouter } from '../../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { BreakPoints } from '../../../../../theme/theme';

import { messages } from './messages';
import { players } from './mock';
import { IPlayersTable, PLAYERS_COLUMNS } from './types';

import * as S from './SeasonPreview.style';

interface IProps {
  seasonId: string;
}

export const SeasonPreview: React.FC<IProps> = (props) => {
  const { seasonId } = props;
  const { navigate } = useRouter();
  const { width } = useWindowDimensions();
  const isSmallerThanMd = width < BreakPoints.md;

  const playersTableData = players.map((item) => {
    return { ...item, ratio: Number((item.kills / item.deaths).toFixed(2)) };
  });

  return (
    <Flex vertical>
      <S.Matches>
        <Flex justify="center" vertical>
          <Typography.Title level={4} style={{ textAlign: isSmallerThanMd ? 'start' : 'center' }}>
            <FormattedMessage {...messages.openMatches} />
          </Typography.Title>
          TODO NEJAKE ZAAPSY CO SE BUDOU HRAT A FALLBACK KDYZ NIC
        </Flex>
        <Flex justify="center" vertical>
          <Typography.Title level={4} style={{ textAlign: isSmallerThanMd ? 'start' : 'center' }}>
            <FormattedMessage {...messages.playedMatches} />
          </Typography.Title>
          TODO Poslednich 5 zapasu a proklik na ne
          <br />
          TODO Poslednich 5 zapasu a proklik na ne
          <br />
          TODO Poslednich 5 zapasu a proklik na ne
          <br />
          TODO Poslednich 5 zapasu a proklik na ne
          <br />
          TODO Poslednich 5 zapasu a proklik na ne
        </Flex>
      </S.Matches>
      <br />
      <Flex justify="space-between" align="center">
        <Typography.Title level={4} style={{ margin: 'auto 0' }}>
          <FormattedMessage {...messages.bestPlayers} />
        </Typography.Title>
        <Button icon={<RightOutlined />} iconPosition={'end'} onClick={() => {}} variant="default">
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
