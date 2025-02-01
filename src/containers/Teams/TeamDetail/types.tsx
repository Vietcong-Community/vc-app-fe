import { ReactNode } from 'react';

import { TableColumnsType } from 'antd';
import { FormattedMessage } from 'react-intl';

import { messages } from '../../League/messages';

export interface IMatchesTableRow {
  id: string;
  date: string;
  status: ReactNode;
  result: string;
  opponentTeamName: string;
}

export const MATCH_COLUMNS = (hidden: boolean): TableColumnsType<IMatchesTableRow> => {
  return [
    { title: <FormattedMessage {...messages.matchDate} />, dataIndex: 'date', key: '0', defaultSortOrder: 'descend' },
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
