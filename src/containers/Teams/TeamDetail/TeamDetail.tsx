import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Divider, Flex } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useTeamDetail, useTeamPlayers } from '../../../api/hooks/teams/api';
import { Button } from '../../../components/Button/Button';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { useRouter } from '../../../hooks/RouterHook';

import { Players } from './Players/Players';
import { TeamInfo } from './TeamInfo/TeamInfo';
import { messages } from './messages';

import * as S from '../TeamDetail/TeamDetail.style';

export const TeamDetailCont: React.FC = () => {
  const { query } = useRouter<{ id: string }>();
  const team = useTeamDetail(query.id);

  const teamPlayers = useTeamPlayers(query.id);

  const players =
    teamPlayers.data?.items?.map((player: { id: any; role: any; user: any }) => ({
      key: player.id,
      role: player.role,
      userName: player.user.nickname,
      firstName: player.user.firstName,
      surName: player.user.lastName,
    })) || [];

  return (
    <ContentLayout>
      <Flex align="center" justify="space-between">
        <H1>{team.data?.name}</H1>
        <Button>
          <PlusOutlined />
          <FormattedMessage {...messages.joinBtn} />
        </Button>
      </Flex>
      <Divider style={{ marginTop: 0 }} />
      <S.Content>
        <S.TeamInfo>
          {/* {team.data?.description} */}
          <TeamInfo />
        </S.TeamInfo>
        <S.Members>
          <Players players={players} />
        </S.Members>
      </S.Content>
    </ContentLayout>
  );
};
