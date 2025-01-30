import { CSSProperties, HTMLAttributes } from 'react';

import { Table as AntTable, TableColumnsType, Pagination } from 'antd';

import { Gap } from '../Gap/Gap';

import * as S from './Table.style';

interface IProps<T> {
  columns: TableColumnsType<T>;
  data: T[];
  loading?: boolean;
  onRow: (row: T) => HTMLAttributes<T>;
  onPageChange: (page: number) => void;
  selectedPage: number;
  style?: CSSProperties;
  totalItems?: number;
}

export function TableWithPagination<T>(props: IProps<T>) {
  const { columns, data, loading, onRow, onPageChange, selectedPage, style, totalItems } = props;

  return (
    <S.TableContainer>
      <AntTable<T>
        columns={columns}
        dataSource={data}
        loading={loading}
        onRow={onRow}
        pagination={false}
        style={{ width: '100%', ...style }}
      />
      <Gap defaultHeight={16} />
      <Pagination
        align={'end'}
        responsive
        current={selectedPage}
        defaultPageSize={10}
        hideOnSinglePage
        total={totalItems}
        onChange={onPageChange}
        showQuickJumper
        showSizeChanger={false}
        style={{ width: '100%' }}
      />
    </S.TableContainer>
  );
}
