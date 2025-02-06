import { ReactNode } from 'react';

import { TableColumnsType } from 'antd';
import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

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
      title: <FormattedMessage {...messages.matches} />,
      render: (_, record) => {
        return (
          <>
            <b>
              <FormattedMessage {...messages.opponent} />
            </b>
            : <b>{record.opponentTeamName}</b>
            <br />
            <FormattedMessage {...messages.result} />: <b>{record.result}</b>
            <br />
            <FormattedMessage {...messages.matchStatus} />: <b>{record.status}</b>
          </>
        );
      },
      hidden: !hidden,
    },
    {
      title: <FormattedMessage {...messages.opponent} />,
      dataIndex: 'opponentTeamName',
      key: '2',
      hidden,
    },
    {
      title: <FormattedMessage {...messages.result} />,
      align: 'center',
      dataIndex: 'result',
      key: '3',
      hidden,
    },
    {
      align: 'center',
      title: <FormattedMessage {...messages.matchStatus} />,
      dataIndex: 'status',
      key: '4',
      hidden,
    },
  ];
};
