import { IUser } from '../interfaces';

export interface ICategory {
  id: string;
  name: string;
}

export interface IArticle {
  id: string;
  title: string;
  perex: string;
  isPublished: boolean;
  content: string;
  category: ICategory;
  createdAt: string;
  createdBy: IUser;
  editedBy: IUser;
  commentsCount: 2;
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
  isPublished?: boolean;
}

export interface IArticleListQuery {
  published?: boolean;
  categoryId?: string;
  page?: number;
  limit?: number;
}

export interface IArticleComment {
  id: string;
  author: IUser;
  createdAt: string;
  comment: string;
}
