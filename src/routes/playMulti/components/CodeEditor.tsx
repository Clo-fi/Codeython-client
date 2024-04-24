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
  const [executionResults, setExecutionResults] = useState<{ isCorrect: boolean; output: string }[]>([]);
  const [executionError, setExecutionError] = useState<ExecutionError>({ errorMessage: null, responseMessage: null });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setDefaultCode = (selectedLanguage: string | null) => {
    if (selectedLanguage) {
      const defaultCode = baseCode.find((item) => item.language === selectedLanguage)?.code;
      if (defaultCode) {
        setCode(defaultCode);
      }
    }
  };

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
  const ClearFunc = () => {
    setExecutionResults([]);
    setExecutionError({ errorMessage: null, responseMessage: null });
  }

  const handleExecute = async () => {
    try {

      ClearFunc();
      setIsLoading(true);

      const selectedLanguage = languageState.selectedOption;
      const requestData = {
        code,
        language: selectedLanguage,
        roomId: roomId
      };

      if (selectedLanguage === null) {
        CustomAlert.fire({
          icon: 'warning',
          title: '언어를 선택해주세요!!',
          timer: 500
        })
      }
      console.log(code, selectedLanguage);

      const response = await instance.post(`/problems/${problemId}/execution`, requestData);
      const executionResult = response.data;
      setExecutionResults(executionResult);
      setExecutionError({ errorMessage: null, responseMessage: null });
    } catch (err: any) {
      console.error('Error executing code:', err);
      setExecutionResults([]);
      setExecutionError({ errorMessage: err.toString(), responseMessage: err.response?.data.message || null }); // 에러 스테이트에 에러 저장
    } finally {
      setIsLoading(false);
    }
  };


  const handleSubmit = async () => {
    try {
      const selectedLanguage = languageState.selectedOption;

      ClearFunc();
      setIsLoading(true);
      const requestData = {
        code,
        language: selectedLanguage,
        roomId
      };

      if (selectedLanguage === null) {
        CustomAlert.fire({
          icon: 'warning',
          title: '언어를 선택해주세요!!',
          timer: 1200
        })
      }

      console.log(code, selectedLanguage);
      const response = await instance.post(`/problems/${problemId}/result`, requestData);
      const responseData = response.data;

      CustomAlert.fire({
        icon: 'success',
        title: '제출 성공!!',
        text: `정확도 : ${responseData.accuracy}%`,
        showCancelButton: false,
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          if (responseData.accuracy === 100) {
            CustomAlert.fire({
              icon: 'success',
              title: `${responseData.grade}등 이에요!!`,
              text: `경험치 ${responseData.gainExp} 만큼 받았어요!`,
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
              title: `현재 정확도 : ${responseData.accuracy}% 입니다!!`,
              text: '계속 노력해 주세요.',
              confirmButtonText: "확인",
              timer: 1000
            });
          }
        }
      });

      const executionResult = response.data;
      setExecutionResults(executionResult);
      setExecutionError({ errorMessage: null, responseMessage: null });
    } catch (err: any) {
      console.error('Error executing code:', err);
      setExecutionResults([]);
      setExecutionError({ errorMessage: err.toString(), responseMessage: err.response?.data.message || null }); // 에러 스테이트에 에러 저장
    } finally {
      setIsLoading(false);
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
          {isLoading && (
            <div className={styles.execution_loading}>
              데이터를 불러오는 중입니다...
            </div>
          )}
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
          {!isLoading && executionResults.length > 0 && (
            executionResults.map((result, index) => (
              <div key={index} className={styles.execution_result}>
                <div>입출력 예 {index + 1}번째 : {result.isCorrect ? '성공' : '실패'}</div>
                <div>output : {result.output}</div>
              </div>
            ))
          )}
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