import { IUser } from '../interfaces';

export interface IArticle {
  id: string;
  title: string;
  published: boolean;
  content: string;
  createdAt: string;
  createdBy: IUser;
  updatedAt: string | null;
}

export interface IArticleList {
  articles: IArticle[];
  total: number;
}

export interface ICreateArticle {
  title: string;
  content: string;
}

export interface IUpdateArticle extends ICreateArticle {
  published: boolean;
}

export interface IArticleListQuery {
  published?: boolean;
  page?: number;
  limit?: number;
}
