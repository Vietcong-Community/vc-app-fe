import { TableColumnsType } from 'antd';
import { FormattedMessage } from 'react-intl';

import { messages } from './messages';

export interface IMapTableRow {
  id: string;
  name: string;
  official: string;
}

export const MAP_COLUMNS: TableColumnsType<IMapTableRow> = [
  {
    title: <FormattedMessage {...messages.idTable} />,
    dataIndex: 'id',
    key: '0',
    align: 'center',
  },
  {
    title: <FormattedMessage {...messages.name} />,
    dataIndex: 'name',
    key: '1',
    align: 'center',
  },
  {
    title: <FormattedMessage {...messages.officialTable} />,
    dataIndex: 'official',
    key: '2',
    align: 'center',
  },
];
