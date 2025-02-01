import { TableColumnsType, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';

import { theme } from '../../../../../theme/theme';

import { messages } from './messages';

export interface IEloPointsRow {
  result: string;
  challengerPoints: number;
  opponentPoints: number;
}

export const ELO_POINTS_COLUMNS = (challenger?: string, opponent?: string): TableColumnsType<IEloPointsRow> => {
  return [
    {
      title: <FormattedMessage {...messages.result} />,
      dataIndex: 'result',
      align: 'center',
      key: '0',
    },
    {
      title: challenger,
      dataIndex: 'challengerPoints',
      align: 'center',
      key: '1',
      render: (_, record) => {
        const getColor = () => {
          if (record.challengerPoints > 0) {
            return theme.colors.green;
          }

          if (record.challengerPoints < 0) {
            return theme.colors.red;
          }
          return '';
        };

        return <Tag color={getColor()}>{record.challengerPoints}</Tag>;
      },
    },
    {
      align: 'center',
      title: opponent,
      dataIndex: 'opponentPoints',
      key: '2',
      render: (_, record) => {
        const getColor = () => {
          if (record.opponentPoints > 0) {
            return theme.colors.green;
          }

          if (record.opponentPoints < 0) {
            return theme.colors.red;
          }
          return '';
        };

        return <Tag color={getColor()}>{record.opponentPoints}</Tag>;
      },
    },
  ];
};
