import React, { useEffect, useState } from 'react';
import styles from './CodeEditor.module.scss';
import SelectLanguageBtn from './SelectLanguage';
import { Editor } from '@monaco-editor/react';
import Button from '../../../components/common/Button';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import instance from '../../../api/axios';

// 언어 변경에 따른 basecode 변경을 위한 language 타입 정의
interface LanguageState {
  isOpen: boolean;
  options: string[];
  selectedOption: string | null;
}

// 코드 에디터가 받는 Props 타입 정의
interface CodeEditorProps {
  baseCode: { language: string; code: string }[];
  problemId: string;
}

// 코드 에디터 컴포넌트 시작
const CodeEditor: React.FC<CodeEditorProps> = ({ baseCode, problemId }) => {
  const [languageState, setLanguageState] = useState<LanguageState>({
    isOpen: false,
    options: baseCode.map(item => item.language), // baseCode에서 언어 옵션 추출하여 설정
    selectedOption: null,
  });
  const [code, setCode] = useState<string>('');

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

  const [executionResults, setExecutionResults] = useState<{ isCorrect: boolean; output: string }[]>([]);

  // 실행하기 버튼
  const handleExecute = async () => {
    try {
      const userCode = code;
      const selectedLanguage = languageState.selectedOption;

      const requestData = {
        code: userCode,
        language: selectedLanguage,
        roomId: null
      };

      console.log(userCode, selectedLanguage);

      const response = await instance.post(`/problems/${problemId}/execution`, requestData);
      const executionResult = response.data;
      setExecutionResults(executionResult);
    } catch (error) {
      console.error('Error executing code:', error);
    }
  };

  // 화면 이동을 위한 navigate 변수 설정
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const userCode = code;
      const selectedLanguage = languageState.selectedOption;

      const requestData = {
        code: userCode,
        language: selectedLanguage,
        roomId: null,
      };

      console.log(userCode, selectedLanguage);

      const response = await instance.post(`/problems/${problemId}/result`, requestData);
      const accuracy = response.data.accuracy;
      const grade = response.data.grade;
      const gainExp = response.data.gainExp;
      console.log(accuracy);
      console.log(grade);
      console.log(gainExp);

      if (accuracy == 100) {
        Swal.fire({
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
        Swal.fire({
          title: `정확도 : ${accuracy}`,
          customClass: {
            popup: styles['custom-modal-style'],
          },
        })
      }

    } catch (error) {
      console.error('Error executing code:', error);
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
      // 선택된 언어가 없을 경우 초기화하지 않음
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
          {executionResults.map((result, index) => (
            <div key={index} className={styles.execution_result}>
              <div>입출력 예 {index + 1}번째 : {result.isCorrect ? '성공' : '실패'}</div>
              <div>output : {result.output}</div>
            </div>
          ))}
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