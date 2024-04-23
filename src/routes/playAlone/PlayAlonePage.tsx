import React, { useEffect } from 'react';
import PlayAloneForm from './components/PlayAloneForm';
import PlayHeader from './components/PlayHeader';
import { useParams } from 'react-router-dom';
import { create } from 'zustand';
import instance from '../../api/axios';
import axios from 'axios';

interface ProblemInfo {
  title: string;
  content: string;
  limitFactors: { factor: string }[];
  limitTime: number;
  baseCode: { language: string; code: string }[];
  testcase: {
    inputCase: string[][];
    outputCase: string[][];
    description: string;
  }[];
  difficulty: number;
}

interface ProblemState {
  problemInfo: ProblemInfo | null;
  loading: boolean;
  error: string | null;
  fetchProblemInfo: (problemId: string) => Promise<void>;
}

const useProblemStore = create<ProblemState>((set) => ({
  problemInfo: null,
  loading: false,
  error: null,
  fetchProblemInfo: async (problemId: string) => {
    set({ loading: true, error: null });
    try {
      const response = await instance.get<ProblemInfo>(`/problems/${problemId}`);
      set({ problemInfo: response.data, loading: false });
    } catch (error) {
      let errorMessage = '문제를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ loading: false, error: errorMessage });
    }
  }
}));

const PlayAlonePage: React.FC = () => {

  const { problemId } = useParams<{ problemId: string }>();

  const { problemInfo, loading, error, fetchProblemInfo } = useProblemStore();

  // const { problemInfo, isLoading } = useProblemFetching(problemId!);
  // console.log(problemInfo);

  useEffect(() => {
    if (problemId) {
      fetchProblemInfo(problemId);
    }

  }, [fetchProblemInfo, problemId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!problemInfo) {
    // 초기 상태 또는 데이터 불러오기 실패
    return <div>Data is not available.</div>;
  }

  // 이제 problemInfo가 null이 아님을 보장
  return (
    <div>
      <PlayHeader limitTime={problemInfo.limitTime} />
      <PlayAloneForm problemInfo={problemInfo} problemId={problemId!} />
    </div>
  );
};

export default PlayAlonePage;
