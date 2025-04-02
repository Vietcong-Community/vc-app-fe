import React, { useState } from 'react';

import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { faCross } from '@fortawesome/free-solid-svg-icons/faCross';
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag';
import { faSkull } from '@fortawesome/free-solid-svg-icons/faSkull';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons/faUserCheck';
import { faUserXmark } from '@fortawesome/free-solid-svg-icons/faUserXmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from 'antd';
import { FormattedMessage } from 'react-intl';

import { IMap } from '../../../../../api/hooks/interfaces';
import { IMatchPlayer } from '../../../../../api/hooks/league/interfaces';
import { ITeam } from '../../../../../api/hooks/teams/interfaces';
import { AnimatedHeightContainer } from '../../../../../components/Animations/AnimatedHeightContainer/AnimatedHeightContainer';
import { Card } from '../../../../../components/Card/Card';
import { Gap } from '../../../../../components/Gap/Gap';
import { MatchStatus } from '../../../../../constants/enums';
import { theme } from '../../../../../theme/theme';
import { messages } from '../../messages';
import { RemovePlayerFromMatchModal } from '../RemovePlayerFromMatchModal/RemovePlayerFromMatchModal';

import * as S from './Team.style';

export interface ITeamMatchPlayer extends IMatchPlayer {
  isHost?: boolean;
}

interface IProps {
  eloPoints?: number;
  goToPlayerDetail: (id: string) => void;
  goToTeamDetail: (id: string) => void;
  map?: IMap;
  matchId: string;
  matchStatus?: MatchStatus;
  showLineUp: boolean;
  players: ITeamMatchPlayer[];
  playerInMatchIdsAddedToSeasonStatistics: string[];
  team?: ITeam;
}

export const Team: React.FC<IProps> = (props: IProps) => {
  const {
    eloPoints,
    goToPlayerDetail,
    goToTeamDetail,
    map,
    matchId,
    matchStatus,
    players,
    playerInMatchIdsAddedToSeasonStatistics,
    showLineUp,
    team,
  } = props;
  const [isRemovePlayerFromMatchModalOpen, setIsRemovePlayerFromMatchModalOpen] = useState<boolean>(false);
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
    <>
      <Card style={{ textAlign: 'start' }}>
        <S.TeamInfo>
          <div style={{ alignItems: 'center', cursor: 'pointer', display: 'flex', gap: 8, justifyContent: 'center' }}>
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
        {showLineUp && (
          <>
            <Gap defaultHeight={8} />
            <S.LineUpTitle>
              <div onClick={() => setIsOpen((val) => !val)}>
                <FormattedMessage {...messages.lineup} />
              </div>
              <div
                onClick={() => setIsOpen((val) => !val)}
                style={{ alignItems: 'center', display: 'flex', fontSize: 14, gap: 8, justifyContent: 'center' }}
              >
                {isOpen ? (
                  <>
                    <FormattedMessage {...messages.close} />
                    <S.Icon>
                      <UpOutlined />
                    </S.Icon>
                  </>
                ) : (
                  <>
                    <FormattedMessage {...messages.open} />
                    <S.Icon>
                      <DownOutlined />
                    </S.Icon>
                  </>
                )}
              </div>
            </S.LineUpTitle>
            <AnimatedHeightContainer isOpen={isOpen}>
              <Gap defaultHeight={16} />
              {players.length === 0 && <FormattedMessage {...messages.lineupEmpty} />}
              {players.length > 0 && (
                <S.LineUp>
                  {players.map((player: ITeamMatchPlayer) => {
                    const playerStatsSynced = !!playerInMatchIdsAddedToSeasonStatistics.find(
                      (item) => item === player.id,
                    );

                    return (
                      <S.Player>
                        <div
                          style={{
                            cursor: 'pointer',
                            display: 'flex',
                            gap: 8,
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                          }}
                          onClick={() => goToPlayerDetail(player.user.id)}
                        >
                          <Avatar
                            size={24}
                            icon={
                              player.user?.image?.url ? <img src={player.user.image.url} alt="" /> : <UserOutlined />
                            }
                          />
                          <b>
                            {player.isHost ? '(H) ' : ''}
                            {player.user.nickname}
                          </b>
                          <FontAwesomeIcon
                            icon={playerStatsSynced ? faUserCheck : faUserXmark}
                            style={{ color: playerStatsSynced ? theme.colors.green : theme.colors.red }}
                          />
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
                  {(matchStatus === MatchStatus.FINISHED ||
                    matchStatus === MatchStatus.WAITING_FOR_SCORE_CONFIRMATION) && (
                    <S.StatisticsHint>
                      <div>
                        <FontAwesomeIcon icon={faUserCheck} style={{ color: theme.colors.green, marginRight: 4 }} />
                        <FormattedMessage {...messages.statisticsSynced} />
                      </div>
                      <div>
                        <FontAwesomeIcon icon={faUserXmark} style={{ color: theme.colors.red, marginRight: 4 }} />
                        <FormattedMessage {...messages.statisticsNotSynced} />
                      </div>
                    </S.StatisticsHint>
                  )}
                </S.LineUp>
              )}
            </AnimatedHeightContainer>
          </>
        )}
        <Gap defaultHeight={32} />
        <S.LinkButton onClick={navigateToTeam}>
          <FormattedMessage {...messages.goToTeamDetail} />
        </S.LinkButton>
      </Card>
      <RemovePlayerFromMatchModal
        isOpen={isRemovePlayerFromMatchModalOpen}
        onClose={() => setIsRemovePlayerFromMatchModalOpen(false)}
        matchId={matchId}
        playerId={''} // TODO REMOVE
      />
    </>
  );
};
