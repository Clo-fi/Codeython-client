import { Problem } from "../../types/problem";

export type GetProblemsRequest = Problem[];

export interface PatchSelectedProblemRequest {
  problemId: number;
}
