import { ReactNode } from 'react';

import { TableColumnsType } from 'antd';

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
