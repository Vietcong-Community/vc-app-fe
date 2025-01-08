import React from 'react';

import { Table, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

export interface IMatch {
  key: string;
  date: string;
  result: 'win' | 'draw' | 'loss';
  flagsCaptured: number;
  kills: number;
  deaths: number;
  points: number;
}

interface IMatchHistoryProps {
  matches: IMatch[];
}

const kdColor = (kd: number) => {
  if (kd > 1) return '#5ca10d';
  return '#d81349';
};

const resultColor = {
  win: 'green',
  loss: 'red',
  draw: 'orange',
};

const pointsColor = (points: number) => {
  if (points > 0) return 'green';
  if (points === 0) return 'black';
  return 'red';
};

export const MatchHistory: React.FC<IMatchHistoryProps> = ({ matches }) => {
  const columns: ColumnsType<IMatch> = [
    {
      title: 'Datum',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Výsledek',
      dataIndex: 'result',
      key: 'result',
      render: (result: 'win' | 'draw' | 'loss') => (
        <Tag color={resultColor[result]}>{result === 'win' ? 'Výhra' : result === 'draw' ? 'Remíza' : 'Prohra'}</Tag>
      ),
    },
    {
      title: 'Vlajky',
      dataIndex: 'flagsCaptured',
      key: 'flagsCaptured',
    },
    {
      title: 'Zabití',
      dataIndex: 'kills',
      key: 'kills',
    },
    {
      title: 'Smrtí',
      dataIndex: 'deaths',
      key: 'deaths',
    },
    {
      title: 'K/D Poměr',
      key: 'kdRatio',
      render: (record) => (
        <Text style={{ color: kdColor(record.kills / (record.deaths || 1)) }}>
          {(record.kills / (record.deaths || 1)).toFixed(2)}
        </Text>
      ),
    },

    {
      title: 'Body',
      dataIndex: 'points',
      key: 'points',
      render: (points: number) => <Tag color={pointsColor(points)}>{points > 0 ? `+${points}` : points}</Tag>,
    },
  ];

  return (
    <div style={{ width: '85%', margin: '0 auto' }}>
      <Table
        columns={columns}
        dataSource={matches}
        pagination={{ pageSize: 5 }}
        rowKey="key"
        title={() => <Text strong>Player name or league TBD</Text>}
      />
    </div>
  );
};
