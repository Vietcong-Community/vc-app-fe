import React, { useState } from 'react';

import { EditOutlined, FacebookFilled, TwitchFilled, UserOutlined } from '@ant-design/icons';
import { faGamepad } from '@fortawesome/free-solid-svg-icons/faGamepad';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons/faSquarePlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Spin } from 'antd';
import { compact } from 'lodash';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import { useUserDetail, useUserTeams } from '../../../api/hooks/users/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { Card } from '../../../components/Card/Card';
import { Divider } from '../../../components/Divider/Divider';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H2 } from '../../../components/Titles/H2/H2';
import { useRouter } from '../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../routes/enums';
import { BreakPoints } from '../../../theme/theme';
import { formatDateForUser } from '../../../utils/dateUtils';
import { CreateTeamModalForm } from '../components/CreateTeamModal/CreateTeamModal.form';
import { MyTeam } from '../components/MyTeam/MyTeam';

import { messages } from './messages';

import * as S from './Profile.style';

export const ProfileCont: React.FC = () => {
  const { navigate, query } = useRouter<{ id: string }>();
  const { formatMessage } = useIntl();
  const { width } = useWindowDimensions();
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState<boolean>(false);
  const isSmallerThanMD = width < BreakPoints.md;

  const userMe = useUserMe('always', [401]);
  const userDetail = useUserDetail(query.id);
  const userTeams = useUserTeams(query.id);

  const showLoading = userDetail.isLoading;
  const showActionsOnProfile = userMe.data?.id === query.id;

  const getUserIcon = () => {
    if (userDetail.data?.image?.url) {
      return <img alt="" src={userDetail.data?.image?.url} />;
    }

    return <UserOutlined />;
  };

  const goToTeamDetail = (id: string) => {
    navigate(Routes.TEAM_DETAIL.replace(':id', id));
  };

  const redirectToLink = (url: string) => {
    if (url.startsWith('https://') || url.startsWith('http://')) {
      return url;
    }

    return `https://${url}`;
  };

  const showRealName = userDetail.data?.firstName || userDetail.data?.lastName;

  return (
    <ContentLayout breadcrumbItems={[{ key: 'bc-profile', title: <FormattedMessage {...messages.title} /> }]}>
      <Helmet title={formatMessage(messages.title)} />
      <Gap defaultHeight={32} height={{ md: 16 }} />
      {showLoading && <Spin size="large" />}
      <EaseInOutContainer isOpen={!showLoading}>
        <S.Container>
          <S.PlayerInfo>
            <Avatar size={175} icon={getUserIcon()} />
            <Card style={{ maxWidth: isSmallerThanMD ? 'initial' : 550, position: 'relative', textAlign: 'start' }}>
              {showActionsOnProfile && (
                <S.EditProfileIcon onClick={() => navigate(Routes.EDIT_PROFILE.replace(':id', query.id))}>
                  <EditOutlined />
                </S.EditProfileIcon>
              )}
              <S.Nickname>{userDetail.data?.nickname}</S.Nickname>
              <S.PersonName>
                {showRealName && compact([userDetail.data?.firstName, userDetail.data?.lastName]).join(' ')}
              </S.PersonName>
              <S.PersonName>
                <FormattedMessage {...messages.createdAt} />
                {formatDateForUser(userDetail.data?.createdAt)}
              </S.PersonName>
              <Gap defaultHeight={16} />
              <S.Socials>
                {userDetail.data?.facebookLink && (
                  <a href={redirectToLink(userDetail.data?.facebookLink)} target={'_blank'}>
                    <S.IconWrapper>
                      <FacebookFilled />
                    </S.IconWrapper>
                  </a>
                )}
                {userDetail.data?.twitchLink && (
                  <a href={redirectToLink(userDetail.data?.twitchLink)} target={'_blank'}>
                    <S.IconWrapper>
                      <TwitchFilled />
                    </S.IconWrapper>
                  </a>
                )}
                {userDetail.data?.steamLink && (
                  <a href={redirectToLink(userDetail.data?.steamLink)} target={'_blank'}>
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
            <Card>{userDetail.data?.description ?? <FormattedMessage {...messages.description} />}</Card>
          </S.Description>
        </S.Container>
      </EaseInOutContainer>
      <Gap defaultHeight={16} height={{ md: 8 }} />
      <EaseInOutContainer isOpen={!userTeams.isLoading}>
        <S.MyTeamsTitle>
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <H2>
              <FormattedMessage {...messages.myTeamsTitle} />
            </H2>
            {showActionsOnProfile && (
              <S.IconContainer onClick={() => setIsCreateTeamOpen(true)}>
                <FontAwesomeIcon icon={faSquarePlus} />
              </S.IconContainer>
            )}
          </div>
          <Divider style={{ margin: 'auto', maxWidth: 740 }} />
        </S.MyTeamsTitle>
        <Gap defaultHeight={16} />
        <S.MyTeamsContainer>
          {userTeams.data?.items.length === 0 ? (
            <FormattedMessage {...messages.noTeams} />
          ) : (
            <>{userTeams.data?.items.map((item) => <MyTeam goToTeamDetail={goToTeamDetail} team={item} />)}</>
          )}
        </S.MyTeamsContainer>
      </EaseInOutContainer>
      <Gap defaultHeight={48} height={{ md: 32 }} />
      <CreateTeamModalForm isOpen={isCreateTeamOpen} onClose={() => setIsCreateTeamOpen(false)} />
    </ContentLayout>
  );
};
