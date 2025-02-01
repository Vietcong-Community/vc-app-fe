import React, { useState } from 'react';

import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { FormattedMessage } from 'react-intl';

import { ITeam } from '../../../../../api/hooks/teams/interfaces';
import { AnimatedHeightContainer } from '../../../../../components/Animations/AnimatedHeightContainer/AnimatedHeightContainer';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { messages } from '../../messages';

import * as S from './Team.style';

interface IProps {
  eloPoints?: number;
  goToTeamDetail: (id: string) => void;
  team?: ITeam;
}

export const Team: React.FC<IProps> = (props: IProps) => {
  const { eloPoints, goToTeamDetail, team } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigateToTeam = () => {
    if (team?.id) {
      goToTeamDetail(team.id);
    }
  };

  const getUserIcon = () => {
    if (team?.image?.url) {
      return <img alt="" src={team?.image?.url} />;
    }

    return <UserOutlined />;
  };

  return (
    <Card style={{ textAlign: 'start' }}>
      <S.TeamInfo>
        <div style={{ alignItems: 'center', display: 'flex', gap: 8, justifyContent: 'center' }}>
          <Avatar shape="square" size={48} icon={getUserIcon()} style={{ minWidth: 48 }} />
          <S.TeamLabel onClick={navigateToTeam}>{team?.name ?? ''}</S.TeamLabel>
        </div>
        <S.TeamTag>{team?.tag ?? ''}</S.TeamTag>
      </S.TeamInfo>
      {eloPoints && (
        <>
          <Gap defaultHeight={8} />
          <S.ELO>
            <FormattedMessage {...messages.eloTitle} />
            <span>{eloPoints}</span>
          </S.ELO>
        </>
      )}
      <Gap defaultHeight={8} />
      <S.LineUpTitle>
        <div onClick={() => setIsOpen((val) => !val)}>
          <FormattedMessage {...messages.lineup} />
        </div>
        <S.Icon onClick={() => setIsOpen((val) => !val)}>{isOpen ? <UpOutlined /> : <DownOutlined />}</S.Icon>
      </S.LineUpTitle>
      <AnimatedHeightContainer isOpen={isOpen}>
        <Gap defaultHeight={16} />
        <FormattedMessage {...messages.lineupTBA} />
      </AnimatedHeightContainer>
      <Gap defaultHeight={32} />
      <S.LinkButton onClick={navigateToTeam}>
        <FormattedMessage {...messages.goToTeamDetail} />
      </S.LinkButton>
    </Card>
  );
};
