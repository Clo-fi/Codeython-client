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
  hiddencases: {
    inputCase: string[][];
    outputCase: string[][];
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
            <div className={styles.testcase_table}>
              <div className={styles.table_header}>
                <div className={styles.header_cell}>Input Case</div>
                <div className={styles.header_cell}>Output Case</div>
              </div>
              {problemInfo.testcases[0].inputCase.map((input, index) => (
                <div key={index} className={styles.testcase_row}>
                  <div className={styles.cell}>{input}</div>
                  <div className={styles.cell}>{problemInfo.testcases[0].outputCase[index]}</div>
                </div>
              ))}
            </div>
            <div className={styles.description}>
                {problemInfo.testcases[0].description}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.codeEditor_container}>
        <CodeEditor baseCode={problemInfo.baseCodes} testcases={problemInfo.testcases} hiddencases={problemInfo.hiddencases}/>
      </div>
    </div>
  );
};

export default PlayAloneForm;
