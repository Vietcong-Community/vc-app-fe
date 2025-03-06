import { useMutation, useQuery } from '@tanstack/react-query';

import { del, get, post, put } from '../../apiFactory';
import { STALE_TIME } from '../../constants';
import { IIdentifiedEntity, IPagination } from '../interfaces';

import { ArticlesEndpoints } from './endpoints';
import {
  IArticle,
  IArticleComment,
  IArticleList,
  IArticleListQuery,
  ICategory,
  ICreateArticle,
  IUpdateArticle,
} from './interfaces';

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

export const useArticleImageUploadUrl = (articleId: string) => {
  return useMutation({
    mutationFn: async (payload: { fileName: string }) => {
      const { data } = await post<{ fileName: string }, { fileId: string; uploadUrl: string }>(
        ArticlesEndpoints.UPLOAD_ARTICLE_IMAGE,
        payload,
        { articleId },
      );
      return data;
    },
  });
};

export const useRemoveArticleImage = (articleId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await del(ArticlesEndpoints.REMOVE_ARTICLE_IMAGE, {
        articleId,
      });
      return data;
    },
  });
};

export const useArticleComment = (articleId: string, query?: IPagination, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['articleComment', articleId, JSON.stringify(query)],
    queryFn: async () => {
      const { data } = await get<{ comments: IArticleComment[]; total: number }>(
        ArticlesEndpoints.ARTICLE_COMMENT,
        { articleId },
        query,
      );
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useAddArticleComment = (articleId: string) => {
  return useMutation({
    mutationFn: async (payload: { comment: string }) => {
      const { data } = await post<{ comment: string }, IIdentifiedEntity>(ArticlesEndpoints.ARTICLE_COMMENT, payload, {
        articleId,
      });
      return data;
    },
  });
};
