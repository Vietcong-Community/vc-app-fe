import React from 'react';

import { Divider, Flex } from 'antd';

import { useTeamDetail } from '../../../api/hooks/teams/api';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { useRouter } from '../../../hooks/RouterHook';

import { IPlayers, Players } from './Players';

const membersData: IPlayers[] = [
  {
    key: '1',
    role: 'ZCL',
    userName: 'Trapper',
    firstName: 'Vojtík',
    surName: 'Polcarův',
  },
  {
    key: '2',
    role: 'Orga',
    userName: 'Hhacker',
    firstName: 'Vikýno',
    surName: 'Ovečka',
  },
  {
    key: '3',
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
        <H1>{team.data?.name}</H1>
      </Flex>
      <Divider style={{ marginTop: 0 }} />
      {team.data?.description}
      // TODO NAMAPOVAT HRACE A PROKLIKY NA NE
      <Players players={membersData} />
    </ContentLayout>
  );
};
