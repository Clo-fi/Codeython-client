import instance from "../axios";
import {
  GetRankingResponse,
  GetRecentRecordsResponse,
  GetUserInfoResponse,
  PatchProfileRequest,
} from "./dto";

export const getRanks = async (): Promise<GetRankingResponse> => {
  const { data } = await instance.get("ranking");
  return data;
};

export const modifyProfile = async (body: PatchProfileRequest) => {
  const { data } = await instance.patch("users", body);
  return data;
};

export const getRecentRecords = async (): Promise<GetRecentRecordsResponse> => {
  const { data } = await instance.get("recent-records");
  return data;
};

export const getUserInfo = async (): Promise<GetUserInfoResponse> => {
  const { data } = await instance.get("users");
  return data;
};
