import { TableColumnsType } from 'antd';

export interface IPlayersTable {
  id: string;
  name: string;
  played: number;
  kills: number;
  flags: number;
  deaths: number;
  ratio: number;
  points: number;
}

export const PLAYERS_COLUMNS = (hidden: boolean): TableColumnsType<IPlayersTable> => {
  return [
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
