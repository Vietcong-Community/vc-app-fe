export enum Role {
  ADMIN = 'ADMIN',
  CONTENT_CREATOR = 'CONTENT_CREATOR',
  STATS_ADMIN = 'STATS_ADMIN',
}

export enum Nation {
  US = 'US',
  VC = 'VC',
}

export enum PlayersCount {
  FOUR = 'FOUR',
  FIVE = 'FIVE',
  SIX = 'SIX',
  SEVEN = 'SEVEN',
  EIGHT = 'EIGHT',
  NINE = 'NINE',
  TEN = 'TEN',
}

export enum MatchResult {
  WIN = 'WIN',
  DRAW = 'DRAW',
  DEFEAT = 'DEFEAT',
}

export enum LeagueType {
  TEAMPLAY = 'TEAMPLAY',
  FACEIT = 'FACEIT',
  TWOVSTWO = 'TWOVSTWO',
}

export enum SeasonType {
  SEASON = 'SEASON',
  TOURNAMENT = 'TOURNAMENT',
  TOURNAMENT_DE = 'TOURNAMENT_DE',
  FACEIT = 'FACEIT',
}

export enum SeasonStatus {
  NEW = 'NEW',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export enum MatchStatus {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED_BY_CHALLENGER = 'REJECTED_BY_CHALLENGER',
  REJECTED_BY_OPPONENT = 'REJECTED_BY_OPPONENT',
  REJECTED_BY_ADMIN = 'REJECTED_BY_ADMIN',
  WAITING_FOR_CONFIRMATION = 'WAITING_FOR_CONFIRMATION',
  WAITING_FOR_SCORE_CONFIRMATION = 'WAITING_FOR_SCORE_CONFIRMATION',
  CONFIRMED_SCORE_BY_SYSTEM = 'CONFIRMED_SCORE_BY_SYSTEM',
  COMPLAINT = 'COMPLAINT',
  FINISHED = 'FINISHED',
}

export enum MatchType {
  GROUP = 'GROUP',
  PLAYOFF = 'PLAYOFF',
  PLAYOFF_FINAL = 'PLAYOFF_FINAL',
  PLAYOFF_SMALL_FINAL = 'PLAYOFF_SMALL_FINAL',
}

export enum TeamRole {
  OWNER = 'OWNER',
  MATCH_ORGANIZER = 'MATCH_ORGANIZER',
  OTROK = 'OTROK',
  MEMBER = 'MEMBER',
}

export enum TeamMemberStatus {
  AWAITING = 'AWAITING',
  ACTIVE = 'ACTIVE',
  REMOVED = 'REMOVED',
}

export enum StatisticsSortType {
  FLAGS = 'flags',
  KILLS = 'kills',
  DEATHS = 'deaths',
  KD = 'kd',
  USAGE = 'usage',
  AVG_USAGE = 'avg_usage',
}
