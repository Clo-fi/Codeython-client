import React, { useEffect } from 'react';
import PlayAloneForm from './components/PlayAloneForm';
import PlayHeader from './components/PlayHeader';
import { useParams } from 'react-router-dom';
import { create } from 'zustand';
import axios from 'axios';

// 타입 정의

interface ProblemInfo {
  title: string;
  content: string;
  limitFactors: { factor: string }[];
  limitTime: number;
  baseCode: { language: string; code: string }[];
  testcases: {
    inputCase: string[][];
    outputCase: string[][];
    description: string;
  };
  difficulty: number;
}

// 문제 상태를 위한 타입 정의

interface ProblemState {
  problemInfo: ProblemInfo | null;
  setProblemInfo: (problemInfo: ProblemInfo) => void;
}

// zustand store 정의

const useProblemStore = create<ProblemState>((set) => ({
  problemInfo: null,
  setProblemInfo: (problemInfo: ProblemInfo) => set({ problemInfo }),
}));


const PlayAlonePage: React.FC = () => {

  // 문제 id를 통한 api 통신
  const { problemId } = useParams<{ problemId: string }>();

  // 받아온 정보 상태 관리를 위한 state 정의
  const { problemInfo, setProblemInfo } = useProblemStore();

  // 컴포넌트 렌더링 할 때 api 통신으로 ProblemInfo 받아오기
  useEffect(() => {
    const fetchProblemInfo = async () => {
      try {
        const response = await axios.get(`/api/problems/${problemId}`);
        setProblemInfo(response.data);
      } catch (error) {
        console.error('Error fetching problem info:', error);
      }
    };
    fetchProblemInfo();
  }, [problemId, setProblemInfo]);

  if (!problemInfo) {
    return <div>Loading...</div>;
  }

  /* 화면 확인을 위한 예시 데이터 
  const exampleInfo: ProblemInfo = {
    "title": "Add Two Numbers",
    "content": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    "limitFactors": [
      { "factor": "The number of nodes in each linked list is in the range [1, 100]." },
      { "factor": "0 <= Node.val <= 9" }
    ],
    "limitTime": 3,
    "baseCode": [
      {
        "language": "java",
        "code": "class Main {\n  public static void Main() {\n  }\n}"
      },
      {
        "language": "javascript",
        "code": "class Solution {\n  public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n  }\n}"
      }
    ],
    "testcases": {
      "inputCase": [["1,2"], ["3,4"], ["5,6"]],
      "outputCase": [["3,4"], ["5,6"], ["7,8"]],
      "description": "this is description"
    },
    "difficulty": 1
  };
  */

  return (
    <div>
      {/* limitTime 전달  <PlayHeader limitTime={exampleInfo.limitTime} />  */}
      <PlayHeader limitTime={problemInfo.limitTime} />
      {/* <PlayAloneForm problemInfo={exampleInfo} /> */}
      <PlayAloneForm problemInfo={problemInfo} problemId={problemId!} />
    </div>
  );
};

export default PlayAlonePage;