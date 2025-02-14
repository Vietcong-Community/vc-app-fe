import { IUser } from '../interfaces';

export interface ICategory {
  id: string;
  name: string;
}

export interface IArticle {
  id: string;
  title: string;
  perex: string;
  published: boolean;
  content: string;
  category: ICategory;
  createdAt: string;
  createdBy: IUser;
  image: {
    id: string;
    url: string;
  };
  updatedAt: string | null;
}

export interface IArticleList {
  articles: IArticle[];
  total: number;
}

export interface ICreateArticle {
  title: string;
  content: string;
  perex: string;
  categoryId: string;
}

export interface IUpdateArticle extends Partial<ICreateArticle> {
  published: boolean;
}

export interface IArticleListQuery {
  published?: boolean;
  categoryId?: string;
  page?: number;
  limit?: number;
}
