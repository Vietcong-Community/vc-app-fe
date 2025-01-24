import React, { ReactNode } from 'react';

import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';
import { Gap } from '../../Gap/Gap';

import * as S from './ContentLayout.style';

interface IBreadcrumb {
  title?: ReactNode;
  key: string;
  onClick?: () => void;
}

interface IProps {
  children?: ReactNode;
  breadcrumbItems?: IBreadcrumb[];
}

export const ContentLayout: React.FC<IProps> = (props: IProps) => {
  const { children, breadcrumbItems } = props;
  const { navigate } = useRouter();

  const showBreadcrumb = breadcrumbItems && breadcrumbItems.length > 0;

  const breadcrumbs: IBreadcrumb[] = [
    {
      key: 'bc-home',
      onClick: () => navigate(Routes.HOME),
      title: <HomeOutlined style={{ cursor: 'pointer', fontSize: 16 }} />,
    },
    ...(breadcrumbItems ?? []),
  ];

  return (
    <S.Container>
      {showBreadcrumb && (
        <>
          <Gap defaultHeight={16} height={{ sm: 8 }} />
          <Breadcrumb items={breadcrumbs} separator=">" style={{ fontSize: 16 }} />
          <Gap defaultHeight={16} height={{ sm: 8 }} />
        </>
      )}
      {children}
    </S.Container>
  );
};
