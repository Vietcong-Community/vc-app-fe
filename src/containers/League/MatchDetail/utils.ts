import { IMatchPlayer, IMatchRound } from '../../../api/hooks/league/interfaces';

import { ITeamMatchPlayer } from './components/Team/Team';

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
