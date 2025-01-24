import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export const BreadcrumbItem: React.FC<IProps> = (props: IProps) => {
  const { children } = props;

  return <span style={{ cursor: 'pointer' }}>{children}</span>;
};
