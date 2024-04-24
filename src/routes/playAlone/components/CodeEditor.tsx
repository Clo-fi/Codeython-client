import React, { useEffect, useState } from 'react';
import styles from './CodeEditor.module.scss';
import SelectLanguageBtn from './SelectLanguage';
import { Editor } from '@monaco-editor/react';
import Button from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import instance from '../../../api/axios';
import { CustomAlert } from '../../../libs/sweetAlert/alert';

interface LanguageState {
  isOpen: boolean;
  options: string[];
  selectedOption: string | null;
}

interface CodeEditorProps {
  baseCode: { language: string; code: string }[];
  problemId: string;
}

interface ExecutionError {
  errorMessage: string | null;
  responseMessage: string | null;
}

// 코드 에디터 컴포넌트 시작
const CodeEditor: React.FC<CodeEditorProps> = ({ baseCode, problemId }) => {
  const [languageState, setLanguageState] = useState<LanguageState>({
    isOpen: false,
    options: baseCode.map(item => item.language), // baseCode에서 언어 옵션 추출하여 설정
    selectedOption: null,
  });
  const [code, setCode] = useState<string>('');
  const [executionResults, setExecutionResults] = useState<{ isCorrect: boolean; output: string }[]>([]);
  const [executionError, setExecutionError] = useState<ExecutionError>({ errorMessage: null, responseMessage: null });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  // 선택된 언어에 대한 기본 코드를 설정하는 함수
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

  const ClearFunc = () => {
    setExecutionResults([]);
    setExecutionError({ errorMessage: null, responseMessage: null });
  }

  const handleExecute = async () => {
    try {
      ClearFunc();
      setIsLoading(true);
      const selectedLanguage = languageState.selectedOption;
      if (selectedLanguage === null) {
        CustomAlert.fire({
          icon: 'warning',
          title: '언어를 선택해주세요!!',
          timer: 1200
        })
      }
      const requestData = {
        code,
        language: selectedLanguage,
        roomId: null
      };

      console.log(code, selectedLanguage);

      const response = await instance.post(`/problems/${problemId}/execution`, requestData);
      const executionResult = response.data;
      setExecutionResults(executionResult);
      setExecutionError({ errorMessage: null, responseMessage: null }); // 실행 성공 시 에러 스테이트 초기화
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error executing code:', err);
      setExecutionResults([]); // 에러 발생 시 실행 결과 초기화
      setExecutionError({ errorMessage: err.toString(), responseMessage: err.response?.data.message || null }); // 에러 스테이트에 에러 저장
    } finally {
      setIsLoading(false); // 데이터 처리가 완료되었으므로 로딩 상태 해제 (성공 및 실패 모두 해당)
    }
  };
  console.log(executionError)

  const handleSubmit = async () => {
    try {

      ClearFunc();
      setIsLoading(true);

      const selectedLanguage = languageState.selectedOption;

      if (selectedLanguage === null) {
        CustomAlert.fire({
          icon: 'warning',
          title: '언어를 선택해주세요!!',
          timer: 1200
        })
      }

      const requestData = {
        code,
        language: selectedLanguage,
        roomId: null,
      };

      console.log(code, selectedLanguage);

      const response = await instance.post(`/problems/${problemId}/result`, requestData);
      const accuracy = response.data.accuracy;
      const grade = response.data.grade;
      const gainExp = response.data.gainExp;
      console.log(accuracy);
      console.log(grade);
      console.log(gainExp);

      if (accuracy == 100) {
        CustomAlert.fire({
          title: "정답입니다!",
          showCancelButton: true,
          confirmButtonText: "나가기",
          customClass: {
            popup: styles['custom-modal-style'],
          },
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/home');
          }
        });
      } else {
        CustomAlert.fire({
          title: `정확도 : ${accuracy}`,
          customClass: {
            popup: styles['custom-modal-style'],
          },
        })
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error executing code:', err);
      setExecutionResults([]); // 에러 발생 시 실행 결과 초기화
      setExecutionError({ errorMessage: err.toString(), responseMessage: err.response?.data.message || null }); // 에러 스테이트에 에러 저장
    } finally {
      setIsLoading(false); // 데이터 처리가 완료되었으므로 로딩 상태 해제 (성공 및 실패 모두 해당)
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
          <Button value="코드 초기화" className={styles.initialize_btn} onClick={handleInitializeCode} />
          <Button value="실행하기" className={styles.execution_btn} onClick={handleExecute} />
          <Button value="제출하기" className={styles.submit_btn} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;