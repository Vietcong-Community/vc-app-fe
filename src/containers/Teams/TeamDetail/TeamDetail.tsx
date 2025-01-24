import React from 'react';

import { Divider, Flex, Space } from 'antd';

import {
  useApproveJoinRequest,
  useJoinTeam,
  useRejectJoinRequest,
  useTeamDetail,
  useTeamPlayers,
} from '../../../api/hooks/teams/api';
import { Button } from '../../../components/Button/Button';
import { ContentLayout } from '../../../components/Layouts/ContentLayout/ContentLayout';
import { H1 } from '../../../components/Titles/H1/H1';
import { useRouter } from '../../../hooks/RouterHook';

export const TeamDetailCont: React.FC = () => {
  const { query } = useRouter<{ id: string }>();
  const team = useTeamDetail(query.id);
  const teamPlayers = useTeamPlayers(query.id);

  const joinTeam = useJoinTeam(query.id);

  const acceptJoinTeam = useApproveJoinRequest(query.id);
  const reject = useRejectJoinRequest(query.id);
  console.log('teamPlayers', teamPlayers);

  return (
    <ContentLayout>
      <Flex align="center" justify="space-between">
        <H1>{team.data?.name}</H1>
      </Flex>
      <Divider style={{ marginTop: 0 }} />
      {team.data?.description}
      // TODO NAMAPOVAT HRACE A PROKLIKY NA NE
      <Space direction="horizontal">
        <Button
          onClick={async () => {
            const response = await joinTeam.mutateAsync();
            console.log(response);
          }}
        >
          JOIN
        </Button>
        <Button
          onClick={async () => {
            const response = await acceptJoinTeam.mutateAsync({ userId: '218a481a-5558-4d20-9008-09b3952ee285' });
            console.log(response);
          }}
        >
          APPROVE
        </Button>
        <Button
          onClick={async () => {
            const response = await reject.mutateAsync({ userId: '218a481a-5558-4d20-9008-09b3952ee285' });
            console.log(response);
          }}
        >
          reject
        </Button>
      </Space>
    </ContentLayout>
  );
};
