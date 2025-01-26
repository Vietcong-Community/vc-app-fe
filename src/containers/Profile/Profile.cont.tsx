import React from 'react';

import { EditOutlined, FacebookFilled, TwitchFilled, UserOutlined } from '@ant-design/icons';
import { faGamepad } from '@fortawesome/free-solid-svg-icons/faGamepad';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Spin } from 'antd';
import { compact } from 'lodash';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserDetail } from '../../api/hooks/users/api';
import { Card } from '../../components/Card/Card';
import { Gap } from '../../components/Gap/Gap';
import { ContentLayout } from '../../components/Layouts/ContentLayout/ContentLayout';
import { useRouter } from '../../hooks/RouterHook';
import { useWindowDimensions } from '../../hooks/WindowDimensionsHook';
import { Routes } from '../../routes/enums';
import { BreakPoints } from '../../theme/theme';
import { formatDateForUser } from '../../utils/dateUtils';

import { messages } from './messages';

import * as S from './Profile.style';

export const ProfileCont: React.FC = () => {
  const { navigate, query } = useRouter<{ id: string }>();
  const { formatMessage } = useIntl();
  const { width } = useWindowDimensions();
  const isSmallerThanMD = width < BreakPoints.md;

  const userDetail = useUserDetail(query.id);

  const showLoading = userDetail.isLoading;

  const getUserIcon = () => {
    if (userDetail.data?.image?.url) {
      return <img alt="" src={userDetail.data?.image?.url} />;
    }

    return <UserOutlined />;
  };

  return (
    <ContentLayout breadcrumbItems={[{ key: 'bc-profile', title: <FormattedMessage {...messages.title} /> }]}>
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={32} height={{ md: 16 }} />
      {showLoading && <Spin size="large" />}
      {!showLoading && (
        <S.Container>
          <S.PlayerInfo>
            <Avatar size={175} icon={getUserIcon()} />
            <Card style={{ maxWidth: isSmallerThanMD ? 'initial' : 550, position: 'relative', textAlign: 'start' }}>
              <S.EditProfileIcon onClick={() => navigate(Routes.EDIT_PROFILE.replace(':id', query.id))}>
                <EditOutlined />
              </S.EditProfileIcon>
              <S.Nickname>{userDetail.data?.nickname}</S.Nickname>
              <S.PersonName>{compact([userDetail.data?.firstName, userDetail.data?.lastName]).join(' ')}</S.PersonName>
              <S.PersonName>
                <FormattedMessage {...messages.createdAt} />
                {formatDateForUser(userDetail.data?.createdAt)}
              </S.PersonName>
              <Gap defaultHeight={16} />
              <S.Socials>
                <FormattedMessage {...messages.socials} />
                {!userDetail.data?.facebookLink && !userDetail.data?.twitchLink && !userDetail.data?.steamLink && (
                  <FormattedMessage {...messages.nothingHere} />
                )}
                {userDetail.data?.facebookLink && (
                  <a href={userDetail.data?.facebookLink} target={'_blank'}>
                    <S.IconWrapper>
                      <FacebookFilled />
                    </S.IconWrapper>
                  </a>
                )}
                {userDetail.data?.twitchLink && (
                  <a href={userDetail.data?.twitchLink} target={'_blank'}>
                    <S.IconWrapper>
                      <TwitchFilled />
                    </S.IconWrapper>
                  </a>
                )}
                {userDetail.data?.steamLink && (
                  <a href={userDetail.data?.steamLink} target={'_blank'}>
                    <S.IconWrapper>
                      <FontAwesomeIcon icon={faGamepad} />
                    </S.IconWrapper>
                  </a>
                )}
              </S.Socials>
            </Card>
          </S.PlayerInfo>
          <Gap defaultHeight={32} height={{ md: 16 }} />
          <S.Description>
            {userDetail.data?.description ?? <FormattedMessage {...messages.description} />}
          </S.Description>
          <Gap defaultHeight={32} height={{ md: 16 }} />
        </S.Container>
      )}
      <Gap defaultHeight={48} height={{ md: 32 }} />
    </ContentLayout>
  );
};
