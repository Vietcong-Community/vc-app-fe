import { IMatchPlayer, IMatchRound, ISeasonTeamItem } from '../api/hooks/league/interfaces';
import { IMeTeams } from '../api/hooks/teams/interfaces';
import { ITeamMatchPlayer } from '../components/Match/Team/Team';
import { TeamRole } from '../constants/enums';

export interface ICanHandleMatch {
  allowed: boolean;
  myTeamId?: string;
}

export const canUserManageMatch = (
  userTeams: IMeTeams[],
  seasonTeams: ISeasonTeamItem[],
  challengerId?: string,
  opponentId?: string,
): ICanHandleMatch => {
  const myTeamInSeason = seasonTeams.find((item) => item.userIsMemberOfTeam);

  if (!myTeamInSeason) {
    return { allowed: false };
  }

  if (
    !!challengerId &&
    myTeamInSeason.team?.team?.id !== challengerId &&
    !!opponentId &&
    myTeamInSeason.team?.team?.id !== opponentId
  ) {
    return { allowed: false, myTeamId: myTeamInSeason?.team?.team?.id };
  }

  const userTeamInSeason = userTeams.find((item) => {
    return item.team.id === myTeamInSeason?.team.team.id;
  });

  if (!userTeamInSeason) {
    return { allowed: false, myTeamId: myTeamInSeason?.team?.team?.id };
  }

  return {
    allowed:
      userTeamInSeason.userInTeam.role === TeamRole.MATCH_ORGANIZER ||
      userTeamInSeason.userInTeam.role === TeamRole.OTROK ||
      userTeamInSeason.userInTeam.role === TeamRole.OWNER,
    myTeamId: myTeamInSeason?.team?.team?.id,
  };
};

export const canUserJoinSeasonWithTeam = (userTeams: IMeTeams[], seasonTeams: ISeasonTeamItem[]): IMeTeams[] => {
  if (userTeams.length === 0) {
    return [];
  }

  const userIsCaptainInTeams = userTeams.filter((item) => item.userInTeam.role === TeamRole.OWNER);

  return userIsCaptainInTeams.filter((item) => {
    const team = seasonTeams.find((seasonTeam) => seasonTeam.team.team.id === item.team.id);
    return !team;
  });
};

export const getChallengerHosts = (hostPlayers?: IMatchPlayer[], firstRound?: IMatchRound) => {
  if (!hostPlayers || hostPlayers.length === 0 || !firstRound) {
    return [];
  }

  const challengerHosts: ITeamMatchPlayer[] = [];

  hostPlayers.forEach((player: IMatchPlayer) => {
    const playerRoundStats = firstRound.playersRoundStats.find((item) => item.playerInMatchId === player.id);
    if (playerRoundStats?.nation === firstRound.challengerNation) {
      challengerHosts.push({ ...player, isHost: true });
    }
  });

  return challengerHosts;
};

export const getOpponentHosts = (hostPlayers?: IMatchPlayer[], firstRound?: IMatchRound) => {
  if (!hostPlayers || hostPlayers.length === 0 || !firstRound) {
    return [];
  }

  const opponentHosts: ITeamMatchPlayer[] = [];

  hostPlayers.forEach((player: IMatchPlayer) => {
    const playerRoundStats = firstRound.playersRoundStats.find((item) => item.playerInMatchId === player.id);
    if (playerRoundStats?.nation === firstRound.opponentNation) {
      opponentHosts.push({ ...player, isHost: true });
    }
  });

  return opponentHosts;
};
