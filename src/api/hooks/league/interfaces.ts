import { LeagueType, MatchStatus, SeasonStatus } from '../../../constants/enums';
import { IMap, IUser } from '../interfaces';
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
}

export interface ILadderItem {
  id: string;
  team: ITeam;
  wins: number;
  draws: number;
  loses: number;
  countOfMatches: number;
  points: number;
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
}

export interface IMatch {
  id: string;
  challenger: ILadderItem;
  opponent: ILadderItem;
  startDate: string;
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
  rounds: IMatchRound[];
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
}

export interface IMatchListQuery {
  teamId?: string;
  mapId?: string;
  startDateFrom?: string;
  startDateTo?: string;
  status?: MatchStatus;
  page?: number;
  limit?: number;
}

export interface ISetMatchScore {
  rounds: {
    mapId: string;
    scoreChallenger: number;
    scoreOpponent: number;
  }[];
}
