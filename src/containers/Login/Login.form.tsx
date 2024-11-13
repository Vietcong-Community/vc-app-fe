import React from 'react';

import { Button, Checkbox, Form, Input, Row, Col } from 'antd';

import loginPic from '../../assets/loginPic.png';

export const LoginForm: React.FC = () => {
  const onSubmitSuccess = (values: object) => {
    console.log('Úspěšné přihlášení:', values);
  };
  const onSubmitFailed = (errorInfo: object) => {
    console.log('Chyba při přihlášení:', errorInfo);
  };

  return (
    <>
      <br />
      <br />
      <br />
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: '80vh',
          marginTop: '-191px',
        }}
      >
        <Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
          <img src={loginPic} alt="Voják na loginu" style={{ maxWidth: '100%', height: 'auto' }} />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form
            layout="vertical"
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
            <h2 style={{ marginLeft: '-180px', marginTop: '10px', marginBottom: '30px' }}>Přihlášení</h2>
            <br />
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
                offset: 5.5,
                span: 16,
              }}
            >
              <Checkbox>Zapamatuj si mě</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 5.5,
                span: 16,
              }}
            >
              <Button htmlType="submit">Přihlásit</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
