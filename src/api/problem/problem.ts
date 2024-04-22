import instance from "../axios";
import { GetProblemsRequest } from "./dto";

export const getProblemList = async (): Promise<GetProblemsRequest> => {
  const { data } = await instance.get("problems");
  return data;
};
