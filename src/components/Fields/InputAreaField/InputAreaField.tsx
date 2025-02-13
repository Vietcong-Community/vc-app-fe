import React, { ReactNode } from 'react';

import { Input, Form, FormRule, Flex } from 'antd';

import { Gap } from '../../Gap/Gap';

import * as S from './InputAreaField.style';

interface IProps {
  disabled?: boolean;
  label?: ReactNode;
  maxLength?: number;
  name: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  rules?: FormRule[];
  showCount?: boolean;
  valueLength?: number;
}

export const InputAreaField: React.FC<IProps> = (props: IProps) => {
  const {
    disabled = false,
    label,
    maxLength,
    name,
    placeholder,
    required = true,
    rows = 4,
    rules,
    showCount = false,
    valueLength,
  } = props;

  return (
    <S.InputContainer>
      <Form.Item name={name} label={label} required={required} rules={rules} style={{ marginBottom: 8 }}>
        <Input.TextArea
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          style={{ width: '100%' }}
        />
      </Form.Item>
      {showCount && (
        <>
          <Flex justify="end" style={{ fontSize: 12 }}>
            ({valueLength ?? 0}/{maxLength})
          </Flex>
          <Gap defaultHeight={8} />
        </>
      )}
    </S.InputContainer>
  );
};
