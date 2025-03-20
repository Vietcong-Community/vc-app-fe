import React, { CSSProperties, ReactNode } from 'react';

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
  customStyle?: CSSProperties;
  disabled?: boolean;
  label?: ReactNode;
  name: string;
  onCustomChange?: (value: string | number) => void;
  options: ISelectOptionType[];
  mode?: 'multiple' | 'tags';
  placeholder?: string;
  required?: boolean;
  rules?: FormRule[];
}

export const SelectField: React.FC<IProps> = (props: IProps) => {
  const {
    allowClear = true,
    allowSearch = true,
    customStyle,
    disabled = false,
    label,
    mode,
    name,
    onCustomChange,
    options,
    placeholder,
    required = true,
    rules,
  } = props;

  return (
    <Form.Item
      name={name}
      label={label}
      required={required}
      rules={rules}
      shouldUpdate
      style={{ marginBottom: 8, ...customStyle }}
    >
      <Select
        allowClear={allowClear}
        disabled={disabled}
        mode={mode}
        options={options}
        onChange={onCustomChange}
        optionFilterProp="label"
        placeholder={placeholder}
        showSearch={allowSearch}
        style={{ textAlign: 'start', width: '100%' }}
      />
    </Form.Item>
  );
};
