import { Nation } from '../../../constants/enums';

export enum SeasonStatus {
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export enum MixedMatchStatus {
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

export interface ISaveMixedMatch {
  date: string;
  firstCaptainId?: string;
  secondCaptainId?: string;
  firstMapId?: string;
  secondMapId?: string;
}

export interface IMixedMatchRound {
  id: string;
  map: {
    id: string;
    name: string;
  };
}

export interface IMixedMatch {
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
  status: MixedMatchStatus;
  date: string;
  players: object[];
  rounds: IMixedMatchRound[];
}

export interface IMixedMatchResult {
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
