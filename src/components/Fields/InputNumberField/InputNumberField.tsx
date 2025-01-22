import React, { ReactNode } from 'react';

import { Form, FormRule, InputNumber } from 'antd';

import * as S from './InputNumberFeild.style';

interface IProps {
  disabled?: boolean;
  label: ReactNode;
  maxValue?: number;
  minValue?: number;
  name: string | (string | number)[];
  placeholder?: string;
  required?: boolean;
  rules?: FormRule[];
}

export const InputNumberField: React.FC<IProps> = (props: IProps) => {
  const { disabled = false, label, maxValue = 100, minValue = 0, name, placeholder, required = true, rules } = props;

  return (
    <S.InputContainer>
      <Form.Item name={name} label={label} required={required} rules={rules} style={{ marginBottom: 8 }}>
        <InputNumber
          disabled={disabled}
          min={minValue}
          max={maxValue}
          placeholder={placeholder}
          style={{ width: '100%' }}
        />
      </Form.Item>
    </S.InputContainer>
  );
};
