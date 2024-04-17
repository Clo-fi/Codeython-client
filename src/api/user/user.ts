import instance from "../axios";
import {
  GetRankingResponse,
  GetRecentRecordsResponse,
  GetUserInfoResponse,
  PatchProfileRequest,
} from "./dto";

export const getRanks = async (): Promise<GetRankingResponse> => {
  const { data } = await instance.get("/api/ranking");
  return data;
};

export const modifyProfile = async (body: PatchProfileRequest) => {
  const { data } = await instance.patch("/api/users", body);
  return data;
};

export const getRecentRecords = async (): Promise<GetRecentRecordsResponse> => {
  const { data } = await instance.get("/api/recent-records");
  return data;
};

export const getUserInfo = async (): Promise<GetUserInfoResponse> => {
  const { data } = await instance.get("/api/users");
  return data;
};
