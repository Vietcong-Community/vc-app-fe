import { ReactNode } from 'react';

import { TableColumnsType } from 'antd';
import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

export interface IPlayersTable {
  id: string;
  order: number;
  name: string;
  played: number;
  kills: number;
  flags: number;
  deaths: number;
  ratio: number;
  points: number;
}

export interface IMatchesTable {
  id: string;
  date: string;
  status: ReactNode;
  result: string;
  firstCaptain: string;
  secondCaptain: string;
}

export const PLAYERS_COLUMNS = (hidden: boolean): TableColumnsType<IPlayersTable> => {
  return [
    { dataIndex: 'order', key: '0' },
    { title: 'Hráč', dataIndex: 'name', key: '1' },
    {
      title: 'Počet zápasů',
      dataIndex: 'played',
      key: '2',
      hidden,
      sorter: (a, b) => a.played - b.played,
    },
    {
      title: 'Vlajky',
      dataIndex: 'flags',
      key: '3',
      hidden,
      sorter: (a, b) => a.flags - b.flags,
    },
    {
      title: 'Zabití',
      dataIndex: 'kills',
      key: '4',
      hidden,
      sorter: (a, b) => a.kills - b.kills,
    },
    {
      title: 'Úmrtí',
      dataIndex: 'deaths',
      key: '5',
      hidden,
      sorter: (a, b) => a.deaths - b.deaths,
    },
    {
      title: 'K/D',
      dataIndex: 'ratio',
      key: '6',
      hidden,
      sorter: (a, b) => a.ratio - b.ratio,
    },
    {
      title: 'Body',
      dataIndex: 'points',
      key: '7',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.points - b.points,
    },
  ];
};

export const MATCH_COLUMNS = (hidden: boolean): TableColumnsType<IMatchesTable> => {
  return [
    { title: 'Datum', dataIndex: 'date', key: '0', defaultSortOrder: 'descend' },
    { title: 'Stav', dataIndex: 'status', key: '1' },
    {
      title: 'Kapitán 1',
      dataIndex: 'firstCaptain',
      key: '2',
      hidden,
    },
    {
      title: 'Kapitán 2',
      dataIndex: 'secondCaptain',
      key: '3',
    },
    {
      title: 'Výsledek',
      dataIndex: 'result',
      key: '4',
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
}

export const LADDER_COLUMNS = (showShortLabels: boolean): TableColumnsType<ILadderTableRow> => {
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
    },
    {
      title: <FormattedMessage {...messages.wins} />,
      dataIndex: 'wins',
      key: '3',
      hidden: showShortLabels,
    },
    {
      title: <FormattedMessage {...messages.draws} />,
      dataIndex: 'draws',
      key: '4',
      hidden: showShortLabels,
    },
    {
      title: <FormattedMessage {...messages.loses} />,
      dataIndex: 'loses',
      key: '5',
      hidden: showShortLabels,
    },
  ];
};
