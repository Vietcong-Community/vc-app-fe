import React, { useState, ReactNode } from 'react';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input, Form, FormRule } from 'antd';

interface IProps {
  disabled?: boolean;
  label: ReactNode;
  name: string;
  placeholder?: string;
  required?: boolean;
  rules?: FormRule[];
}

export const PasswordField: React.FC<IProps> = (props: IProps) => {
  const { disabled = false, label, name, placeholder, required = true, rules } = props;
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!visible);

  return (
    <Form.Item name={name} label={label} required={required} rules={rules} style={{ marginBottom: 8 }}>
      <Input
        disabled={disabled}
        placeholder={placeholder}
        type={visible ? 'text' : 'password'}
        style={{ width: '100%' }}
        suffix={
          <span onClick={toggleVisibility} style={{ cursor: 'pointer' }}>
            {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </span>
        }
      />
    </Form.Item>
  );
};
