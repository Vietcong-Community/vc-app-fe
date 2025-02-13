import { useMutation, useQuery } from '@tanstack/react-query';

import { del, get, post, put } from '../../apiFactory';
import { STALE_TIME } from '../../constants';
import { IIdentifiedEntity } from '../interfaces';

import { ArticlesEndpoints } from './endpoints';
import { IArticle, IArticleList, IArticleListQuery, ICategory, ICreateArticle, IUpdateArticle } from './interfaces';

export const useArticleCategories = () => {
  return useQuery({
    queryKey: ['articleCategories'],
    queryFn: async () => {
      const { data } = await get<{ items: ICategory[] }>(ArticlesEndpoints.ARTICLE_CATEGORIES);
      return data;
    },
    staleTime: Infinity,
  });
};

export const useArticlesList = (
  query?: IArticleListQuery,
  refetchOnMount?: boolean | 'always',
  staleTime = STALE_TIME,
) => {
  return useQuery({
    queryKey: ['articles', JSON.stringify(query ?? {})],
    queryFn: async () => {
      const { data } = await get<IArticleList>(ArticlesEndpoints.ARTICLES, undefined, query);
      return data;
    },
    staleTime,
    refetchOnMount: refetchOnMount ?? true,
  });
};

export const useArticleById = (articleId: string, refetchOnMount?: boolean | 'always', staleTime = STALE_TIME) => {
  return useQuery({
    queryKey: ['articleById', articleId],
    queryFn: async () => {
      const { data } = await get<IArticle>(ArticlesEndpoints.ARTICLE_BY_ID, { articleId });
      return data;
    },
    staleTime,
    refetchOnMount: refetchOnMount ?? true,
  });
};

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: async (payload: ICreateArticle) => {
      const { data } = await post<ICreateArticle, IIdentifiedEntity>(ArticlesEndpoints.ARTICLES, payload);
      return data;
    },
  });
};

export const useUpdateArticle = (articleId: string) => {
  return useMutation({
    mutationFn: async (payload: IUpdateArticle) => {
      const { data } = await put<IUpdateArticle, undefined>(ArticlesEndpoints.ARTICLE_BY_ID, payload, {
        articleId,
      });
      return data;
    },
  });
};

export const useRemoveArticle = (articleId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await del(ArticlesEndpoints.ARTICLE_BY_ID, {
        articleId,
      });
      return data;
    },
  });
};
