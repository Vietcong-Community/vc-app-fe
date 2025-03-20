import { MatchStatus } from '../../../constants/enums';
import { IPagination } from '../interfaces';
import { ILadderItem } from '../league/interfaces';

export interface IMeMatch {
  challenger: ILadderItem;
  challengerEloRowAmount?: number;
  challengerScore?: number;
  commentsCount: number;
  eloRowAmount?: number;
  endDate: string;
  id: string;
  opponent: ILadderItem;
  opponentEloRowAmount?: number;
  opponentScore?: number;
  startDate: string;
  status: MatchStatus;
}

export interface IUserListQuery extends IPagination {
  nickname?: string;
}
