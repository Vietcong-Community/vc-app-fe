import React, { CSSProperties, ReactNode } from 'react';

import { Collapse as AntDCollapse } from 'antd';

import * as S from './Collapse.style';

interface IProps {
  customStyle?: CSSProperties;
  defaultActiveKey?: Array<string | number> | string | number;
  destroyInactivePanel?: boolean;
  items: {
    children: ReactNode;
    key: string | number;
    label: ReactNode;
  }[];
}

export const Collapse: React.FC<IProps> = (props: IProps) => {
  const { customStyle, defaultActiveKey, destroyInactivePanel = true, items } = props;

  return (
    <S.Container>
      <AntDCollapse
        defaultActiveKey={defaultActiveKey}
        destroyInactivePanel={destroyInactivePanel}
        items={items}
        style={customStyle}
        expandIconPosition="end"
      />
    </S.Container>
  );
};
