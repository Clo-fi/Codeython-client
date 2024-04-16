import React from 'react';
import styles from './PlayAloneForm.module.scss';
import CodeEditor from './CodeEditor';

/* Props로 받아온 problemInfo의 타입 정의 */

interface ProblemInfo {
  title: string;
  content: string;
  limitFactors: { factor: string }[];
  limitTime: number;
  baseCodes: { language: string; code: string }[];
  testcases: {
    inputCase: string[][];
    outputCase: string[][];
    description: string;
  }[];
  difficulty: number;
}

/* props 타입 정의 */
interface PlayAloneFormProps {
  problemInfo: ProblemInfo;
}

/* return form */
const PlayAloneForm: React.FC<PlayAloneFormProps> = ({ problemInfo }) => { 


  return (
    <div className={styles.play_container}>
      <div className={styles.problem_container}>
        <div className={styles.problem_title}>
          <div className={styles.title}>
            {/* 문제 제목 */}
            {problemInfo.title}
          </div>

        </div>
        <div className={styles.problem_description}>
          <div className={styles.description}>
            {/* 문제 내용 */}
            {problemInfo.content}
          </div>
        </div>
        <div className={styles.problem_testcase}>
        <div className={styles.testcase_title_container}>
          <div className={styles.testcase_title}>
            입출력 예
          </div>
        </div>
          <div className={styles.testcase}>
            입출력 예 내용
          </div>
        </div>
      </div>
      <div className={styles.codeEditor_container}>
        <CodeEditor baseCode={problemInfo.baseCodes} testcases={problemInfo.testcases}/>
      </div>
    </div>
  );
};

export default PlayAloneForm;
