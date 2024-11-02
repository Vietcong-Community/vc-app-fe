import React, { ReactNode } from 'react';

import { Input, Form, FormRule } from 'antd';

interface IProps {
  disabled?: boolean;
  label: ReactNode;
  name: string;
  placeholder?: string;
  required?: boolean;
  rules?: FormRule[];
}

export const InputField: React.FC<IProps> = (props: IProps) => {
  const { disabled = false, label, name, placeholder, required = true, rules } = props;

  return (
    <Form.Item name={name} label={label} required={required} rules={rules}>
      <Input disabled={disabled} placeholder={placeholder} style={{ width: '100%' }} />
    </Form.Item>
  );
};
