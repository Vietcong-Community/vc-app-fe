import { useMutation, useQuery } from '@tanstack/react-query';

import { get, post } from '../../apiFactory';
import { IIdentifiedEntity, IMap } from '../interfaces';

import { LeagueEndpoints } from './endpoints';
import {
  IAcceptMatchChallenge,
  ICreateMatchChallenge,
  ILadderItem,
  ILeagueDetail,
  IMatch,
  IMatchListItem,
  ISeason,
  ISeasonTeamItem,
  ISetMatchScore,
} from './interfaces';

export const useLeagueList = () => {
  return useQuery({
    queryKey: ['leagueList'],
    queryFn: async () => {
      const { data } = await get<{ items: ILeagueDetail[] }>(LeagueEndpoints.LEAGUES);
      return data;
    },
    staleTime: Infinity,
  });
};

export const useLeagueDetail = (id: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['league', id],
    queryFn: async () => {
      const { data } = await get<ILeagueDetail>(LeagueEndpoints.LEAGUE_BY_ID, { id });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useSeasonsInLeague = (id: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['seasonsByLeague', id],
    queryFn: async () => {
      const { data } = await get<{ items: ISeason[] }>(LeagueEndpoints.LEAGUE_SEASONS, { id });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useSeasonsDetail = (leagueId: string, seasonId: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['seasonDetail', leagueId, seasonId],
    queryFn: async () => {
      const { data } = await get<ISeason>(LeagueEndpoints.SEASON_DETAIL, { leagueId, seasonId });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useMapsInSeason = (leagueId: string, seasonId: string) => {
  return useQuery({
    queryKey: ['mapsInSeason', leagueId, seasonId],
    queryFn: async () => {
      const { data } = await get<{ items: IMap[] }>(LeagueEndpoints.MAPS_IN_SEASON, { leagueId, seasonId });
      return data;
    },
    staleTime: Infinity,
  });
};

export const useSeasonLadder = (leagueId: string, seasonId: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['seasonLadder', leagueId, seasonId],
    queryFn: async () => {
      const { data } = await get<{ items: ILadderItem[] }>(LeagueEndpoints.LADDER_LIST, { leagueId, seasonId });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useSeasonTeams = (leagueId: string, seasonId: string) => {
  return useQuery({
    queryKey: ['seasonTeams', leagueId, seasonId],
    queryFn: async () => {
      const { data } = await get<{ items: ISeasonTeamItem[] }>(LeagueEndpoints.SEASON_TEAM_LIST, {
        leagueId,
        seasonId,
      });
      return data;
    },
    staleTime: Infinity,
  });
};

export const useSeasonMatchList = (leagueId: string, seasonId: string) => {
  return useQuery({
    queryKey: ['matchList', leagueId, seasonId],
    queryFn: async () => {
      const { data } = await get<{ matches: IMatchListItem[]; total: number }>(
        LeagueEndpoints.MATCH_LIST,
        {
          leagueId,
          seasonId,
        },
        undefined,
        [401],
      );
      return data;
    },
    staleTime: Infinity,
  });
};

export const useCreateMatchChallenge = (leagueId: string, seasonId: string) => {
  return useMutation({
    mutationFn: async (payload: ICreateMatchChallenge) => {
      const { data } = await post<ICreateMatchChallenge, IIdentifiedEntity>(
        LeagueEndpoints.CREATE_MATCH_CHALLENGE,
        payload,
        { leagueId, seasonId },
      );
      return data;
    },
  });
};

export const useAcceptMatchChallenge = (leagueId: string, seasonId: string, matchId: string) => {
  return useMutation({
    mutationFn: async (payload: IAcceptMatchChallenge) => {
      const { data } = await post<IAcceptMatchChallenge, undefined>(LeagueEndpoints.ACCEPT_MATCH_CHALLENGE, payload, {
        leagueId,
        seasonId,
        matchId,
      });
      return data;
    },
  });
};

export const useRejectMatchChallenge = (leagueId: string, seasonId: string, matchId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await post<undefined, undefined>(LeagueEndpoints.REJECT_MATCH_CHALLENGE, undefined, {
        leagueId,
        seasonId,
        matchId,
      });
      return data;
    },
  });
};

export const useMatchDetail = (
  leagueId: string,
  seasonId: string,
  matchId: string,
  refetchOnMount?: boolean | 'always',
) => {
  return useQuery({
    queryKey: ['matchDetail', leagueId, seasonId, matchId],
    queryFn: async () => {
      const { data } = await get<IMatch>(LeagueEndpoints.MATCH_DETAIL, { leagueId, seasonId, matchId });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useSetMatchScore = (leagueId: string, seasonId: string, matchId: string) => {
  return useMutation({
    mutationFn: async (payload: ISetMatchScore) => {
      const { data } = await post<ISetMatchScore, undefined>(LeagueEndpoints.SET_MATCH_SCORE, payload, {
        leagueId,
        seasonId,
        matchId,
      });
      return data;
    },
  });
};

export const useConfirmMatchScore = (leagueId: string, seasonId: string, matchId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await post<undefined, undefined>(LeagueEndpoints.CONFIRM_MATCH_SCORE, undefined, {
        leagueId,
        seasonId,
        matchId,
      });
      return data;
    },
  });
};
