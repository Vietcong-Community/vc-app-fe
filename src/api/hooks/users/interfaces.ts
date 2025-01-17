export enum UserStatus {
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
}

export interface IUser {
  id: string;
  email: string;
  nickname: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

export interface IRegisterUser {
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  password: string;
}
