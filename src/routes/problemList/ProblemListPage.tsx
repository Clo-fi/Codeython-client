import React, { useState, useEffect } from 'react'
import styles from './ProblemListPage.module.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProblemForm from './components/ProblemForm';
import { create } from 'zustand';
import Button from "../../components/common/Button";
import instance from '../../api/axios';


const ProblemListPage: React.FC = () => {

  // navigate 생성
  const navigate = useNavigate();

  // problem 타입 정의
  interface Problem {
    problemId: number;
    title: string;
    difficulty: number;
    isPlayed: boolean;
    accuracy: number;
  }

  // zustand store 타입 정의
  interface ProblemStore {
    problems: Problem[];
    loading: boolean; // 데이터가 로딩 중인지를 나타내는 boolean 값
    error: string | null; // 에러 나타내는 문자열, 없을 경우 null
    fetchProblems: () => Promise<void>; // 문제 목록 가져오는 비동기 함수
  }

  // 다음에 연습할 문제를 저장하는 상태
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  // 문제를 선택하고 실행하기 버튼을 클릭했을 때 실행되는 함수
  const handleProblemSubmit = () => {
    if (selectedProblem) {
      // 선택한 문제가 있으면 해당 문제의 ID를 사용하여 URL을 생성하고 이동
      Swal.fire({
        title: `${selectedProblem.title}을(를) 연습하시겠습니까?`,
        showCancelButton: true,
        confirmButtonText: "혼자 놀기",
        customClass: {
          popup: styles['custom-modal-style'],
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/playalone/${selectedProblem.problemId}`);
        }
      });      
    } else {
      // 선택한 문제가 없으면 알림을 표시하거나 사용자에게 메시지를 전달
      Swal.fire({
        icon: 'error',
        title: '문제를 선택해주세요',
        text: '연습할 문제를 선택한 후 실행하기 버튼을 눌러주세요.',
      });
    }
  };

  const useProblemStore = create<ProblemStore>((set) => ({
    problems: [],
    loading: false,
    error: null,
    fetchProblems: async () => {
      set({ loading: true, error: null });
      try {
        const response = await instance.get<Problem[]>('/problems');
        set({ problems: response.data, loading: false });
      }catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            // 서버로부터 응답이 있는 경우
            console.log(error.response.data);  // 서버로부터 받은 데이터
            console.log(error.response.status); // HTTP 상태 코드
            console.log(error.response.headers); // 응답 헤더
            
          } else {
            // 서버로부터 응답이 없는 경우
            console.log(error.message); 
            
          }
        } else {
          // AxiosError가 아닌 다른 에러인 경우
          console.error(error); // 그 외의 에러를 콘솔에 출력합니다.
        }
      }
    },
  }));

  /* 화면 확인을 위한 예시 데이터 */

  const problemsData: Problem[] = [
    {
      "problemId": 1,
      "title": "한우 여물먹이기",
      "difficulty": 3,
      "isPlayed": true,
      "accuracy": 0
    },
    {
      "problemId": 2,
      "title": "한우 여물먹이기",
      "difficulty": 3,
      "isPlayed": true,
      "accuracy": 1
    },
    {
      "problemId": 3,
      "title": "한우 여물먹이기",
      "difficulty": 3,
      "isPlayed": true,
      "accuracy": 33
    },
    {
      "problemId": 4,
      "title": "한우 여물먹이기",
      "difficulty": 3,
      "isPlayed": false,
      "accuracy": 0
    },
    {
      "problemId": 5,
      "title": "한우 여물먹이기",
      "difficulty": 3,
      "isPlayed": true,
      "accuracy": 15
    },
    {
      "problemId": 6,
      "title": "한우 여물먹이기",
      "difficulty": 3,
      "isPlayed": true,
      "accuracy": 100
    },
    {
      "problemId": 7,
      "title": "한우 여물먹이기",
      "difficulty": 3,
      "isPlayed": true,
      "accuracy": 56
    },
    {
      "problemId": 8,
      "title": "한우 여물먹이기",
      "difficulty": 3,
      "isPlayed": true,
      "accuracy": 30
    },
    {
      "problemId": 9,
      "title": "한우 여물먹이기",
      "difficulty": 3,
      "isPlayed": true,
      "accuracy": 25
    },
    {
      "problemId": 10,
      "title": "한우 여물먹이기",
      "difficulty": 3,
      "isPlayed": false,
      "accuracy": 0
    },
    {
      "problemId": 11,
      "title": "한우 여물먹이기",
      "difficulty": 3,
      "isPlayed": false,
      "accuracy": 0
    }
  ];

  // 문제 리스트 상태관리
  const { problems, loading, error, fetchProblems } = useProblemStore();

  useEffect(() => {
    fetchProblems();
  }, []);

  if (loading) {
    return (
      <div>
        로딩중 화면
      </div>
    )
  }

  if (error) {
    /* 변수 미사용 에러 방지를 위한 console.log */
    console.log(problems);
    return (
      <div>
        에러 회면 & 홈으로 가기 버튼
      </div>
    )
  }


  return (
    <div className={styles.problemList_page__container}>
      <div className={styles.problemList_page__header}>
        <img className={styles.problemList_page__logo} src="/Imgs/CodeythonLogo_star.png" alt="codeythonLogo" />
        <Button value="선택 완료" className={styles.problemList_select__btn} onClick={handleProblemSubmit}></Button>
      </div>
      <ProblemForm problems={problemsData} selectedProblem={selectedProblem} setSelectedProblem={setSelectedProblem} />
    </div>
  )
}

export default ProblemListPage;
