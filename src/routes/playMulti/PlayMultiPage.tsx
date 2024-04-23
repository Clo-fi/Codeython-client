import { useParams } from 'react-router-dom';
import PlayHeader from './components/PlayHeader';
import PlayMultiForm from './components/PlayMultiForm';

import useProblemFetching from '../../hooks/useProblemFetching';

const PlayMultiPage = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const { roomId } = useParams<{ roomId: string }>();
  const { problemInfo, isLoading } = useProblemFetching(problemId!);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const exampleInfo: ProblemInfo = {
  //   "title": "Add Two Numbers",
  //   "content": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
  //   "limitFactors": [
  //     { "factor": "The number of nodes in each linked list is in the range [1, 100]." },
  //     { "factor": "0 <= Node.val <= 9" }
  //   ],
  //   "limitTime": 3,
  //   "baseCode": [
  //     {
  //       "language": "java",
  //       "code": "class Main {\n  public static void Main() {\n  }\n}"
  //     },
  //     {
  //       "language": "javascript",
  //       "code": "class Solution {\n  public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n  }\n}"
  //     }
  //   ],
  //   "testcases": {
  //     "inputCase": [["1,2"], ["3,4"], ["5,6"]],
  //     "outputCase": [["3,4"], ["5,6"], ["7,8"]],
  //     "description": "this is description"
  //   },
  //   "difficulty": 1
  // };


  return (

    <>
      {/* 위에 테스트 코드 아래 본 코드 */}
      {/* <PlayHeader problemInfo={exampleInfo} />
      <PlayMultiForm problemInfo={exampleInfo} problemId={problemId!} roomId={roomId!} /> */}
      <PlayHeader problemInfo={problemInfo!} isLoading={isLoading} />
      <PlayMultiForm problemInfo={problemInfo!} isLoading={isLoading} problemId={problemId!} roomId={roomId!} />

    </>
  );
}

export default PlayMultiPage;
