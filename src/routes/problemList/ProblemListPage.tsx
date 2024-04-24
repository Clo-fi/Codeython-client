import React, { useState } from 'react';
import styles from './ProblemListPage.module.scss';
import { useNavigate } from 'react-router-dom';
import ProblemForm from './components/ProblemForm';
import Button from "../../components/common/Button";
import { CustomAlert } from '../../libs/sweetAlert/alert';

const ProblemListPage: React.FC = () => {
  const navigate = useNavigate();

  interface Problem {
    problemId: number;
    title: string;
    difficulty: number;
    isPlayed: boolean;
    accuracy: number;
  }

  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const handleProblemSubmit = () => {
    if (!selectedProblem) {
      CustomAlert.fire({
        icon: 'error',
        title: '문제를 선택해주세요',
        text: '연습할 문제를 선택한 후 실행하기 버튼을 눌러주세요.',
      });
      return;
    }

    CustomAlert.fire({
      title: `${selectedProblem.title}을(를) 연습하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "혼자 놀기",
      customClass: {
        popup: styles.customModalStyle,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/playalone/${selectedProblem.problemId}`);
      }
    });
  };

  return (
    <div className={styles.problemList_page__container}>
      <div className={styles.problemList_page__header}>
        <img className={styles.problemList_page__logo} src="/Imgs/CodeythonLogo_star.png" alt="Codeython Logo" />
        <Button value="선택 완료" className={styles.problemList_select__btn} onClick={handleProblemSubmit}></Button>
      </div>
      <ProblemForm selectedProblem={selectedProblem} setSelectedProblem={setSelectedProblem} />
    </div>
  )
}

export default ProblemListPage;
