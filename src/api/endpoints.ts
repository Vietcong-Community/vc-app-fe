import { AdminEndpoints } from './hooks/admin/endpoints';
import { AuthEndpoints } from './hooks/auth/endpoints';
import { FilesEndpoints } from './hooks/files/endpoints';
import { LeagueEndpoints } from './hooks/league/endpoints';
import { TeamEndpoints } from './hooks/teams/endpoints';
import { UsersEndpoints } from './hooks/users/endpoints';

export type Endpoints =
  | AdminEndpoints
  | AuthEndpoints
  | FilesEndpoints
  | LeagueEndpoints
  | TeamEndpoints
  | UsersEndpoints;
