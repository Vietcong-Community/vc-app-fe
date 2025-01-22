import React from 'react';

import { Form as AntDForm, FormInstance } from 'antd';

export interface IProps<T> {
  children?: React.ReactNode;
  form: FormInstance<T>;
  initialValues?: Partial<T>;
  layout?: 'horizontal' | 'inline' | 'vertical';
  requiredMark?: boolean;
  onSubmit: (values: T) => void;
  scrollToFirstError?: boolean;
  validateTrigger?: string | string[] | false;
}

export function FormComponent<T>(props: IProps<T>) {
  const {
    children,
    form,
    initialValues,
    layout = 'vertical',
    onSubmit,
    requiredMark = true,
    scrollToFirstError = true,
    validateTrigger = 'onBlur',
  } = props;

  return (
    <AntDForm
      form={form}
      initialValues={initialValues}
      onFinish={onSubmit}
      scrollToFirstError={scrollToFirstError}
      requiredMark={requiredMark}
      layout={layout}
      validateTrigger={validateTrigger}
    >
      {children}
    </AntDForm>
  );
}
