import {
  LeagueType,
  MatchStatus,
  MatchType,
  Nation,
  SeasonStatus,
  SeasonType,
  StatisticsSortType,
} from '../../../constants/enums';
import { IMap, IPagination, IUser } from '../interfaces';
import { ITeam } from '../teams/interfaces';

export interface ILeagueDetail {
  id: string;
  name: string;
  description: string;
  type: LeagueType;
}

export interface ISeason {
  id: string;
  name: string;
  status: SeasonStatus;
  startDate?: string;
  endDate?: string;
  type: SeasonType;
}

export interface ILadderItem {
  id: string;
  team: ITeam;
  wins: number;
  draws: number;
  loses: number;
  countOfMatches: number;
  points: number;
  eloPoints: number;
  joinedAt: string;
}

export interface ISeasonTeamItem {
  team: ILadderItem;
  userIsMemberOfTeam: boolean;
}

export interface ICreateMatchChallenge {
  opponentId: string;
  challengerMapId: string;
  startDate: string;
  endDate: string;
}

export interface IAcceptMatchChallenge {
  opponentMapId: string;
}

export interface IPlayerRoundStats {
  id: string;
  playerInMatchId: string;
  nation: Nation;
  flags: number;
  kills: number;
  deaths: number;
}

export interface IMatchRound {
  id: string;
  round: number;
  map: IMap;
  scoreChallenger: number;
  scoreOpponent: number;
  createdAt: string;
  createdBy: IUser;
  confirmationDate?: string;
  confirmedBy?: IUser;
  challengerNation: Nation;
  opponentNation: Nation;
  playersRoundStats: IPlayerRoundStats[];
  scoreFile?: {
    url: string;
    id: string;
  };
  screenshot?: {
    url: string;
    id: string;
  };
}

export interface IMatchPlayer {
  id: string;
  flags: number;
  kills: number;
  deaths: number;
  differencePlayer: string;
  mapHandicap: string;
  playerHandicap: string;
  user: IUser;
}

export interface IMatch {
  id: string;
  challenger: ILadderItem;
  opponent: ILadderItem;
  startDate: string;
  challengerEloRowAmount?: number;
  opponentEloRowAmount?: number;
  endDate?: string;
  challengerMap: IMap;
  opponentMap?: IMap;
  status: MatchStatus;
  challengerScore?: number;
  opponentScore?: number;
  createdAt: string;
  createdBy: IUser;
  confirmationOpponentDate?: string;
  confirmedBy?: IUser;
  rejectedAt?: string;
  rejectedBy?: IUser;
  season: ISeason;
  hostMatchPlayers?: IMatchPlayer[];
  challengerMatchPlayers?: IMatchPlayer[];
  opponentMatchPlayers?: IMatchPlayer[];
  playerInMatchIdsAddedToSeasonStatistics: string[];
  rounds: IMatchRound[];
  round?: number;
  type: MatchType;
}

export interface IMatchListItem {
  id: string;
  challenger: ILadderItem;
  opponent?: ILadderItem;
  startDate: string;
  endDate?: string;
  status: MatchStatus;
  challengerScore?: number;
  opponentScore?: number;
  challengerEloRowAmount?: number;
  opponentEloRowAmount?: number;
  commentsCount?: number;
  round?: number;
  type: MatchType;
}

export interface IMatchListQuery extends IPagination {
  teamId?: string;
  mapId?: string;
  startDateFrom?: string;
  startDateTo?: string;
  status?: string;
  round?: number;
  types?: string;
}

export interface ISetMatchScore {
  rounds: {
    mapId: string;
    scoreChallenger: number;
    scoreOpponent: number;
    challengerNation: Nation;
  }[];
}

export interface IExpectedEloPointsItem {
  newEloChallenger: number;
  newEloOpponent: number;
  pointsChangeChallenger: number;
  pointsChangeOpponent: number;
}

export interface IMatchComment {
  id: string;
  author: IUser;
  createdAt: string;
  comment: string;
}

export interface IUpdateMatch {
  challengerMapId: string;
  opponentMapId?: string;
  startDate: string;
  endDate: string;
  challengerScore?: number;
  opponentScore?: number;
}

export interface IUpdateRound {
  mapId: string;
  round: number;
  scoreChallenger: number;
  scoreOpponent: number;
}

export interface ICreateRound {
  mapId: string;
  roundNumber: number;
  scoreChallenger: number;
  scoreOpponent: number;
  challengerNation: Nation;
}

export interface ISortRounds {
  matchRoundsIds: string[];
}

export interface ITopPlayersOfTheDay {
  kd: {
    player: IUser;
    deaths: number;
    differencePlayer: number;
    flags: number;
    kd: number;
    kills: number;
    mapHandicap: number;
    playerHandicap: number;
  };
  kills: {
    player: IUser;
    deaths: number;
    differencePlayer: number;
    flags: number;
    kd: number;
    kills: number;
    mapHandicap: number;
    playerHandicap: number;
  };
  flags: {
    player: IUser;
    deaths: number;
    differencePlayer: number;
    flags: number;
    kd: number;
    kills: number;
    mapHandicap: number;
    playerHandicap: number;
  };
  deaths: {
    player: IUser;
    deaths: number;
    differencePlayer: number;
    flags: number;
    kd: number;
    kills: number;
    mapHandicap: number;
    playerHandicap: number;
  };
}

export interface IFileForMarchScoreList {
  total: number;
  files: {
    id: string;
    url: string;
  }[];
}

export interface ISetSeasonMaps {
  mapsIds: string[];
}

export interface IRecalculateMatchScoreByFile {
  fileId: string;
  matchId: string;
}

export interface ISeasonStatsListQuery extends IPagination {
  playerIds?: string;
  teamIds?: string;
  mapId?: string;
  sort?: StatisticsSortType;
}

export interface IStatisticsItem {
  averageFlags?: number;
  averageUsefulness?: number;
  deaths: number;
  differencePlayer: number;
  flags: number;
  id: string;
  kd: number;
  kills: number;
  totalMatches: number;
  mapHandicap: number;
  playerHandicap: number;
  usefulness: number;
  user: IUser;
}

export interface ICreatePlayerRoundStats {
  nation: Nation;
  flags: number;
  kills: number;
  deaths: number;
  playerInMatchId: string;
}
