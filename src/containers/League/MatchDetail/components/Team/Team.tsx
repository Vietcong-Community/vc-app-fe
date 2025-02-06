import React, { useState } from 'react';

import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { faCross } from '@fortawesome/free-solid-svg-icons/faCross';
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag';
import { faSkull } from '@fortawesome/free-solid-svg-icons/faSkull';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from 'antd';
import { FormattedMessage } from 'react-intl';

import { IMap } from '../../../../../api/hooks/interfaces';
import { IMatchPlayer } from '../../../../../api/hooks/league/interfaces';
import { ITeam } from '../../../../../api/hooks/teams/interfaces';
import { AnimatedHeightContainer } from '../../../../../components/Animations/AnimatedHeightContainer/AnimatedHeightContainer';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { messages } from '../../messages';

import * as S from './Team.style';

interface IProps {
  eloPoints?: number;
  goToTeamDetail: (id: string) => void;
  map?: IMap;
  players: IMatchPlayer[];
  team?: ITeam;
}

export const Team: React.FC<IProps> = (props: IProps) => {
  const { eloPoints, goToTeamDetail, map, players, team } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigateToTeam = () => {
    if (team?.id) {
      goToTeamDetail(team.id);
    }
  };

  const getTeamIcon = () => {
    if (team?.image?.url) {
      return <img alt="" src={team?.image?.url} />;
    }

    return <UserOutlined />;
  };

  return (
    <Card style={{ textAlign: 'start' }}>
      <S.TeamInfo>
        <div style={{ alignItems: 'center', display: 'flex', gap: 8, justifyContent: 'center' }}>
          <Avatar shape="square" size={48} icon={getTeamIcon()} style={{ minWidth: 48 }} />
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

      <S.ELO>
        <FormattedMessage {...messages.map} />
        <span>{map?.name ?? ''}</span>
      </S.ELO>
      <Gap defaultHeight={8} />
      <S.LineUpTitle>
        <div onClick={() => setIsOpen((val) => !val)}>
          <FormattedMessage {...messages.lineup} />
        </div>
        <S.Icon onClick={() => setIsOpen((val) => !val)}>{isOpen ? <UpOutlined /> : <DownOutlined />}</S.Icon>
      </S.LineUpTitle>
      <AnimatedHeightContainer isOpen={isOpen}>
        <Gap defaultHeight={16} />
        {players.length === 0 && <FormattedMessage {...messages.lineupEmpty} />}
        {players.length > 0 && (
          <S.LineUp>
            {players.map((player: IMatchPlayer) => {
              return (
                <S.Player>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Avatar
                      size={24}
                      icon={player.user?.image?.url ? <img src={player.user.image.url} alt="" /> : <UserOutlined />}
                    />
                    <b>{player.user.nickname}</b>
                  </div>
                  <Gap defaultHeight={8} />
                  <S.Statistics>
                    <div>
                      <FontAwesomeIcon icon={faFlag} /> {player.flags}
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faSkull} /> {player.kills}
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCross} /> {player.deaths}
                    </div>
                  </S.Statistics>
                </S.Player>
              );
            })}
          </S.LineUp>
        )}
      </AnimatedHeightContainer>
      <Gap defaultHeight={32} />
      <S.LinkButton onClick={navigateToTeam}>
        <FormattedMessage {...messages.goToTeamDetail} />
      </S.LinkButton>
    </Card>
  );
};
