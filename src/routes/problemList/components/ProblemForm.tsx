import React from 'react';
import styles from './ProblemForm.module.scss';

interface Problem {
  problemId: number;
  title: string;
  difficulty: number;
  isPlayed: boolean;
}

interface ProblemFormProps {
  problems: Problem[];
  selectedProblem: Problem | null; // 변경된 부분: null일 수 있도록 변경
  setSelectedProblem: (problem: Problem | null) => void; // 변경된 부분: null일 수 있도록 변경
}

const ProblemForm: React.FC<ProblemFormProps> = ({ problems, selectedProblem, setSelectedProblem }) => {
  return (
    <div className={styles.problemForm__container}>
      <div className={styles.problemForm_component__list}>
        {problems.map(problem => (
          <div
            className={`${styles.problemForm_component__element} ${selectedProblem && selectedProblem.problemId === problem.problemId ? styles.problemForm_component__selected : ''}`}
            key={problem.problemId}
            onClick={() => setSelectedProblem(problem)} // 문제를 선택하면 setSelectedProblem 호출하여 선택한 문제를 설정
          >
            <div className={styles.problemForm_component__title}>
            {problem.title}
            </div>
            <div className={styles.problemForm_component__difficulty}>
            난이도 {problem.difficulty}
            </div>
            <div className={styles.problemForm_component__solved}>
            {problem.isPlayed ? "Played" : "Not Played"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProblemForm;
