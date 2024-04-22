export interface UserInfo {
  nickname: string;
  level: number;
  exp: number;
}

export interface RecentRecord {
  recordId: number;
  date: string;
  title: string;
  accuracy: number;
  grade: number;
  memberCnt: number;
}

export interface Ranker {
  nickname: string;
  rank: number;
}
