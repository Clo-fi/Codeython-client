import React from 'react';
import styles from './ProblemForm.module.scss';

interface Problem {
  problemId: number;
  title: string;
  difficulty: number;
  isPlayed: boolean;
  accuracy : number;
}

interface ProblemFormProps {
  problems: Problem[];
  selectedProblem: Problem | null;
  setSelectedProblem: (problem: Problem | null) => void; 
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
            {problem.isPlayed ? problem.accuracy+"%" : "Not Played"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProblemForm;
