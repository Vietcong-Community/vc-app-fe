import React from 'react';

import { UserOutlined, HeartOutlined } from '@ant-design/icons';
import { Card, Avatar, Typography, Row, Col } from 'antd';

import * as S from './UserInfo.style';

const { Title, Text } = Typography;

interface IProfileInfoProps {
  user: {
    name: string;
    nickname: string;
    inGameName: string;
    avatar?: string;
  };
}

export const UserInfo: React.FC<IProfileInfoProps> = ({ user }) => {
  return (
    <>
      <Card className={S.Card}>
        <Avatar
          size={150}
          icon={<UserOutlined />}
          src={user.avatar} // Lze využít user.avatar pro dynamickou fotku
          style={{ marginBottom: 16 }}
        />
        <Title level={3}>{user.nickname}</Title>
        <Row justify="center" gutter={[8, 8]}>
          <Col>
            <Text strong>
              <UserOutlined /> {user.name}
            </Text>
          </Col>
          <Col>
            <Text strong>
              <HeartOutlined /> {user.inGameName}
            </Text>
          </Col>
        </Row>
      </Card>
    </>
  );
};
