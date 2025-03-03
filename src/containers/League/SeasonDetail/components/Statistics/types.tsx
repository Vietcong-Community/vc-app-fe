import { TableColumnsType } from 'antd';
import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

export interface IStatisticTableRow {
  id: string;
  nickname: string;
  flags: number;
  kills: number;
  deaths: number;
  kd: number;
  usefulness: number;
}

export const STATISTICS_COLUMNS = (isMobile: boolean): TableColumnsType<IStatisticTableRow> => {
  return [
    {
      title: <FormattedMessage {...messages.position} />,
      dataIndex: 'position',
      key: '0',
      defaultSortOrder: 'descend',
      align: 'center',
    },
    {
      title: <FormattedMessage {...messages.nickname} />,
      hidden: isMobile,
      key: '1',
      align: 'start',
      dataIndex: 'nickname',
    },
    {
      title: <FormattedMessage {...messages.flags} />,
      dataIndex: 'flags',
      key: '2',
      align: 'center',
      hidden: isMobile,
      sorter: (a, b) => b.flags - a.flags,
    },
    {
      title: <FormattedMessage {...messages.kills} />,
      dataIndex: 'kills',
      key: '3',
      align: 'center',
      hidden: isMobile,
      sorter: (a, b) => b.kills - a.kills,
    },
    {
      title: <FormattedMessage {...messages.deaths} />,
      dataIndex: 'deaths',
      align: 'center',
      key: '4',
      hidden: isMobile,
      sorter: (a, b) => b.deaths - a.deaths,
    },
    {
      title: <FormattedMessage {...messages.kd} />,
      align: 'center',
      key: '5',
      hidden: isMobile,
      render: (_, item) => item.kd.toFixed(2),
      sorter: (a, b) => b.kd - a.kd,
    },
    {
      title: <FormattedMessage {...messages.usefulness} />,
      dataIndex: 'usefulness',
      align: 'center',
      key: '6',
      hidden: isMobile,
      sorter: (a, b) => b.usefulness - a.usefulness,
    },
    {
      title: <FormattedMessage {...messages.nickname} />,
      hidden: !isMobile,
      render: (_, item) => {
        return (
          <>
            <b>{item?.nickname}</b>
            <br />
            {item.flags}
            <br />
            {item.kills}
            <br />
            {item.deaths}
            <br />
            {item.kd.toFixed(2)}
            <br />
            {item.usefulness}
          </>
        );
      },
    },
  ];
};
