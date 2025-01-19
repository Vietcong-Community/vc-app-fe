import { IUser } from '../interfaces';

export enum TeamRole {
  OWNER = 'OWNER',
  MATCH_ORGANIZER = 'MATCH_ORGANIZER',
  MEMBER = 'MEMBER',
}

export interface ITeamPlayers {
  id: number;
  user: IUser;
  role: TeamRole;
  createdAt: string;
}

export interface ITeam {
  id: string;
  name: string;
  tag: string;
  description?: string;
  createdAt: string;
}
