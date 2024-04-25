import instance from "../axios";
import { GetProblemsRequest } from "./dto";

export const getProblemList = async (): Promise<GetProblemsRequest> => {
  const { data } = await instance.get("problems");
  return data;
};

export const patchSelectedProblem = async (
  roomId: number,
  problemId: number
): Promise<void> => {
  return instance.patch(`rooms/${roomId}`, {
    problemId,
  });
};
