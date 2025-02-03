import React from 'react';

import { Tabs, Row, Col, Form, UploadFile } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button } from '../../../components/Button/Button';
import { InputAreaField } from '../../../components/Fields/InputAreaField/InputAreaField';
import { InputField } from '../../../components/Fields/InputField/InputField';
import { UploadField } from '../../../components/Fields/UploadField/UploadField';
import { FormComponent } from '../../../components/Form/FormComponent';
import { Gap } from '../../../components/Gap/Gap';
import { H2 } from '../../../components/Titles/H2/H2';
import { parseToLowerCase, removeWhiteSpaces } from '../../../utils/formUtils';

import { fields, IFormData } from './EditProfile.fields';
import { messages } from './messages';

interface IProps {
  fileList: UploadFile[];
  initialValues?: Partial<IFormData>;
  isSubmitting: boolean;
  onSubmit: (values: IFormData) => void;
  setFileList: (files: UploadFile[]) => void;
}

export const EditProfileForm: React.FC<IProps> = (props: IProps) => {
  const { fileList, initialValues, isSubmitting, onSubmit, setFileList } = props;
  const { formatMessage } = useIntl();
  const [form] = Form.useForm<IFormData>();

  return (
    <FormComponent form={form} initialValues={initialValues} onSubmit={onSubmit}>
      <H2>
        <FormattedMessage {...messages.title} />
      </H2>
      <Row gutter={24} justify="center">
        <Col
          xs={24}
          md={6}
          lg={4}
          style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <UploadField fileList={fileList} setFileList={setFileList} />
          <Gap defaultHeight={16} />
          <b>
            <FormattedMessage {...messages.avatar} />
          </b>
        </Col>
        <Col xs={2} md={2} lg={1}>
          <Gap defaultHeight={32} height={{ sm: 12 }} />
        </Col>
        {/* Right Side - Tabs and Form */}
        <Col xs={24} md={10} lg={8}>
          <Tabs
            defaultActiveKey="edit-profile-tab-1"
            items={[
              {
                children: (
                  <>
                    <InputField
                      {...fields.nickname}
                      label={<FormattedMessage {...messages.nicknameLabel} />}
                      placeholder={formatMessage(messages.nicknameLabel)}
                    />
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
                      {...fields.email}
                      label={<FormattedMessage {...messages.emailLabel} />}
                      placeholder={formatMessage(messages.emailLabel)}
                      normalize={(value) => parseToLowerCase(removeWhiteSpaces(value))}
                    />
                  </>
                ),
                key: 'edit-profile-tab-1',
                label: <FormattedMessage {...messages.personalDataTab} />,
              },
              {
                children: (
                  <>
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
                      {...fields.steamLink}
                      label={<FormattedMessage {...messages.steamLinkLabel} />}
                      placeholder={formatMessage(messages.steamLinkLabel)}
                    />
                  </>
                ),
                key: 'edit-profile-tab-2',
                label: <FormattedMessage {...messages.socialDataTab} />,
              },
              {
                children: (
                  <>
                    <InputAreaField
                      {...fields.description}
                      label={<FormattedMessage {...messages.descriptionLabel} />}
                      placeholder={formatMessage(messages.descriptionLabel)}
                    />
                  </>
                ),
                key: 'edit-profile-tab-3',
                label: <FormattedMessage {...messages.otherDataTab} />,
              },
            ]}
          />
          <div style={{ textAlign: 'right', marginTop: '16px' }}>
            <Button loading={isSubmitting} type="submit">
              <FormattedMessage {...messages.editProfileButton} />
            </Button>
          </div>
        </Col>
      </Row>
    </FormComponent>
  );
};
