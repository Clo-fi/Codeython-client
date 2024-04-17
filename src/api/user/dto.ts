import { Ranker, RecentRecord, UserInfo } from "../../types/user";

export interface GetUserInfoResponse extends UserInfo {}

export interface GetRecentRecordsResponse {
  recentRecords: RecentRecord[];
}

export interface GetRankingResponse {
  ranker: Ranker[];
  myRank: number;
}

export interface PatchProfileRequest {
  nickname: string;
}
