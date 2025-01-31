import { CSSProperties, HTMLAttributes } from 'react';

import { TablePaginationConfig, Table as AntTable, TableColumnsType } from 'antd';

import * as S from './Table.style';

interface IProps<T> {
  columns: TableColumnsType<T>;
  data: T[];
  loading?: boolean;
  onRow?: (row: T) => HTMLAttributes<T>;
  pagination?: TablePaginationConfig;
  style?: CSSProperties;
}

export function Table<T>(props: IProps<T>) {
  const { columns, data, loading, onRow, pagination, style } = props;

  return (
    <S.TableContainer>
      <AntTable<T>
        columns={columns}
        dataSource={data}
        loading={loading}
        onRow={onRow}
        pagination={pagination}
        style={{ width: '100%', ...style }}
      />
    </S.TableContainer>
  );
}
