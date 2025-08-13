import { Role } from '../../constants/enums';

export interface IIdentifiedEntity {
  id: string;
}

export interface IMap {
  id: string;
  name: string;
  official: boolean;
}

export interface IUser {
  id: string;
  email: string;
  nickname: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
  facebookLink?: string;
  twitchLink?: string;
  steamLink?: string;
  description?: string;
  shortDescription?: string;
  image: {
    id: string;
    url: string;
  };
  roles: Role[];
}

export interface IPagination {
  page?: number;
  limit?: number;
}
