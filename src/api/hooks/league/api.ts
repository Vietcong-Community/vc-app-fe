import { useMutation, useQuery } from '@tanstack/react-query';

import { MatchStatus } from '../../../constants/enums';
import { del, get, post, put } from '../../apiFactory';
import { STALE_TIME } from '../../constants';
import { IgnoredErrorCodes } from '../../types';
import { IIdentifiedEntity, IMap } from '../interfaces';
import { IAvatarUpload } from '../teams/interfaces';

import { LeagueEndpoints } from './endpoints';
import {
  IAcceptMatchChallenge,
  ICreateMatchChallenge,
  IExpectedEloPointsItem,
  ILadderItem,
  ILeagueDetail,
  IMatch,
  IMatchListItem,
  IMatchListQuery,
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

export const useSeasonsDetail = (seasonId: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['seasonDetail', seasonId],
    queryFn: async () => {
      const { data } = await get<ISeason>(LeagueEndpoints.SEASON_DETAIL, { seasonId });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useMapsInSeason = (seasonId?: string) => {
  return useQuery({
    queryKey: ['mapsInSeason', seasonId],
    queryFn: async () => {
      const { data } = await get<{ items: IMap[] }>(LeagueEndpoints.MAPS_IN_SEASON, { seasonId });
      return data;
    },
    enabled: !!seasonId,
    staleTime: Infinity,
  });
};

export const useSeasonLadder = (seasonId?: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['seasonLadder', seasonId],
    queryFn: async () => {
      const { data } = await get<{ items: ILadderItem[] }>(LeagueEndpoints.LADDER_LIST, { seasonId });
      return data;
    },
    enabled: !!seasonId,
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useSeasonTeams = (
  seasonId?: string,
  ignoredErrorCodes?: IgnoredErrorCodes,
  refetchOnMount?: boolean | 'always',
  enabled = true,
) => {
  return useQuery({
    queryKey: ['seasonTeams', seasonId],
    queryFn: async () => {
      const { data } = await get<{ items: ISeasonTeamItem[] }>(
        LeagueEndpoints.SEASON_TEAM_LIST,
        {
          seasonId,
        },
        undefined,
        ignoredErrorCodes,
      );
      return data;
    },
    enabled: !!seasonId && enabled,
    staleTime: 0,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useSeasonMatchList = (
  seasonId: string,
  query?: IMatchListQuery,
  refetchOnMount?: boolean | 'always',
  staleTime = STALE_TIME,
) => {
  return useQuery({
    queryKey: ['matchList', seasonId, JSON.stringify(query ?? {})],
    queryFn: async () => {
      const { data } = await get<{ matches: IMatchListItem[]; total: number }>(
        LeagueEndpoints.MATCH_LIST,
        {
          seasonId,
        },
        query,
        [401],
      );
      return data;
    },
    staleTime,
    refetchOnMount: refetchOnMount ?? true,
  });
};

export const useCreateMatchChallenge = (seasonId: string) => {
  return useMutation({
    mutationFn: async (payload: ICreateMatchChallenge) => {
      const { data } = await post<ICreateMatchChallenge, IIdentifiedEntity>(
        LeagueEndpoints.CREATE_MATCH_CHALLENGE,
        payload,
        { seasonId },
      );
      return data;
    },
  });
};

export const useAcceptMatchChallenge = (matchId: string) => {
  return useMutation({
    mutationFn: async (payload: IAcceptMatchChallenge) => {
      const { data } = await post<IAcceptMatchChallenge, undefined>(LeagueEndpoints.ACCEPT_MATCH_CHALLENGE, payload, {
        matchId,
      });
      return data;
    },
  });
};

export const useRejectMatchChallenge = (matchId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await post<undefined, undefined>(LeagueEndpoints.REJECT_MATCH_CHALLENGE, undefined, {
        matchId,
      });
      return data;
    },
  });
};

export const useMatchDetail = (matchId: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['matchDetail', matchId],
    queryFn: async () => {
      const { data } = await get<IMatch>(LeagueEndpoints.MATCH_DETAIL, { matchId });
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useSetMatchScore = (matchId: string) => {
  return useMutation({
    mutationFn: async (payload: ISetMatchScore) => {
      const { data } = await post<ISetMatchScore, undefined>(LeagueEndpoints.SET_MATCH_SCORE, payload, {
        matchId,
      });
      return data;
    },
  });
};

export const useConfirmMatchScore = (matchId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await post<undefined, undefined>(LeagueEndpoints.CONFIRM_MATCH_SCORE, undefined, {
        matchId,
      });
      return data;
    },
  });
};

export const useExpectedEloPoints = (challengerId?: string, opponentId?: string, enabled = false) => {
  return useQuery({
    queryKey: ['expectedEloPoints', challengerId, opponentId],
    queryFn: async () => {
      const { data } = await get<{ items: { [key: string]: IExpectedEloPointsItem } }>(
        LeagueEndpoints.EXPECTED_ELO_POINTS,
        {
          challengerId,
          opponentId,
        },
      );
      return data;
    },
    enabled: !!challengerId && !!opponentId && enabled,
    staleTime: Infinity,
  });
};

export const useRoundResultImageUploadUrl = (matchId: string, roundId: string) => {
  return useMutation({
    mutationFn: async (payload: IAvatarUpload) => {
      const { data } = await post<IAvatarUpload, { fileId: string; uploadUrl: string }>(
        LeagueEndpoints.ROUNDS_SCREENSHOT_UPLOAD,
        payload,
        { matchId, roundId },
      );
      return data;
    },
  });
};

export const useRemoveRoundScreenshot = (roundId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await del(LeagueEndpoints.REMOVE_ROUND_SCREENSHOT, {
        roundId,
      });
      return data;
    },
  });
};

export const useUpdateMatchStatus = (matchId: string) => {
  return useMutation({
    mutationFn: async (payload: { status: MatchStatus }) => {
      const { data } = await put<{ status: MatchStatus }, undefined>(LeagueEndpoints.UPDATE_MATCH_STATUS, payload, {
        matchId,
      });
      return data;
    },
  });
};

export const useRemoveRound = (roundId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await del(LeagueEndpoints.REMOVE_ROUND, {
        roundId,
      });
      return data;
    },
  });
};
