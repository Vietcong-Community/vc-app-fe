export enum UserStatus {
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
}

export enum Role {
  DEVELOPER = 'DEVELOPER',
  USER = 'USER',
  ADMIN_SEASON = 'ADMIN_SEASON',
  ADMIN_MATCH = 'ADMIN_MATCH',
  ADMIN_TOURNAMENT = 'ADMIN_TOURNAMENT',
  FEEDBACK_MANAGER = 'FEEDBACK_MANAGER',
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  status: UserStatus;
  roles: Role[];
}

export interface IRegisterUser {
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  password: string;
}
