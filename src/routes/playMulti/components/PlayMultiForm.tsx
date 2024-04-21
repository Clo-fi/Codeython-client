import React from 'react';
import styles from './PlayMultiForm.module.scss';
import CodeEditor from './CodeEditor';
import useToggleStore from '../../../store/ToggleStore';
import PeopleModal from './modal/PeopleModal';
import ChatModal from './modal/ChatModal';

/* Props로 받아온 problemInfo의 타입 정의 */

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

/* props 타입 정의 */
interface PlayMultiFormProps {
  problemId: string;
  problemInfo: ProblemInfo;
  isLoading: boolean;
}

/* return form */
const PlayMultiForm: React.FC<PlayMultiFormProps> = ({ isLoading, problemInfo, problemId }) => {
  const { isPeopleToggleActive, isChatToggleActive } = useToggleStore();
  return (
    <>
      {isLoading ? (
        <>
          <div className={styles.play_container}>
            <div className={styles.problem_container}>
              <div className={styles.problem_title}>
                <div className={styles.title}>
                  Problem Title
                </div>
              </div>
              <div className={styles.problem_description}>
                <div className={styles.description}>
                  Problem Descriotion
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
                  </div>
                  <div className={styles.description}>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.codeEditor_container}>
            </div>
          </div>
        </>
      ) : (

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
                  {problemInfo.testcases.inputCase.map((input, index) => (
                    <div key={index} className={styles.testcase_row}>
                      <div className={styles.cell}>{input}</div>
                      <div className={styles.cell}>{problemInfo.testcases.outputCase[index]}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.description}>
                  {problemInfo.testcases.description}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.codeEditor_container}>
            <CodeEditor baseCode={problemInfo.baseCode} problemId={problemId} />
          </div>
          <ChatModal isChatToggleActive={isChatToggleActive} />
          <PeopleModal isPeopleToggleActive={isPeopleToggleActive} />
        </div>
      )}
    </>
  );
};

export default PlayMultiForm;


