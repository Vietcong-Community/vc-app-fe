export enum TeamRole {
  OWNER = 'OWNER',
  MATCH_ORGANIZER = 'MATCH_ORGANIZER',
  MEMBER = 'MEMBER',
}

export interface ITeamPlayer {
  id: number;
  userId: string;
  nickname: string;
  role: TeamRole;
  createdAt: string;
  removedAt?: string;
}

export interface ITeam {
  id: number;
  name: string;
  tag: string;
  description?: string;
  archived?: boolean;
  players: ITeamPlayer[];
}

export interface ISaveTeam {
  name: string;
  tag: string;
  description?: string;
}
