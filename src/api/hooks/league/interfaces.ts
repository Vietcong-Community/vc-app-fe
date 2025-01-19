import { LeagueType, MatchStatus, Nation, SeasonStatus } from '../../../constants/enums';
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

export interface IMatchRound {
  id: string;
  map: {
    id: string;
    name: string;
  };
}

export interface IMatch {
  id: string;
  challengerTeam: ITeam;
  opponentTeam?: ITeam;
  firstTeamScore?: number;
  secondTeamScore?: number;
  status: MatchStatus;
  date: string;
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
