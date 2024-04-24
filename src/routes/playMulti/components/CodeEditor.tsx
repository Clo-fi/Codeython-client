/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import styles from './CodeEditor.module.scss';
import SelectLanguageBtn from './SelectLanguage';
import { Editor } from '@monaco-editor/react';
import { useNavigate } from 'react-router-dom';
import instance from '../../../api/axios';
import { useWebSocket } from '../../../libs/stomp/useWebSocket';
import useUserStore from '../../../store/UserStore';
import { CustomAlert } from '../../../libs/sweetAlert/alert';

interface LanguageState {
  isOpen: boolean;
  options: string[];
  selectedOption: string | null;
}


interface ExecutionError {
  errorMessage: string | null;
  responseMessage: string | null;
}
interface CodeEditorProps {
  baseCode: { language: string; code: string }[];
  problemId: string;
  roomId: string;
}

interface SuccessState {
  accuracy: number;
  grade: number;
  gainExp: number;
}

// 코드 에디터 컴포넌트 시작
const CodeEditor: React.FC<CodeEditorProps> = ({ baseCode, problemId, roomId }) => {
  const [languageState, setLanguageState] = useState<LanguageState>({
    isOpen: false,
    options: baseCode.map(item => item.language), // baseCode에서 언어 옵션 추출하여 설정
    selectedOption: null,
  });
  const navigate = useNavigate();

  const socketClient = useWebSocket();
  const { nickname } = useUserStore();
  const [code, setCode] = useState<string>('');
  const [successState, setSuccessState] = useState<SuccessState | null>();
  const [executionResults, setExecutionResults] = useState<{ isCorrect: boolean; output: string }[]>([]);
  const [executionError, setExecutionError] = useState<ExecutionError>({ errorMessage: null, responseMessage: null });


  // 선택된 언어에 대한 기본 코드를 설정하는 함수
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDefaultCode = (selectedLanguage: string | null) => {
    if (selectedLanguage) {
      const defaultCode = baseCode.find((item) => item.language === selectedLanguage)?.code;
      if (defaultCode) {
        setCode(defaultCode);
      }
    }
  };

  // 선택된 언어가 변경될 때마다 해당 언어에 대한 기본 코드 설정
  useEffect(() => {
    setDefaultCode(languageState.selectedOption);
  }, [languageState.selectedOption, baseCode]);

  const handleOptionSelect = (option: string) => {
    setLanguageState((prevState) => ({ ...prevState, selectedOption: option, isOpen: false }));
  };

  const toggleLanguageDropdown = () => {
    setLanguageState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }));
  };

  const handleCodeChange = (newCode: string | undefined) => {
    console.log('New code:', newCode);
    setCode(newCode ?? '');
  };

  const handleExecute = async () => {
    try {
      const userCode = code;
      const selectedLanguage = languageState.selectedOption;

      const requestData = {
        code: userCode,
        language: selectedLanguage,
        roomId: roomId
      };

      console.log(userCode, selectedLanguage);

      const response = await instance.post(`/problems/${problemId}/execution`, requestData);
      const executionResult = response.data;
      setExecutionResults(executionResult);
      setExecutionError({ errorMessage: null, responseMessage: null }); // 실행 성공 시 에러 스테이트 초기화
    } catch (err: any) {
      console.error('Error executing code:', err);
      setExecutionResults([]); // 에러 발생 시 실행 결과 초기화
      setExecutionError({ errorMessage: err.toString(), responseMessage: err.response?.data.message || null }); // 에러 스테이트에 에러 저장
    }
  };


  const handleSubmit = async () => {
    try {
      const userCode = code;
      const selectedLanguage = languageState.selectedOption;

      const requestData = {
        code: userCode,
        language: selectedLanguage,
        roomId: roomId,
      };

      console.log(userCode, selectedLanguage);
      const response = await instance.post(`/problems/${problemId}/result`, requestData);
      setSuccessState(response.data as SuccessState);

      if (successState) {
        const { accuracy, grade, gainExp } = successState;
        CustomAlert.fire({
          icon: 'success',
          title: '제출 성공!!',
          text: `정확도 : ${accuracy}%`,
          showCancelButton: false,
          confirmButtonText: "확인",
        }).then((result) => {
          if (result.isConfirmed) {
            if (accuracy === 100) {
              CustomAlert.fire({
                icon: 'success',
                title: `${grade}등 이에요!!`,
                text: `경험치 ${gainExp} 만큼 받았어요!`,
                confirmButtonText: "홈으로 돌아가기",
                showCancelButton: true,
                cancelButtonText: '에디터로 돌아가기'
              }).then((result) => {
                if (result.isConfirmed) {
                  socketClient?.publish({
                    destination: `/pub/room/${roomId}/leave`,
                    headers: { nickname }
                  });
                  console.log('디스커넥트');
                  navigate('/home')
                }
              });
            } else {
              CustomAlert.fire({
                icon: 'info',
                title: '정확도 100이 아닙니다',
                text: '계속 노력해 주세요.',
                confirmButtonText: "확인",
                timer: 1000
              });
            }
          }
        })
      }
      const executionResult = response.data;
      setExecutionResults(executionResult);
      setExecutionError({ errorMessage: null, responseMessage: null });
    } catch (err: any) {
      console.error('Error executing code:', err);
      setExecutionResults([]);
      setExecutionError({ errorMessage: err.toString(), responseMessage: err.response?.data.message || null }); // 에러 스테이트에 에러 저장
    }
  };

  const handleInitializeCode = () => {
    const selectedLanguage = languageState.selectedOption;
    if (selectedLanguage) {
      const defaultCode = baseCode.find((item) => item.language === selectedLanguage)?.code;
      if (defaultCode) {
        setCode(defaultCode);
      }
    } else {
      setCode('');
    }
  };

  return (
    <div className={styles.editor}>
      <div className={styles.CodeEditor}>
        <div className={styles.select_language__btn}>
          <SelectLanguageBtn
            options={languageState.options}
            selectedOption={languageState.selectedOption}
            setSelectedOption={handleOptionSelect}
            toggle={toggleLanguageDropdown}
            isOpen={languageState.isOpen}
          />
        </div>
        <div className={styles.textareaContainer}>
          <Editor
            value={code}
            onChange={handleCodeChange}
            options={{
              fontSize: 15,
              minimap: { enabled: false },
              scrollbar: {
                vertical: 'auto',
                horizontal: 'auto',
              },
            }}
          />
        </div>
      </div>
      <div className={styles.result_section}>
        <div className={styles.result_title_container}>
          <div className={styles.result_title}>실행 결과</div>
        </div>
        <div className={styles.result_container}>
          {executionError.errorMessage && (
            <div className={styles.execution_error}>
              실행 중 에러가 발생했습니다: {executionError.errorMessage}
            </div>
          )}
          {executionError.responseMessage && (
            <div className={styles.execution_error}>
              서버 응답 오류: {executionError.responseMessage}
            </div>
          )}
          {executionResults.length > 0 && (
            executionResults.map((result, index) => (
              <div key={index} className={styles.execution_result}>
                <div>입출력 예 {index + 1}번째 : {result.isCorrect ? '성공' : '실패'}</div>
                <div>output : {result.output}</div>
              </div>
            ))
          )}
          {/* {executionResults.map((result, index) => (
            <div key={index} className={styles.execution_result}>
              <div>입출력 예 {index + 1}번째 : {result.isCorrect ? '성공' : '실패'}</div>
              <div>output : {result.output}</div>
            </div>
          ))} */}
        </div>
        <div className={styles.button_container}>
          <button className={styles.editor__button} onClick={handleInitializeCode} >코드 초기화</button>
          <button className={styles.editor__button} onClick={handleExecute}>실행하기</button>
          <button className={styles.editor__button} onClick={handleSubmit}>제출하기</button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;  