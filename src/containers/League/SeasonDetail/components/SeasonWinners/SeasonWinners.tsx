import React, { useState } from 'react';

import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { FormattedMessage } from 'react-intl';

import { useSeasonLadder } from '../../../../../api/hooks/league/api';
import { useTeamPlayers } from '../../../../../api/hooks/teams/api';
import { AnimatedHeightContainer } from '../../../../../components/Animations/AnimatedHeightContainer/AnimatedHeightContainer';
import { Card } from '../../../../../components/Card/Card';
import { Frame } from '../../../../../components/Frame/Frame';
import { FrameType } from '../../../../../components/Frame/enums';
import { Gap } from '../../../../../components/Gap/Gap';
import { useRouter } from '../../../../../hooks/RouterHook';
import { useWindowDimensions } from '../../../../../hooks/WindowDimensionsHook';
import { Routes } from '../../../../../routes/enums';
import { BreakPoints } from '../../../../../theme/theme';

import { messages } from './messages';

import * as S from './SeasonWinners.style';

interface IProps {
  seasonId: string;
  firstTeamId: string;
  secondTeamId: string;
  thirdTeamId: string;
}

export const SeasonWinners: React.FC<IProps> = (props: IProps) => {
  const { seasonId, firstTeamId, secondTeamId, thirdTeamId } = props;
  const { width } = useWindowDimensions();
  const { navigate } = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(width >= BreakPoints.md);
  const { data } = useSeasonLadder(seasonId);

  // Najdi týmy podle ID
  const firstTeam = data?.items.find((item) => item.team.id === firstTeamId) || null;
  const secondTeam = data?.items.find((item) => item.team.id === secondTeamId) || null;
  const thirdTeam = data?.items.find((item) => item.team.id === thirdTeamId) || null;
  const goToTeamDetail = (id: string) => {
    if (id) {
      navigate(Routes.TEAM_DETAIL.replace(':id', id));
    }
  };

  const { data: firstTeamPlayersData } = useTeamPlayers(firstTeam?.team.id);
  const playersOfFirstTeam = firstTeamPlayersData?.items ?? [];
  const { data: secondTeamPlayersData } = useTeamPlayers(secondTeam?.team.id);
  const playersOfSecondTeam = secondTeamPlayersData?.items ?? [];
  const { data: thirdTeamPlayersData } = useTeamPlayers(thirdTeam?.team.id);
  const playersOfThirdTeam = thirdTeamPlayersData?.items ?? [];

  const goToPlayerDetail = (id: string) => {
    if (id) {
      navigate(Routes.USER_PROFILE.replace(':id', id));
    }
  };

  return (
    <Card>
      <Flex justify="space-between">
        <S.CardTitle>
          <FormattedMessage {...messages.title} />
        </S.CardTitle>
        <div
          onClick={() => setIsOpen((val) => !val)}
          style={{
            alignItems: 'center',
            cursor: 'pointer',
            display: 'flex',
            fontSize: 14,
            gap: 8,
            justifyContent: 'center',
          }}
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
      </Flex>
      <AnimatedHeightContainer isOpen={isOpen}>
        <Gap defaultHeight={24} />
        <S.Content>
          <S.TeamContainer>
            <S.FrameContainer onClick={() => goToTeamDetail(secondTeamId)}>
              <Frame frameType={FrameType.SILVER} src={secondTeam?.team.image?.url ?? ''} size={125} />
            </S.FrameContainer>
            <Card>
              <S.TeamName>2. {secondTeam?.team.name}</S.TeamName>
              <S.TeamLineUp>
                {playersOfSecondTeam.map((player, index) => (
                  <span key={player.id} style={{ cursor: 'pointer' }} onClick={() => goToPlayerDetail(player.user.id)}>
                    {player.user.nickname}
                    {index < playersOfSecondTeam.length - 1 && ', '}
                  </span>
                ))}
              </S.TeamLineUp>
            </Card>
          </S.TeamContainer>

          <S.TeamContainer>
            <S.FrameContainer onClick={() => goToTeamDetail(firstTeamId)}>
              <Frame frameType={FrameType.GOLD} src={firstTeam?.team.image?.url ?? ''} size={160} />
            </S.FrameContainer>
            <Card>
              <S.TeamName>1. {firstTeam?.team.name}</S.TeamName>
              <S.TeamLineUp>
                {playersOfFirstTeam.map((player, index) => (
                  <span key={player.id} style={{ cursor: 'pointer' }} onClick={() => goToPlayerDetail(player.user.id)}>
                    {player.user.nickname}
                    {index < playersOfFirstTeam.length - 1 && ', '}
                  </span>
                ))}
              </S.TeamLineUp>
            </Card>
          </S.TeamContainer>

          <S.TeamContainer>
            <S.FrameContainer onClick={() => goToTeamDetail(thirdTeamId)}>
              <Frame frameType={FrameType.BRONZE} src={thirdTeam?.team.image?.url ?? ''} size={90} />
            </S.FrameContainer>
            <Card>
              <S.TeamName>3. {thirdTeam?.team.name}</S.TeamName>
              <S.TeamLineUp>
                {playersOfThirdTeam.map((player, index) => (
                  <span key={player.id} style={{ cursor: 'pointer' }} onClick={() => goToPlayerDetail(player.user.id)}>
                    {player.user.nickname}
                    {index < playersOfThirdTeam.length - 1 && ', '}
                  </span>
                ))}
              </S.TeamLineUp>
            </Card>
          </S.TeamContainer>
        </S.Content>
      </AnimatedHeightContainer>
    </Card>
  );
};
