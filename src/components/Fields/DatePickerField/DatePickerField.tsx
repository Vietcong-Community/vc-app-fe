import React, { ReactNode } from 'react';

import { DatePicker, Form, FormRule } from 'antd';
import { Dayjs } from 'dayjs';

export const DEFAULT_USER_DATE_FORMAT = 'DD. MM. YYYY';
export const DEFAULT_SYSTEM_DATE_FORMAT = 'YYYY-MM-DD';

interface IProps {
  disabled?: boolean;
  format?: string;
  label: ReactNode;
  minimalDate?: Dayjs;
  maximalDate?: Dayjs;
  name: string;
  placeholder?: string;
  required?: boolean;
  rules?: FormRule[];
  showTime?: boolean;
}

export const DatePickerField: React.FC<IProps> = (props: IProps) => {
  const {
    disabled = false,
    format = DEFAULT_USER_DATE_FORMAT,
    label,
    minimalDate,
    maximalDate,
    name,
    placeholder,
    required = true,
    rules,
    showTime = false,
  } = props;

  return (
    <Form.Item name={name} label={label} required={required} rules={rules} style={{ marginBottom: 8 }}>
      <DatePicker
        disabled={disabled}
        format={format}
        placeholder={placeholder}
        minDate={minimalDate}
        maxDate={maximalDate}
        showTime={showTime}
        style={{ width: '100%' }}
      />
    </Form.Item>
  );
};
