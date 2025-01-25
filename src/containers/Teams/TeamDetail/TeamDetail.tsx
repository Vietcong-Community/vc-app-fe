import React from 'react';

import { Divider, Flex } from 'antd';

import { useTeamDetail, useTeamPlayers } from '../../../api/hooks/teams/api';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { useRouter } from '../../../hooks/RouterHook';

import { Players } from './Players/Players';
import { TeamInfo } from './TeamInfo/TeamInfo';

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
      </Flex>
      <Divider style={{ marginTop: 0 }} />
      <S.Content>
        <S.TeamInfo>
          {/* {team.data?.description}
          // TODO NAMAPOVAT HRACE A PROKLIKY NA NE */}
          <TeamInfo />
        </S.TeamInfo>
        <S.Members>
          <Players players={players} />
        </S.Members>
      </S.Content>
    </ContentLayout>
  );
};
