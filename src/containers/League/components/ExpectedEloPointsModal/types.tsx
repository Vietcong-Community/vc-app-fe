import { TableColumnsType, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';

import { theme } from '../../../../theme/theme';

import { messages } from './messages';

export interface IEloPointsRow {
  result: string;
  newEloChallenger: number;
  challengerPoints: number;
  opponentPoints: number;
  newEloOpponent: number;
}

export const ELO_POINTS_COLUMNS = (
  hiddenColumns: boolean,
  challenger?: string,
  opponent?: string,
): TableColumnsType<IEloPointsRow> => {
  return [
    {
      title: <FormattedMessage {...messages.result} />,
      dataIndex: 'result',
      align: 'center',
      key: '0',
    },
    {
      title: <FormattedMessage {...messages.newEloPoints} />,
      dataIndex: 'newEloChallenger',
      align: 'center',
      key: '1',
      hidden: hiddenColumns,
    },
    {
      title: <span style={{ whiteSpace: 'nowrap' }}>{challenger}</span>,
      dataIndex: 'challengerPoints',
      align: 'center',
      key: '2',
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
      title: <span style={{ whiteSpace: 'nowrap' }}>{opponent}</span>,
      dataIndex: 'opponentPoints',
      key: '3',
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
    {
      title: <FormattedMessage {...messages.newEloPoints} />,
      dataIndex: 'newEloOpponent',
      align: 'center',
      key: '4',
      hidden: hiddenColumns,
    },
  ];
};
