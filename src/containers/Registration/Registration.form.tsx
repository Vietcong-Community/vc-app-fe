import React from 'react';

import { Button, Checkbox, Form, Input } from 'antd';

export const RegistrationForm: React.FC = () => {
  const onSubmitSuccess = (values: object) => {
    console.log('Úspěšná registrace:', values);
  };
  const onSubmitFailed = (errorInfo: object) => {
    console.log('Chyba při registraci:', errorInfo);
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
          label="Jméno"
          name="name"
          rules={[
            {
              required: false,
              message: 'Zadejte své jméno, prosím!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Příjmení"
          name="surname"
          rules={[
            {
              required: false,
              message: 'Zadejte své příjmení, prosím!',
            },
          ]}
        >
          <Input />
        </Form.Item>

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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Zadejte svůj email, prosím!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <br />

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
          label="Heslo znovu"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Potvrďte heslo, prosím!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Hesla se neshodují!'));
              },
            }),
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
          name="agreement"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Musíte souhlasit s podmínkami!')),
            },
          ]}
        >
          <Checkbox>
            Souhlasím s <a href="www.google.com/obchodni_podminky">podmínkami používání</a>
          </Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Registrovat
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
