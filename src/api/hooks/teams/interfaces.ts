import { TeamMemberStatus, TeamRole } from '../../../constants/enums';
import { IPagination, IUser } from '../interfaces';

export interface ITeamPlayers {
  id: string;
  user: IUser;
  role: TeamRole;
  createdAt: string;
  status: TeamMemberStatus;
}

export interface ITeam {
  id: string;
  name: string;
  tag: string;
  description?: string;
  createdAt: string;
  image?: {
    id: string;
    url: string;
  };
}

export interface IMeTeams {
  team: ITeam;
  userInTeam: ITeamPlayers;
}

export interface IAvatarUpload {
  fileName: string;
}

export interface ICreateTeam {
  name: string;
  tag: string;
}

export interface IUpdateTeam extends ICreateTeam {
  description: string;
}

export interface IUpdateUserInTeam {
  role: TeamRole;
}

export interface ITeamListQuery extends IPagination {
  name?: string;
  tag?: string;
}
