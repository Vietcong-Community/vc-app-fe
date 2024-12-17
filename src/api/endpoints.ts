import { EnumsEndpoints } from './hooks/enums/endpoints';
import { MixedMatchEndpoints } from './hooks/mixedLeague/match/endpoints';
import { SeasonsEndpoints } from './hooks/mixedLeague/seasons/endpoints';
import { RegistrationEndpoints } from './hooks/registration/endpoints';
import { UsersEndpoints } from './hooks/users/endpoints';

export type Endpoints =
  | EnumsEndpoints
  | MixedMatchEndpoints
  | RegistrationEndpoints
  | SeasonsEndpoints
  | UsersEndpoints;
