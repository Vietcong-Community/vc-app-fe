import React, { ReactNode } from 'react';

import { Input, Form, FormRule } from 'antd';

import * as S from './InputField.style';

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
    <S.InputContainer>
      <Form.Item name={name} label={label} required={required} rules={rules} style={{ marginBottom: 8 }}>
        <Input disabled={disabled} placeholder={placeholder} style={{ width: '100%' }} />
      </Form.Item>
    </S.InputContainer>
  );
};
