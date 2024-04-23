import React, { useEffect, useState } from "react";
import styles from "./CreateRoomPage.module.scss";
import CreateRoomForm from "./CreateRoomForm";
import instance from "../../api/axios";
import axios from "axios";
import { create } from "zustand";

interface Problem {
  problemId: number;
  title: string;
  difficulty: number;
  isPlayed: boolean;
  accuracy: number;
}

interface ProblemStore {
  problems: Problem[];
  loading: boolean;
  error: string | null;
  fetchProblems: () => Promise<void>;
}

const useProblemStore = create<ProblemStore>((set) => ({
  problems: [],
  loading: false,
  error: null,
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

const CreateRoomPage: React.FC = () => {
  const { problems, loading, error, fetchProblems } = useProblemStore();
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

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
    <div className={styles.create_container}>
      <div className={styles.create_header}>
        <img className={styles.logo} src="/Imgs/CodeythonLogo_star.png" alt="Codeython Logo" />
      </div>
      <div className={styles.form_container}>
        <CreateRoomForm problemList={problems} selectedProblem={selectedProblem} setSelectedProblem={setSelectedProblem} />
      </div>
    </div>
  );
}

export default CreateRoomPage;
