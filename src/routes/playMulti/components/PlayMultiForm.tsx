/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './PlayMultiForm.module.scss';
import CodeEditor from './CodeEditor';
import useToggleStore from '../../../store/ToggleStore';
import PeopleModal from './modal/PeopleModal';
import ChatModal from './modal/ChatModal';
import { ProblemInfo } from '../../../types/problem';
import { UserInfo } from '../../../types/user';
import { ChatInfo } from '../PlayMultiPage';

interface PlayMultiFormProps {
  problemId: string;
  problemInfo: ProblemInfo;
  isLoading: boolean;
  roomId: string;
  users: UserInfo[];
  chatList: ChatInfo[];
  exitRoom: any;
  blockSubmit: boolean
  setBlockSubmit: (newValue: boolean) => void
}

const PlayMultiForm: React.FC<PlayMultiFormProps> = ({ blockSubmit, setBlockSubmit, exitRoom, chatList, users, isLoading, roomId, problemInfo, problemId }) => {
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
                {problemInfo.title}
              </div>
            </div>
            <div className={styles.problem_description}>
              <div className={styles.description}>
                {/* 문제 내용 */}
                {problemInfo.content}
                <ul className={styles.limit_factor_list}>
                  {problemInfo.limitFactors.map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
                </ul>

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
                  {problemInfo.testcase.map((input, index) => (
                    <div key={index} className={styles.testcase_row}>
                      <div className={styles.cell}>{input.inputCase}</div>
                      <div className={styles.cell}>{input.outputCase}</div>
                    </div>

                  ))}
                </div>
                <div className={styles.description}>
                  {problemInfo.testcase[0].description}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.codeEditor_conainer}>
            <CodeEditor blockSubmit={blockSubmit} setBlockSubmit={setBlockSubmit} exitRoom={exitRoom} baseCode={problemInfo.baseCode} problemId={problemId} roomId={roomId} />
          </div>
          <ChatModal chatList={chatList} isChatToggleActive={isChatToggleActive} />
          <PeopleModal users={users} isPeopleToggleActive={isPeopleToggleActive} />
        </div>
      )}
    </>
  );
};

export default PlayMultiForm;


