import { useMutation, useQuery } from '@tanstack/react-query';

import { MatchStatus, SeasonType } from '../../../constants/enums';
import { del, get, post, put } from '../../apiFactory';
import { STALE_TIME } from '../../constants';
import { IgnoredErrorCodes } from '../../types';
import { IIdentifiedEntity, IMap, IPagination } from '../interfaces';
import { IAvatarUpload } from '../teams/interfaces';

import { LeagueEndpoints } from './endpoints';
import {
  IAcceptMatchChallenge,
  IAddPlayerToMatch,
  ICreateMatchChallenge,
  ICreatePlayerRoundStats,
  ICreateRound,
  IEliminatedMap,
  IExpectedEloPointsItem,
  IFileForMarchScoreList,
  ILadderItem,
  ILeagueDetail,
  IMatch,
  IMatchComment,
  IMatchListItem,
  IMatchListQuery,
  IRecalculateMatchScoreByFile,
  ISeason,
  ISeasonStatsListQuery,
  ISeasonTeamItem,
  ISetMatchScore,
  ISetSeasonMaps,
  ISortRounds,
  IStatisticsItem,
  ITopPlayersOfTheDay,
  IUpdateMatch,
  IUpdateRound,
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

export const useLeaguesWithSeasonsList = (seasonTypes?: SeasonType[]) => {
  return useQuery({
    queryKey: ['leagueWithSeasonsTypes', seasonTypes?.join(',')],
    queryFn: async () => {
      const { data } = await get<{ items: ILeagueDetail[] }>(LeagueEndpoints.LEAGUES);

      const result: { league: ILeagueDetail; seasons: ISeason[] }[] = [];

      for (const item of data.items) {
        const seasons = await get<{ items: ISeason[] }>(LeagueEndpoints.LEAGUE_SEASONS, { id: item.id });

        if (seasonTypes) {
          const filteredSeasons = seasons.data?.items.filter((item) => seasonTypes.includes(item.type));

          if (filteredSeasons.length > 0) {
            result.push({ league: item, seasons: filteredSeasons });
          }
        } else {
          result.push({ league: item, seasons: seasons.data.items ?? [] });
        }
      }

      return result;
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

export const useMapsInSeason = (seasonId?: string, enabled = true) => {
  return useQuery({
    queryKey: ['mapsInSeason', seasonId],
    queryFn: async () => {
      const { data } = await get<{ items: IMap[] }>(LeagueEndpoints.MAPS_IN_SEASON, { seasonId });
      return data;
    },
    enabled: !!seasonId && enabled,
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

export const useMatchDetail = (matchId?: string, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['matchDetail', matchId],
    queryFn: async () => {
      const { data } = await get<IMatch>(LeagueEndpoints.MATCH_BY_ID, { matchId });
      return data;
    },
    enabled: !!matchId,
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
      const { data } = await del(LeagueEndpoints.ROUND_BY_ID, {
        roundId,
      });
      return data;
    },
  });
};

export const useCreateRound = (matchId: string) => {
  return useMutation({
    mutationFn: async (payload: ICreateRound) => {
      const { data } = await post<ICreateRound, undefined>(LeagueEndpoints.CREATE_ROUND, payload, {
        matchId,
      });
      return data;
    },
  });
};

export const useUpdateRound = (roundId: string) => {
  return useMutation({
    mutationFn: async (payload: IUpdateRound) => {
      const { data } = await put<IUpdateRound, undefined>(LeagueEndpoints.ROUND_BY_ID, payload, {
        roundId,
      });
      return data;
    },
  });
};

export const useUpdateMatch = (matchId: string) => {
  return useMutation({
    mutationFn: async (payload: IUpdateMatch) => {
      const { data } = await put<IUpdateMatch, undefined>(LeagueEndpoints.MATCH_BY_ID, payload, {
        matchId,
      });
      return data;
    },
  });
};

export const useAddMatchStatsToOverallStats = (matchId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await post<undefined, undefined>(LeagueEndpoints.ADD_MATCH_STATS_TO_OVERALL_STATS, undefined, {
        matchId,
      });
      return data;
    },
  });
};
export const useRecalculatePlayerStats = (matchId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await post<undefined, undefined>(LeagueEndpoints.RECALCULATE_PLAYER_STATS, undefined, {
        matchId,
      });
      return data;
    },
  });
};

export const useMatchComment = (matchId: string, query?: IPagination, refetchOnMount?: boolean | 'always') => {
  return useQuery({
    queryKey: ['matchComment', matchId, JSON.stringify(query)],
    queryFn: async () => {
      const { data } = await get<{ comments: IMatchComment[]; total: number }>(
        LeagueEndpoints.MATCH_COMMENT,
        { matchId },
        query,
      );
      return data;
    },
    staleTime: Infinity,
    refetchOnMount: refetchOnMount ?? 'always',
  });
};

export const useAddMatchComment = (matchId: string) => {
  return useMutation({
    mutationFn: async (payload: { comment: string }) => {
      const { data } = await post<{ comment: string }, IIdentifiedEntity>(LeagueEndpoints.MATCH_COMMENT, payload, {
        matchId,
      });
      return data;
    },
  });
};

