import { AchievementEndpoints } from './hooks/achievements/endpoints';
import { AdminEndpoints } from './hooks/admin/endpoints';
import { ArticlesEndpoints } from './hooks/articles/endpoints';
import { AuthEndpoints } from './hooks/auth/endpoints';
import { FilesEndpoints } from './hooks/files/endpoints';
import { LeagueEndpoints } from './hooks/league/endpoints';
import { MapEndpoints } from './hooks/map/endpoints';
import { RankedEndpoints } from './hooks/ranked/endpoints';
import { TeamEndpoints } from './hooks/teams/endpoints';
import { UsersEndpoints } from './hooks/users/endpoints';

export type Endpoints =
  | AdminEndpoints
  | AchievementEndpoints
  | ArticlesEndpoints
  | AuthEndpoints
  | FilesEndpoints
  | LeagueEndpoints
  | MapEndpoints
  | RankedEndpoints
  | TeamEndpoints
  | UsersEndpoints;
