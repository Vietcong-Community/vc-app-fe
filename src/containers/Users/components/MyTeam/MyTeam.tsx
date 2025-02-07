import React from 'react';

import { SkinOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { FormattedMessage } from 'react-intl';

import { IMeTeams } from '../../../../api/hooks/teams/interfaces';
import { Gap } from '../../../../components/Gap/Gap';
import { mapTeamRoleToTranslation } from '../../../../utils/mappingLabelUtils';

import { messages } from './messages';

import * as S from './MyTeam.style';

interface IProps {
  goToTeamDetail: (id: string) => void;
  team: IMeTeams;
}

export const MyTeam: React.FC<IProps> = (props: IProps) => {
  const { goToTeamDetail, team } = props;

  const getTeamIcon = () => {
    if (team?.team.image?.url) {
      return <img alt="" src={team?.team.image?.url} />;
    }

    return <SkinOutlined />;
  };

  return (
    <S.Container onClick={() => goToTeamDetail(team.team.id)}>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <Avatar size={48} shape={'square'} icon={getTeamIcon()} />
      </div>
      <Gap defaultHeight={8} />
      <S.TeamName>{team.team.name}</S.TeamName>
      <Gap defaultHeight={8} />
      <div style={{ display: 'flex', gap: 4 }}>
        <FormattedMessage {...messages.role} />
        <S.TeamRole>{mapTeamRoleToTranslation(team.userInTeam.role)}</S.TeamRole>
      </div>
    </S.Container>
  );
};
