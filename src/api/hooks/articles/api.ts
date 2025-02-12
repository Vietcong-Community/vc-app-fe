import { useMutation, useQuery } from '@tanstack/react-query';

import { get, post, put } from '../../apiFactory';
import { STALE_TIME } from '../../constants';
import { IIdentifiedEntity } from '../interfaces';

import { ArticlesEndpoints } from './endpoints';
import { IArticle, IArticleListQuery, ICreateArticle, IUpdateArticle } from './interfaces';

export const useArticlesList = (
  query?: IArticleListQuery,
  refetchOnMount?: boolean | 'always',
  staleTime = STALE_TIME,
) => {
  return useQuery({
    queryKey: ['articles', JSON.stringify(query ?? {})],
    queryFn: async () => {
      const { data } = await get<{ articles: IArticle[]; total: number }>(ArticlesEndpoints.ARTICLES, undefined, query);
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
