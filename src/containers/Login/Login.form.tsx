import React from 'react';

import { Button, Checkbox, Form, Input } from 'antd';

export const LoginForm: React.FC = () => {
  const onSubmitSuccess = (values: any) => {
    console.log('Úspěšné přihlášení:', values);
  };
  const onSubmitFailed = (errorInfo: any) => {
    console.log('Chyba při přihlášení:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmitSuccess}
        onFinishFailed={onSubmitFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Uživatelské jméno"
          name="username"
          rules={[
            {
              required: true,
              message: 'Zadejte uživatelské jméno, prosím!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Heslo"
          name="password"
          rules={[
            {
              required: true,
              message: 'Zadejte heslo, prosím!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Zapamatuj si mě</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
