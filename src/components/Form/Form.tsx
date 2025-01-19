import React from 'react';

import { Form as AntDForm } from 'antd';

export interface IProps<T> {
  children?: React.ReactNode;
  initialValues?: Partial<T>;
  layout?: 'horizontal' | 'inline' | 'vertical';
  onSubmit: (values: T) => void;
  scrollToFirstError?: boolean;
  validateTrigger?: string | string[] | false;
}

export function Form<T>(props: IProps<T>) {
  const {
    children,
    initialValues,
    layout = 'vertical',
    onSubmit,
    scrollToFirstError = true,
    validateTrigger = 'onBlur',
  } = props;
  const [form] = AntDForm.useForm<T>();

  return (
    <AntDForm
      form={form}
      initialValues={initialValues}
      onFinish={onSubmit}
      scrollToFirstError={scrollToFirstError}
      layout={layout}
      validateTrigger={validateTrigger}
    >
      {children}
    </AntDForm>
  );
}
