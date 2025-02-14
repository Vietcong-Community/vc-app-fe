import React, { ReactNode } from 'react';

import { Input, Form, FormRule } from 'antd';

import * as S from './InputAreaField.style';

interface IProps {
  disabled?: boolean;
  label?: ReactNode;
  name: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  rules?: FormRule[];
}

export const InputAreaField: React.FC<IProps> = (props: IProps) => {
  const { disabled = false, label, name, placeholder, required = true, rows = 4, rules } = props;

  return (
    <S.InputContainer>
      <Form.Item name={name} label={label} required={required} rules={rules} style={{ marginBottom: 8 }}>
        <Input.TextArea disabled={disabled} placeholder={placeholder} rows={rows} style={{ width: '100%' }} />
      </Form.Item>
    </S.InputContainer>
  );
};