export const useSortRounds = (matchId: string) => {
  return useMutation({
    mutationFn: async (payload: ISortRounds) => {
      const { data } = await put<ISortRounds, undefined>(LeagueEndpoints.SORT_ROUNDS, payload, {
        matchId,
      });
      return data;
    },
  });
};

export const useJoinSeason = (seasonId: string) => {
  return useMutation({
    mutationFn: async (payload: { teamId: string }) => {
      const { data } = await post<undefined, IIdentifiedEntity>(LeagueEndpoints.JOIN_SEASON, undefined, {
        seasonId,
        teamId: payload.teamId,
      });
      return data;
    },
  });
};

export const useTopPlayersOfTheDay = (seasonId: string, date?: string) => {
  return useQuery({
    queryKey: ['topPlayersOfTheDay', seasonId, date],
    queryFn: async () => {
      const { data } = await get<ITopPlayersOfTheDay>(LeagueEndpoints.TOP_PLAYERS_OF_DAY, {
        seasonId,
        date,
      });
      return data;
    },
    enabled: !!date,
    staleTime: Infinity,
  });
};

export const useFilesForMatchScoreList = (matchId: string, query?: IPagination, enabled = true) => {
  return useQuery({
    queryKey: ['filesForMatchScoreList', matchId, JSON.stringify(query ?? {})],
    queryFn: async () => {
      const { data } = await get<IFileForMarchScoreList>(
        LeagueEndpoints.FILES_FOR_MATCH_SCORE_LIST,
        {
          matchId,
        },
        query,
      );
      return data;
    },
    staleTime: 0,
    enabled,
  });
};

export const useSetSeasonMaps = (seasonId: string) => {
  return useMutation({
    mutationFn: async (payload: ISetSeasonMaps) => {
      const { data } = await put<ISetSeasonMaps, undefined>(LeagueEndpoints.MAPS_IN_SEASON, payload, {
        seasonId,
      });
      return data;
    },
  });
};

export const useRecalculateMatchScoreByFileId = () => {
  return useMutation({
    mutationFn: async (payload: IRecalculateMatchScoreByFile) => {
      const { data } = await post<{ matchId: string }, undefined>(
        LeagueEndpoints.RECALCULATE_MATCH_SCORE_BY_FILE,
        { matchId: payload.matchId },
        {
          fileId: payload.fileId,
        },
      );
      return data;
    },
  });
};

export const useSeasonStatsList = (
  seasonId: string,
  query?: ISeasonStatsListQuery,
  refetchOnMount?: boolean | 'always',
  staleTime = STALE_TIME,
) => {
  return useQuery({
    queryKey: ['seasonStatsList', seasonId, JSON.stringify(query ?? {})],
    queryFn: async () => {
      const { data } = await get<{ seasonPlayers: IStatisticsItem[]; total: number }>(
        LeagueEndpoints.SEASON_STATS,
        {
          seasonId,
        },
        query,
      );
      return data;
    },
    staleTime,
    refetchOnMount: refetchOnMount ?? true,
  });
};

export const useAddPlayerToMatch = (matchId: string) => {
  return useMutation({
    mutationFn: async (payload: { userId: string; data?: IAddPlayerToMatch }) => {
      const { data } = await post<IAddPlayerToMatch | undefined, undefined>(
        LeagueEndpoints.ADD_PLAYER_TO_MATCH,
        payload.data,
        {
          matchId,
          userId: payload.userId,
        },
      );
      return data;
    },
  });
};

export const useCreatePlayerRoundStats = (matchRoundId: string) => {
  return useMutation({
    mutationFn: async (payload: ICreatePlayerRoundStats) => {
      const { data } = await post<ICreatePlayerRoundStats, undefined>(LeagueEndpoints.CREATE_ROUND_STATS, payload, {
        matchRoundId,
      });
      return data;
    },
  });
};

export const useRemovePlayerRoundStats = () => {
  return useMutation({
    mutationFn: async (roundStatsId: string) => {
      const { data } = await del(LeagueEndpoints.REMOVE_PLAYER_ROUND_STATS, {
        roundStatsId,
      });
      return data;
    },
  });
};

export const useEliminatedMaps = (matchId: string, enabled = true) => {
  return useQuery({
    queryKey: ['eliminatedMaps', matchId],
    queryFn: async () => {
      const { data } = await get<{ items: IEliminatedMap[] }>(LeagueEndpoints.ELIMINATED_MAPS, {
        matchId,
      });
      return data;
    },
    enabled,
  });
};

export const useEliminateMap = (matchId: string) => {
  return useMutation({
    mutationFn: async (values: { mapId: string }) => {
      const { data } = await post<{ mapId: string }, undefined>(LeagueEndpoints.ELIMINATE_PLAYOFF_MAP, values, {
        matchId,
      });
      return data;
    },
  });
};

export const useRevertMapElimination = (matchId: string) => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await post<undefined, undefined>(LeagueEndpoints.REVERT_PLAYOFF_MAP_ELIMINATION, undefined, {
        matchId,
      });
      return data;
    },
  });
};

export const useRemovePlayerFromMatch = () => {
  return useMutation({
    mutationFn: async (playerId: string) => {
      const { data } = await del(LeagueEndpoints.REMOVE_PLAYER_FROM_MATCH, {
        playerId,
      });
      return data;
    },
  });
};
