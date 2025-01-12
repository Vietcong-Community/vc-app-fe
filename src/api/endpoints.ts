import { EnumsEndpoints } from './hooks/enums/endpoints';
import { MatchEndpoints } from './hooks/league/match/endpoints';
import { SeasonsEndpoints } from './hooks/league/seasons/endpoints';
import { TeamEndpoints } from './hooks/teams/endpoints';
import { UsersEndpoints } from './hooks/users/endpoints';

export type Endpoints = EnumsEndpoints | MatchEndpoints | SeasonsEndpoints | TeamEndpoints | UsersEndpoints;
