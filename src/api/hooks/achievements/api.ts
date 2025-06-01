import { useQuery } from '@tanstack/react-query';

import { get } from '../../apiFactory';

import { AchievementEndpoints } from './endpoints';
import { IAchievement } from './interfaces';

export const useUserAchievements = (userId: string) => {
  return useQuery({
    queryKey: ['userAchievements', userId],
    queryFn: async () => {
      const { data } = await get<{ items: IAchievement[] }>(AchievementEndpoints.USER_ACHIEVEMENTS, { userId });
      return data;
    },
    staleTime: Infinity,
  });
};
