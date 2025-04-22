import { CSSProperties, HTMLAttributes } from 'react';

import { Table as AntTable, TableColumnsType, Pagination, PaginationProps } from 'antd';

import { Gap } from '../Gap/Gap';

import * as S from './Table.style';

interface IProps<T> {
  columns: TableColumnsType<T>;
  data: T[];
  loading?: boolean;
  onRow: (row: T) => HTMLAttributes<T>;
  onPageChange: (page: number) => void;
  selectedPage: number;
  setPageSize?: (size: number) => void;
  showSizeChanger?: boolean;
  style?: CSSProperties;
  totalItems?: number;
}

export function TableWithPagination<T>(props: IProps<T>) {
  const {
    columns,
    data,
    loading,
    onRow,
    onPageChange,
    selectedPage,
    setPageSize,
    showSizeChanger = false,
    style,
    totalItems,
  } = props;

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (_currentPage, pageSize) => {
    setPageSize?.(pageSize);
  };

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
        hideOnSinglePage={!showSizeChanger}
        total={totalItems}
        onChange={onPageChange}
        showQuickJumper
        pageSizeOptions={[5, 10, 25, 50, 100]}
        onShowSizeChange={onShowSizeChange}
        showSizeChanger={showSizeChanger}
        style={{ width: '100%' }}
      />
    </S.TableContainer>
  );
}
