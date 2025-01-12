import { Nation } from '../../../constants/enums';

export enum SeasonStatus {
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export enum MatchStatus {
  NEW = 'NEW',
  READY = 'READY',
  WAITING_FOR_CONFIRMATION = 'WAITING_FOR_CONFIRMATION',
  COMPLAINT = 'COMPLAINT',
  FINISHED = 'FINISHED',
}

export interface ISeason {
  id: string;
  name: string;
  status: SeasonStatus;
  startDate?: string;
  endDate?: string;
}

export interface ISaveSeason {
  name: string;
  startDate?: string;
  endDate?: string;
}

export interface IMatchRound {
  id: string;
  map: {
    id: string;
    name: string;
  };
}

export interface IMatch {
  id: string;
  firstCaptain?: {
    id: string;
    nickname: string;
  };
  secondCaptain?: {
    id: string;
    nickname: string;
  };
  firstTeamScore?: number;
  secondTeamScore?: number;
  status: MatchStatus;
  date: string;
  players: object[];
  rounds: IMatchRound[];
}

export interface IMatchResult {
  matchId: string;
  firstTeamScore: number;
  secondTeamScore: number;
  players: { userId: string; team: number }[];
  rounds: {
    id: number;
    playerId?: number;
    userId: string;
    nation: Nation;
    flags: number;
    kills: number;
    deaths: number;
  }[];
}
