import { LeagueType, MatchStatus, Nation, SeasonStatus } from '../../../constants/enums';

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
