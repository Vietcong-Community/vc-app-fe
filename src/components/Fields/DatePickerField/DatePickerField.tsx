import React, { ReactNode } from 'react';

import { DatePicker, Form, FormRule } from 'antd';
import { Dayjs } from 'dayjs';

export const DEFAULT_USER_DATE_FORMAT = 'DD. MM. YYYY, HH:mm';
export const DEFAULT_SYSTEM_DATE_FORMAT = 'YYYY-MM-DD';
export const DEFAULT_SYSTEM_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';

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
        minuteStep={15}
        disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
        hideDisabledOptions
        maxDate={maximalDate}
        showTime={showTime}
        style={{ width: '100%' }}
      />
    </Form.Item>
  );
};
