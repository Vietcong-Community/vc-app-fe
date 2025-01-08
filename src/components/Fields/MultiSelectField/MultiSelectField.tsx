import React, { ReactNode } from 'react';

import { Select, Form, FormRule } from 'antd';

export interface ISelectOptionType {
  disabled?: boolean;
  id?: string | number;
  value: string | number;
  label: ReactNode;
}

interface IProps {
  allowClear?: boolean;
  allowSearch?: boolean;
  disabled?: boolean;
  label: ReactNode;
  name: string;
  options: ISelectOptionType[];
  placeholder?: string;
  required?: boolean;
  rules?: FormRule[];
}

export const MultiSelectField: React.FC<IProps> = (props: IProps) => {
  const {
    allowClear = true,
    allowSearch = true,
    disabled = false,
    label,
    name,
    options,
    placeholder,
    required = true,
    rules,
  } = props;

  return (
    <Form.Item name={name} label={label} required={required} rules={rules} shouldUpdate style={{ marginBottom: 8 }}>
      <Select
        allowClear={allowClear}
        disabled={disabled}
        mode="multiple"
        options={options}
        optionFilterProp="label"
        placeholder={placeholder}
        showSearch={allowSearch}
        style={{ textAlign: 'start', width: '100%' }}
      />
    </Form.Item>
  );
};
