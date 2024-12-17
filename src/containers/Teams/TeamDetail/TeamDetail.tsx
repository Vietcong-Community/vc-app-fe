import React from 'react';

import { Divider, Flex } from 'antd';

import { useTeamDetail } from '../../../api/hooks/teams/api';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { useRouter } from '../../../hooks/RouterHook';

import { ManageMenu } from './components/ManageMenu/ManageMenu';

export const TeamDetailCont: React.FC = () => {
  const { query } = useRouter<{ id: string }>();
  const team = useTeamDetail(query.id);

  console.log(query.id);
  return (
    <ContentLayout>
      <Flex align="center" justify="space-between">
        <H1>{team.data?.name}</H1>
        <ManageMenu />
      </Flex>
      <Divider style={{ marginTop: 0 }} />
      {team.data?.description}
      // TODO NAMAPOVAT HRACE A PROKLIKY NA NE
    </ContentLayout>
  );
};
