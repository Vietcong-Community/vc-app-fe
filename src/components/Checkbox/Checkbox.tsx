import React, { ReactNode } from 'react';

import { Form, Checkbox, FormRule } from 'antd';

interface IProps {
  disabled?: boolean;
  label: ReactNode; // Text vedle checkboxu
  name: string; // Název pole
  required?: boolean; // Povinné pole
  rules?: FormRule[]; // Validační pravidla
  defaultChecked?: boolean; // Výchozí stav checkboxu
}

export const CheckboxField: React.FC<IProps> = (props) => {
  const { disabled = false, label, name, required = false, rules, defaultChecked = false } = props;

  return (
    <Form.Item
      name={name}
      valuePropName="checked" // Klíčové pro správu hodnoty checkboxu
      required={required}
      rules={rules}
    >
      <Checkbox disabled={disabled} defaultChecked={defaultChecked}>
        {label}
      </Checkbox>
    </Form.Item>
  );
};
