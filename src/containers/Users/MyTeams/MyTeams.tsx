import React, { useState } from 'react';

import { faSquarePlus } from '@fortawesome/free-solid-svg-icons/faSquarePlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { FormattedMessage, useIntl } from 'react-intl';

import { useUserMe } from '../../../api/hooks/auth/api';
import { useMeTeams } from '../../../api/hooks/teams/api';
import { EaseInOutContainer } from '../../../components/Animations/EaseInOutContainer/EaseInOutContainer';
import { Divider } from '../../../components/Divider/Divider';
import { Gap } from '../../../components/Gap/Gap';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { useRouter } from '../../../hooks/RouterHook';
import { Routes } from '../../../routes/enums';
import { CreateTeamModalForm } from '../components/CreateTeamModal/CreateTeamModal.form';
import { MyTeam } from '../components/MyTeam/MyTeam';

import { messages } from './messages';

import * as S from './MyTeams.style';

export const MyTeams: React.FC = () => {
  const { navigate } = useRouter();
  const { formatMessage } = useIntl();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const userMe = useUserMe();
  const myTeams = useMeTeams();

  const goToTeamDetail = (id: string) => {
    navigate(Routes.TEAM_DETAIL.replace(':id', id));
  };

  return (
    <ContentLayout
      breadcrumbItems={[
        {
          key: 'bc-profile',
          onClick: () => navigate(Routes.USER_PROFILE.replace(':id', userMe.data?.id ?? '')),
          title: userMe.data?.nickname ?? <FormattedMessage {...messages.profile} />,
        },
        {
          key: 'bc-teams',
          title: <FormattedMessage {...messages.teams} />,
        },
      ]}
    >
      <Helmet title={formatMessage(messages.title)} />
      {myTeams.isLoading && (
        <>
          <Gap defaultHeight={32} />
          <Spin size="large" />
        </>
      )}
      <EaseInOutContainer isOpen={!myTeams.isLoading}>
        <Flex align="center" justify="space-between" style={{ gap: 16, textAlign: 'start' }}>
          <H1>
            <FormattedMessage {...messages.teams} />
          </H1>
          <S.IconContainer onClick={() => setIsModalOpen(true)}>
            <FontAwesomeIcon icon={faSquarePlus} />
          </S.IconContainer>
        </Flex>
        <Divider style={{ marginBottom: 16 }} />
        {myTeams.data?.items.length === 0 ? (
          <>
            <Gap defaultHeight={32} />
            <FormattedMessage {...messages.noTeams} />
          </>
        ) : (
          <S.MyTeamsContainer>
            {myTeams.data?.items.map((item) => {
              return <MyTeam goToTeamDetail={goToTeamDetail} team={item} />;
            })}
          </S.MyTeamsContainer>
        )}
      </EaseInOutContainer>
      <Gap defaultHeight={32} />
      <CreateTeamModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </ContentLayout>
  );
};
