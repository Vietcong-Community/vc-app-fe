import { ILeagueDetail, ISeason } from '../../../api/hooks/league/interfaces';
import { SeasonStatus } from '../../../constants/enums';

interface ISeasonItem {
  league: ILeagueDetail;
  season: ISeason;
}

export interface ISeasons {
  active: ISeasonItem[];
  archived: ISeasonItem[];
}

export const getSeasons = (data?: { league: ILeagueDetail; seasons: ISeason[] }[]): ISeasons => {
  const activeSeasons: ISeasonItem[] = [];
  const archivedSeasons: ISeasonItem[] = [];

  data?.forEach((item) => {
    item.seasons.forEach((season: ISeason) => {
      if (season.status === SeasonStatus.ACTIVE) {
        activeSeasons.push({ league: item.league, season });
      } else if (season.status === SeasonStatus.ARCHIVED) {
        archivedSeasons.push({ league: item.league, season });
      }
    });
  });

  return {
    active: activeSeasons,
    archived: archivedSeasons,
  };
};
