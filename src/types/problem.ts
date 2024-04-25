export interface Problem {
  problemId: number;
  title: string;
  difficulty: number;
  accuracy: number;
  isPlayed: boolean;
}

export interface ProblemInfo {
  title: string;
  content: string;
  limitFactors: string[];
  limitTime: number;
  baseCode: { language: string; code: string }[];
  testcase: {
    inputCase: string[][];
    outputCase: string[][];
    description: string;
  }[];
  difficulty: number;
}