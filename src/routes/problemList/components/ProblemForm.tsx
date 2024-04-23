import React, { useEffect } from 'react';
import styles from './ProblemForm.module.scss';
import { create } from 'zustand';
import instance from '../../../api/axios';
import axios from 'axios';

interface Problem {
  problemId: number;
  title: string;
  difficulty: number;
  isPlayed: boolean;
  accuracy: number;
}

interface ProblemFormProps {
  selectedProblem: Problem | null;
  setSelectedProblem: (problem: Problem | null) => void;
}

interface ProblemStore {
  problems: Problem[];
  loading: boolean;
  error: string | null;
  fetchProblems: () => Promise<void>;
}

const useProblemStore = create<ProblemStore>((set) => ({
  problems: [] as Problem[],
  loading: false,
  error: null as string | null,
  fetchProblems: async () => {
    set({ loading: true, error: null });
    try {
      const response = await instance.get<Problem[]>('/problems');
      set({ problems: response.data, loading: false });
    } catch (error) {
      let errorMessage = '문제를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.'; // 기본 에러 메시지
      if (axios.isAxiosError(error)) {
        // Axios 에러인 경우 처리
        errorMessage = error.response?.data.message || errorMessage;
      } else if (error instanceof Error) {
        // 일반 에러인 경우 처리
        errorMessage = error.message;
      }
      set({ loading: false, error: errorMessage });
    }
  },
}));


const ProblemForm: React.FC<ProblemFormProps> = ({ selectedProblem, setSelectedProblem }) => {
  const { problems, loading, error, fetchProblems } = useProblemStore();

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={fetchProblems}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.problemForm__container}>
      <div className={styles.problemForm_component__list}>
        {problems.length > 0 ? problems.map(problem => (
          <div
            className={`${styles.problemForm_component__element} ${selectedProblem && selectedProblem.problemId === problem.problemId ? styles.problemForm_component__selected : ''}`}
            key={problem.problemId}
            onClick={() => setSelectedProblem(problem)}
          >
            <div className={styles.problemForm_component__title}>{problem.title}</div>
            <div className={styles.problemForm_component__difficulty}>Difficulty {problem.difficulty}</div>
            <div className={styles.problemForm_component__solved}>
              {problem.isPlayed ? problem.accuracy + "%" : "Not Played"}
            </div>
          </div>
        )) : <div>No problems available.</div>}
      </div>
    </div>
  );
};

export default ProblemForm;
