import React from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { Tabs, Form, Row, Col, Upload } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import avatar from '../../assets/avatars/avatar_us_web.webp';
import { Button } from '../../components/Button/Button';
import { InputField } from '../../components/Fields/InputField/InputField';

import { fields } from './EditProfile.fields';
import { messages } from './messages';

import * as S from './EditProfile.style';

const { TabPane } = Tabs;

export const EditProfileForm: React.FC = () => {
  const { formatMessage } = useIntl();
  const handleTabChange = (key: string) => {
    console.log('Current tab:', key);
  };

  const handlePhotoChange = (info: any) => {
    console.log('Photo updated:', info);
  };
  return (
    <>
      <S.Container>
        <S.Highlight2>
          <FormattedMessage {...messages.title} />
        </S.Highlight2>
        <Row gutter={24}>
          <Col span={8} style={{ textAlign: 'center' }}>
            <img
              src={avatar}
              alt="Profile"
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '18px',
              }}
            />
            <Upload onChange={handlePhotoChange} showUploadList={false}>
              <Button icon={<UploadOutlined />}>
                <FormattedMessage {...messages.uploadPhotoButton} />
              </Button>
            </Upload>
          </Col>

          {/* Right Side - Tabs and Form */}
          <Col span={16}>
            <Tabs defaultActiveKey="1" onChange={handleTabChange}>
              <TabPane tab={<FormattedMessage {...messages.personalDataTab} />} key="1">
                <Form layout="vertical">
                  <InputField
                    {...fields.firstName}
                    label={<FormattedMessage {...messages.nameLabel} />}
                    placeholder={formatMessage(messages.nameLabel)}
                  />
                  <InputField
                    {...fields.lastName}
                    label={<FormattedMessage {...messages.surnameLabel} />}
                    placeholder={formatMessage(messages.surnameLabel)}
                  />
                  <InputField
                    {...fields.username}
                    label={<FormattedMessage {...messages.usernameLabel} />}
                    placeholder={formatMessage(messages.usernameLabel)}
                  />
                  <InputField
                    {...fields.playerName}
                    label={<FormattedMessage {...messages.playerNameLabel} />}
                    placeholder={formatMessage(messages.playerNameLabel)}
                  />
                </Form>
              </TabPane>
              <TabPane tab={<FormattedMessage {...messages.socialDataTab} />} key="2">
                <Form layout="vertical">
                  <InputField
                    {...fields.facebookLink}
                    label={<FormattedMessage {...messages.facebookLinkLabel} />}
                    placeholder={formatMessage(messages.facebookLinkLabel)}
                  />
                  <InputField
                    {...fields.twitchLink}
                    label={<FormattedMessage {...messages.twitchLinkLabel} />}
                    placeholder={formatMessage(messages.twitchLinkLabel)}
                  />
                  <InputField
                    {...fields.steamName}
                    label={<FormattedMessage {...messages.steamNameLabel} />}
                    placeholder={formatMessage(messages.steamNameLabel)}
                  />
                </Form>
              </TabPane>
              <TabPane tab={<FormattedMessage {...messages.otherDataTab} />} key="3">
                <Form layout="vertical">
                  <InputField
                    {...fields.originalTeam}
                    label={<FormattedMessage {...messages.originalTeamLabel} />}
                    placeholder={formatMessage(messages.originalTeamLabel)}
                  />
                  <InputField
                    {...fields.favouriteTeam}
                    label={<FormattedMessage {...messages.favouriteTeamLabel} />}
                    placeholder={formatMessage(messages.favouriteTeamLabel)}
                  />
                  <InputField
                    {...fields.description}
                    label={<FormattedMessage {...messages.descriptionLabel} />}
                    placeholder={formatMessage(messages.descriptionLabel)}
                  />
                </Form>
              </TabPane>
            </Tabs>
            <div style={{ textAlign: 'right', marginTop: '16px' }}>
              <Button type="submit">
                <FormattedMessage {...messages.editProfileButton} />
              </Button>
            </div>
          </Col>
        </Row>
      </S.Container>
    </>
  );
};
