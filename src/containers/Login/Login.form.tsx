import React from 'react';

import { Button, Checkbox, Form, Input, Row, Col } from 'antd';

export const LoginForm: React.FC = () => {
  const onSubmitSuccess = (values: object) => {
    console.log('Úspěšné přihlášení:', values);
  };
  const onSubmitFailed = (errorInfo: object) => {
    console.log('Chyba při přihlášení:', errorInfo);
  };

  return (
    <>
    <h3>Přihlášení</h3>
    <Row justify="center"
    align="middle"
    style={{
      minHeight: '80vh', // Nastavení výšky, posun výš (můžeš upravit podle potřeby)
      marginTop: '-191px',  // Upravení vertikálního zarovnání
      marginLeft: '-120px'
    }}>
    <Col>
      <Form
        name="basic"
        labelCol={{
          span: 11,
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
          <Button htmlType="submit">
            Přihlásit
          </Button>
        </Form.Item>
      </Form>
      </Col>
      </Row>
      </>
  );
};
