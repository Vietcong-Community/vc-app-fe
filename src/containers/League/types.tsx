import { ReactNode } from 'react';

import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { faHandshake } from '@fortawesome/free-solid-svg-icons/faHandshake';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableColumnsType } from 'antd';
import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

import * as S from './League.style';

export interface IMatchesTableRow {
  id: string;
  date: string;
  status: ReactNode;
  result: string;
  challengerTeamName: string;
  opponentTeamName: string;
}

export const MATCH_COLUMNS = (hidden: boolean): TableColumnsType<IMatchesTableRow> => {
  return [
    { title: <FormattedMessage {...messages.matchDate} />, dataIndex: 'date', key: '0', defaultSortOrder: 'descend' },
    {
      title: <FormattedMessage {...messages.challenger} />,
      dataIndex: 'challengerTeamName',
      key: '1',
    },
    {
      title: <FormattedMessage {...messages.opponent} />,
      dataIndex: 'opponentTeamName',
      key: '2',
    },
    {
      title: <FormattedMessage {...messages.result} />,
      dataIndex: 'result',
      key: '3',
    },
    {
      title: <FormattedMessage {...messages.matchStatus} />,
      dataIndex: 'status',
      key: '4',
      hidden,
    },
  ];
};

export interface ILadderTableRow {
  id: string;
  position: number;
  name: string;
  countOfMatches: number;
  wins: number;
  draws: number;
  loses: number;
  winRate: string;
  eloPoints: number;
  seasonTeamId: string;
}

export const LADDER_COLUMNS = (
  showShortLabels: boolean,
  canUserManageMatch: boolean,
  goToCreateMatch?: (id: string) => void,
  goToTeamDetail?: (id: string) => void,
  myTeamId?: string,
): TableColumnsType<ILadderTableRow> => {
  return [
    {
      title: showShortLabels ? (
        <FormattedMessage {...messages.teamPositionShortcut} />
      ) : (
        <FormattedMessage {...messages.teamPosition} />
      ),
      dataIndex: 'position',
      key: '0',
      defaultSortOrder: 'descend',
    },
    { title: <FormattedMessage {...messages.teamName} />, dataIndex: 'name', key: '1' },
    {
      title: <FormattedMessage {...messages.countOfMatches} />,
      dataIndex: 'countOfMatches',
      key: '2',
      hidden: showShortLabels,
      sorter: (a, b) => b.countOfMatches - a.countOfMatches,
    },
    {
      title: <FormattedMessage {...messages.wins} />,
      dataIndex: 'wins',
      key: '3',
      hidden: showShortLabels,
      sorter: (a, b) => b.wins - a.wins,
    },
    {
      title: <FormattedMessage {...messages.draws} />,
      dataIndex: 'draws',
      key: '4',
      hidden: showShortLabels,
      sorter: (a, b) => b.draws - a.draws,
    },
    {
      title: <FormattedMessage {...messages.loses} />,
      dataIndex: 'loses',
      key: '5',
      hidden: showShortLabels,
      sorter: (a, b) => b.loses - a.loses,
    },
    {
      title: <FormattedMessage {...messages.winRate} />,
      dataIndex: 'winRate',
      key: '6',
      hidden: showShortLabels,
      sorter: (a, b) => {
        return Number(b.winRate.replace(' %', '')) - Number(a.winRate.replace(' %', ''));
      },
    },
    {
      title: <FormattedMessage {...messages.points} />,
      dataIndex: 'eloPoints',
      key: '7',
      hidden: showShortLabels,
      sorter: (a, b) => b.eloPoints - a.eloPoints,
    },
    {
      title: <FormattedMessage {...messages.actions} />,
      dataIndex: '',
      key: '8',
      align: 'center',
      render: (_, record) => {
        return (
          <S.Icons>
            {record.id !== myTeamId && canUserManageMatch ? (
              <FontAwesomeIcon icon={faHandshake} onClick={() => goToCreateMatch?.(record.seasonTeamId)} />
            ) : (
              <div style={{ width: 22.5 }} />
            )}
            <FontAwesomeIcon icon={faCircleInfo} onClick={() => goToTeamDetail?.(record.id)} />
          </S.Icons>
        );
      },
    },
  ];
};
