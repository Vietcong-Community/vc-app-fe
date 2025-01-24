import React from 'react';

import { Divider, Flex } from 'antd';

import { useTeamDetail } from '../../../api/hooks/teams/api';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { useRouter } from '../../../hooks/RouterHook';

import { IPlayers, Players } from './Players/Players';
import { TeamInfo } from './TeamInfo/TeamInfo';

import * as S from '../TeamDetail/TeamDetail.style';

const membersData: IPlayers[] = [
  {
    key: '1',
    role: 'Kapitán',
    userName: 'Basccino',
    firstName: 'Martin',
    surName: 'Chotětický',
  },
  {
    key: '2',
    role: 'Zástupce',
    userName: 'Trapper',
    firstName: 'Vojtík',
    surName: 'Polcarův',
  },
  {
    key: '3',
    role: 'Orga',
    userName: 'Hhacker',
    firstName: 'Vikýno',
    surName: 'Ovečka',
  },
  {
    key: '4',
    role: 'Člen',
    userName: 'Hhapper',
    firstName: 'Viktěch',
    surName: 'Bercar',
  },
];

export const TeamDetailCont: React.FC = () => {
  const { query } = useRouter<{ id: string }>();
  const team = useTeamDetail(query.id);

  return (
    <ContentLayout>
      <Flex align="center" justify="space-between">
        <H1>Testing Bascco Team</H1>
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
          <Players players={membersData} />
        </S.Members>
      </S.Content>
    </ContentLayout>
  );
};
