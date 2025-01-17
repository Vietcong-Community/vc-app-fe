import { AuthEndpoints } from './hooks/auth/endpoints';
import { LeagueEndpoints } from './hooks/league/endpoints';
import { TeamEndpoints } from './hooks/teams/endpoints';
import { UsersEndpoints } from './hooks/users/endpoints';

export type Endpoints = AuthEndpoints | LeagueEndpoints | TeamEndpoints | UsersEndpoints;
